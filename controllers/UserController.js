const mongoose = require('mongoose');
const User = mongoose.model('User');

let bcrypt = require('bcrypt-nodejs')
let jwt = require('jsonwebtoken')

module.exports = {
	register: (req, res) => {
		bcrypt.hash(req.body.password, null, null, (err, hash) => {
			let newUser = User()
			newUser.nickname = req.body.nickname
			newUser.password = hash
			newUser.save()

			jwt.sign({username: req.body.nickname}, "TODO:ADD_SOME_PRIVATE_KEY", (err, token) => res.json({jwt: token}));
		});
	},

	login: (req, res) => {
		User.findOne({'nickname': req.body.nickname}, (err, docs) => {
			if(!docs)
				return res.status(401).json({'error': 'Nickname does not exist.'});

			bcrypt.compare(req.body.password, docs[0].password, (err, result) => {
				if (!result)
					return res.status(401).json({"error": "Username or password is not valid."})
				jwt.sign({username: req.body.nickname}, "TODO:ADD_SOME_PRIVATE_KEY", (err, token) => res.json({jwt: token}));
			});
		})
	}
};