const mongoose = require('mongoose');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId
const mongoSchema = mongoose.Schema({
  idBuku: ObjectId,
  pengiriman: String,
  idUser: ObjectId,
  jumlah: Number,
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('donasi', mongoSchema);
