let fs = require('fs');

module.exports = {
	"shared": {
		"public_key": fs.readFileSync('./public_key.pem'),
		"private_key": fs.readFileSync('./private_key.pem'),
		/* one week expire date */
		"token_expire": Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
	},
	"dev": {
		"database": "mongodb://localhost/spiral",
		"views": __dirname + "/views/",
		"port": 3000
	},
	"prod": {
		"database": "mongodb://localhost/spiral"
	}
}