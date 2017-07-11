let mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = () => {
	let MessageSchema = new Schema({
		source: {
			type: String,
			id: Schema.ObjectId
		},
		destination: {
			type: String,
			id: Schema.ObjectId
		},
		content: String,
		time: String,
		agent: String,
		ip: String
	});
	mongoose.model('Message', MessageSchema);
}