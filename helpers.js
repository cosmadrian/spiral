let config = require('./config')

module.exports = {
	getConfig : key => {
		let env = process.env.NODE_ENV || 'dev';
		return config[env][key];
	},

	getFilePath : file => {
		let env = process.env.NODE_ENV || 'dev';
		let dir = config[env]['views'];
		return dir + "spiral/dist/" + file;
	}
}