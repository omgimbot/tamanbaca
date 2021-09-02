const mongoose = require('mongoose');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId
const mongoSchema = mongoose.Schema({
  judul: String, 
  kategori: String, 
  tamanBaca: String,
  pengiriman: String,
  idUser: ObjectId,
  idTamanBaca: ObjectId,
  jumlah: Number,
  status: {
    type: String,
    default: "Dikirim"
  },
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('donasi', mongoSchema);
