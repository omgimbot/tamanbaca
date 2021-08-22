const mongoose = require('mongoose')
const moment = require('moment');
const mongoSchema = mongoose.Schema({
	namaLengkap: String,
	noTelpon: String,
	email: String,
	password: String,
	role:  String,
	created_at: {
		type: Date,
		default: new Date().toISOString()
	}
})
module.exports = mongoose.model('users', mongoSchema)
