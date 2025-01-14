const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    enum: ['Technical', 'Non-Technical'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
