const mongoose = require('mongoose');
const moment = require('moment');
const mongoSchema = mongoose.Schema({
  idUser: String,
  namaToko: String,
  alamat: String,
  deskripsi: String,
  logoToko: String,
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('toko', mongoSchema);
