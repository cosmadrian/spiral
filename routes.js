let SiteController = require('./controllers/SiteController');
let UserController = require('./controllers/UserController');
let ConversationController = require('./controllers/ConversationController')

module.exports = [

	app => app.post('/api/user/register', UserController.register),
	app => app.post('/api/user/login', UserController.login),

	// should be guarded
	(app, auth) => app.get('/api/conversations/', auth, ConversationController.index),
]