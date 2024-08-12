const mongoose = require('mongoose');

const hsnCodeSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  hsnCode: {
    type: String,
    required: true,
    trim: true,
  },
});

const HsnCode = mongoose.model('HsnCode', hsnCodeSchema);

module.exports = HsnCode;
