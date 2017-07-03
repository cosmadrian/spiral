let SiteController = require('./controllers/SiteController');

module.exports = [
	app => {
		app.get('/', SiteController.index)
	},

]