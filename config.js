let fs = require('fs');

module.exports = {
	"shared": {
		"password_salt": 'Z2r,F]:48$[eE$&HrLo;j2;{2pV+Ya:`_0..GwV3h)SVS<kqzeHLh=HFo&Ia0+Jt',
		"public_key": fs.readFileSync('./public_key.pem'),
		"private_key": fs.readFileSync('./private_key.pem'),
		"token_expire": Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
		"public_key_token": fs.readFileSync('./public_key_token.pem'),
		"private_key_token": fs.readFileSync('./private_key_token.pem')
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