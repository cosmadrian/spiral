let express = require('express')
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser')

let server = require('http').Server(app);
let io = require('socketio-jwt');

let mongoose = require('mongoose');
require('./models/message.js')();
require('./models/user.js')();
require('./models/group.js')();

let helpers = require('./helpers');
let routes = require('./routes');

// TODO, check authorization
app.use((req, res, next) => {
	req.challenge = req.headers['authorization'];
	req.authenticated = true

	if (req.authenticated) {
		req.authentication = 'fancyuser';
	}
	next()
});

app.use(cors());
app.use(bodyParser.json())

app.use('/static', express.static(helpers.getFilePath('static/')))
app.use('/service-worker.js', express.static(helpers.getFilePath('service-worker.js')))

let addRoutes = (app, routes) => {
	for (let route of routes) route(app);
}

mongoose.connect(helpers.getConfig('database'), (error) => {
	if (error) throw error;
	addRoutes(app, routes);
});

server.listen(helpers.getConfig('port'), () => {
	console.log("Running on " + helpers.getConfig('port'));
});