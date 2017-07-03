module.exports = {
	"dev": {
		"database": "mongodb://localhost/spiral",
		"views": __dirname + "/views/",
		"port": 3000
	},
	"prod": {
		"database": "mongodb://localhost/spiral"
	}
}