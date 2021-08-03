const mongoose = require('mongoose');
const moment = require('moment');
const mongoSchema = mongoose.Schema({
  namaBarang: String,
  deskripsiBarang: String,
  stokBarang: {
    type: Number,
    default: 0
  },
  hargaBarang: {
    type: Number,
    default: 0
  },
  fotoBarang: String,
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('barangs', mongoSchema);
