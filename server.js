let mongoose = require('mongoose');
let app = require('express')();

let server = require('http').Server(app);
let io = require('socket.io')(server);

let helpers = require('./helpers');
let routes = require('./routes');


let addRoutes = (app, routes) => {
	new Set(routes).forEach(route => {
		route(app);
	});
}


mongoose.connect(helpers.getConfig('database'), (error) => {
	if (error) throw error;
	addRoutes(app, routes);
});

server.listen(helpers.getConfig('port'), () => {
	console.log("Running on " + helpers.getConfig('port'));
});