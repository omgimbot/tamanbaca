const mongoose = require('mongoose');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId
const mongoSchema = mongoose.Schema({
  idUser: ObjectId,
  namaPerpus: String,
  alamat: String,
  deskripsi: String,
  logoPerpus: String,
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('perpus', mongoSchema);
