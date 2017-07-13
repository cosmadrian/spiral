const mongoose = require('mongoose');
const User = mongoose.model('User');

let bcrypt = require('bcrypt-nodejs')
let jwt = require('jsonwebtoken')
let NodeRSA = require('node-rsa');
let helpers = require('../helpers');
let base64 = require('base-64')
let utf8 = require('utf8')

// TODO validate & sanitize inputs
module.exports = {
	register: (req, res) => {
		User.findOne({'nickname': req.body.nickname}, (err, docs) => {
			if(docs) {
				return res.status(401).json({'error': 'Nickname is already in use. Try another one.'});
			}
			bcrypt.hash(req.body.password, helpers.getConfig('password_salt', 'shared'), null, (err, hash) => {
				let newUser = User()
				newUser.nickname = req.body.nickname
				newUser.password = hash
				newUser.save()

				jwt.sign({ user: newUser },
					helpers.getConfig('private_key', 'shared'),
					{ expiresIn: helpers.getConfig('token_expire','shared') },
					(err, token) => {
						if(err)
							return res.status(500).json({"error": "Cannot generate token."})
						let key = new NodeRSA(helpers.getConfig('private_key_token', 'shared'))
						let encrypted = key.encrypt(token, 'base64');
						return res.json({jwt: encrypted});
				})
			});
		});
	},

	login: (req, res) => {
		User.findOne({'nickname': req.body.nickname}, (err, docs) => {
			if(!docs)
				return res.status(401).json({'error': 'Nickname does not exist.'});

			let nickname = req.body.nickname;
			bcrypt.compare(req.body.password, docs.password, (err, result) => {
				if (!result)
					return res.status(401).json({"error": "Username or password is not valid."})

				jwt.sign({ nickname }, helpers.getConfig('private_key', 'shared'),
				 { expiresIn: helpers.getConfig('token_expire','shared') },
				 (err, token) => {
					if(err)
						return res.status(500).json({"error": "Cannot generate token."})
					let key = new NodeRSA(helpers.getConfig('private_key_token', 'shared'))
					let encrypted = key.encrypt(token, 'base64');
					return res.json({jwt: encrypted});
				})
			});
		})
	}
};