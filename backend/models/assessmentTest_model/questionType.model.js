const mongoose = require('mongoose');

const QuestionTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Question type name is required'],
    unique: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('QuestionType', QuestionTypeSchema);
