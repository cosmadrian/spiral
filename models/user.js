let mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = () => {
	let UserSchema = new Schema({
		nickname: String,
		password: String,
		status: String,
		conversations: [{
			type: String,
			id: Schema.ObjectId
		}]
	});
	mongoose.model('User', UserSchema)
};