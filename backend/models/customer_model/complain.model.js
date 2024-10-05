const mongoose = require('mongoose');

// Define the Complain schema
const complainSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  clientName: {
    type: String,
  },
  tokenId: {
    type: String,
    required: true,
    unique: true,
  },
  complainTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  complainFile: {
    type: String, // URL of the uploaded file
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'UnderProcess'],
    default: 'Open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Complain model
const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;
