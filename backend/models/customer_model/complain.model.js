const mongoose = require('mongoose');

// Define the Complain schema
const complainSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Complain model
const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;
