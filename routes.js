let SiteController = require('./controllers/SiteController');
let UserController = require('./controllers/UserController');
let ConversationController = require('./controllers/ConversationController')

authentication = require('express-authentication'),

	module.exports = [
		app => app.get('/', SiteController.index),
		app => app.get('/index.html', SiteController.index),

		app => app.post('/api/register', UserController.register),
		app => app.post('/api/login', UserController.login),

		// should be guarded
		app => app.get('/api/conversations', authentication.required(), ConversationController.index),
	]