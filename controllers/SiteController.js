let helpers = require('../helpers');

module.exports = {
	index: (req, res) => {
		res.sendFile(helpers.getFilePath('index.html'));
	}
}