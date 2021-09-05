const mongoose = require('mongoose');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId
const mongoSchema = mongoose.Schema({
  idUser: ObjectId,
  judul: String,
  deskripsi: String,
  status: {
    type: String,
    default: "Menunggu Konfirmasi"
  },
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('pengaduan', mongoSchema);
