const mongoose = require('mongoose');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId
const mongoSchema = mongoose.Schema({
  nama: String,
  judul: String,
  deskripsi: String,
  kategori: String,
  jumlah: Number,
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('buku', mongoSchema);
