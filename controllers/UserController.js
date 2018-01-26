const mongoose = require('mongoose');
const User = mongoose.model('User');

let bcrypt = require('bcrypt-nodejs')
let jwt = require('jsonwebtoken')
let NodeRSA = require('node-rsa');
let helpers = require('../helpers');
let base64 = require('base-64')
let utf8 = require('utf8')

const signJWT = (payload, callback, errorCallback) => {
	let key = helpers.getConfig('private_key', 'shared')
	let expires = helpers.getConfig('token_expire','shared')
	let token_key = helpers.getConfig('private_key_token', 'shared')

	jwt.sign(payload, key, { expiresIn: expires }, (err, token) => {
		if(err) errorCallback({"error": "Cannot generate token."})
		callback(new NodeRSA(token_key).encrypt(token, 'base64'))
	});
}

module.exports = {
	register: (req, res) => {
		User.findOne({'nickname': req.body.nickname}, (err, docs) => {
			if(docs) return res.status(401).json({'error': 'Nickname is already in use. Try another one.'});

			bcrypt.hash(req.body.password, null, null, (err, hash) => {
				let newUser = User({nickname: req.body.nickname, password: hash, status: "Wondering about."})
				newUser.save()

				signJWT({user: newUser}, token => res.json({'jwt': token}), err => res.status(500).json(err))
			});
		});
	},

	login: (req, res) => {
		User.findOne({'nickname': req.body.nickname}, (err, userModel) => {
			if(!userModel) return res.status(401).json({'error': 'Nickname does not exist.'});
			let nickname = req.body.nickname;

			bcrypt.compare(req.body.password, userModel.password, (err, result) => {
				if (!result) return res.status(401).json({"error": "Username or password is not valid."})
				signJWT({user: userModel}, token => res.json({'jwt': token}), err => res.status(500).json(err))
			});
		})
	},

	user: (req, res) => {
		let user = JSON.parse(JSON.stringify(req.authentication.user));
		delete user['password']
		delete user['_id']
		delete user['_v']
		return res.json(user)
	}
};
