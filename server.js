let express = require('express')
let router = express.Router()
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser')
let NodeRSA = require('node-rsa');

let server = require('http').Server(app);
let io = require('socketio-jwt');
let jwt = require('jsonwebtoken')
let mongoose = require('mongoose');

require('./models/message.js')();
require('./models/user.js')();
require('./models/group.js')();

let helpers = require('./helpers');
let routes = require('./routes');

app.use(cors());
app.use(bodyParser.json())

app.use('/', express.static(helpers.getFilePath('index.html')))
app.use('/static', express.static(helpers.getFilePath('static/')))
app.use('/index.html', express.static(helpers.getFilePath('index.html')))
app.use('/service-worker.js', express.static(helpers.getFilePath('service-worker.js')))

let authenticate = (req, res, next) => {
	try {
		if(req.header('authorization') !== undefined) {
			let key = new NodeRSA(helpers.getConfig('private_key_token', 'shared'))
			let encrypted = req.header('authorization').slice("Basic ".length);
			let token = key.decrypt(encrypted, 'utf8', 'base64')

			let decoded = jwt.verify(token, helpers.getConfig('private_key', 'shared'));
			req.authentication = { user: decoded.user }
			next()
			} else throw new Error("Authentification required");
	} catch(err) {
		res.status(401).json({"error": err.message});
	}
}

let errorHandler = (err, req, res, next) => {
	res.status(500).json({'error': "Something went wrong. Please contact the site administrator."});
}

let notFoundHandler = (req, res, next) => {
	res.status(404);
	res.json({"error" : "Resource was not found."})
}

let addRoutes = (app, routes) => {
	for (let route of routes) route(app, authenticate);
}

mongoose.connect(helpers.getConfig('database'), (error) => {
	if (error) throw error;
	addRoutes(app, routes);

	app.use(errorHandler);
	app.use(notFoundHandler);
});

server.listen(helpers.getConfig('port'), () => {
	console.log("Running on " + helpers.getConfig('port'));
});