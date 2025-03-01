const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // Base64 string
    required: true
  },
  publisher: {
    type: String,
    default: 'Info Era Software Services Pvt. Ltd.'
  },
  author: {
    type: String,
    default: 'Info Era Software Services Pvt. Ltd.'
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  keywords: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);