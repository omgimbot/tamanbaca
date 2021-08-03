const mongoose = require('mongoose');
const moment = require('moment');
const mongoSchema = mongoose.Schema({
  idPembeli: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  idToko: String,
  idBarang: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  qty: Number,
  total: {
    type: Number
  },
  status: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString()
  },
  updated_at: {
    type: Date,
    default: new Date().toISOString()
  }
})
module.exports = mongoose.model('keranjang', mongoSchema);