let mongoose = require('mongoose')
let Schema = mongoose.Schema

module.exports = () => {
	let GroupSchema = new Schema({
		name: String,
	});
	mongoose.model('Group', GroupSchema);
}