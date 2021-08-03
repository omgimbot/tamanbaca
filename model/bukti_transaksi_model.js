const mongoose = require('mongoose');
const moment = require('moment');
const mongoSchema = mongoose.Schema({
  idPembeli: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  foto: String,
  created_at: {
    type: Date,
    default: new Date().toISOString()
  },
})
module.exports = mongoose.model('buktibayar', mongoSchema);
