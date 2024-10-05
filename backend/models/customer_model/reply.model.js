const mongoose = require('mongoose');

// Define the Reply schema
const replySchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Reply model
const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
