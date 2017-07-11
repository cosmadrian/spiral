module.exports = {
	index: (req, res) => {
		res.json({"sucess": "logged in as " + req.authentication.nickname})
	}
}