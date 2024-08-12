const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,  // This will remove leading and trailing spaces
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
