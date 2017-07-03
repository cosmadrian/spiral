let mongoose = require('mongoose');
let express = require('express')
let app = express();

let server = require('http').Server(app);
let io = require('socketio-jwt');

let helpers = require('./helpers');
let routes = require('./routes');

app.use((req, res, next) => {
	req.challenge = req.headers['authorization'];
	req.authenticated = req.headers['authorization'] === 'secret';

	if (req.authenticated) {
		req.authentication = 'fancyuser';
	}
	next()
});


console.log(helpers.getFilePath('static/css'))

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