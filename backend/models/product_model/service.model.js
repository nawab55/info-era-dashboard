const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
  service: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
