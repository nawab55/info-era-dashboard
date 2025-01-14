const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionType: { type: String, required: true },
  background: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true },
      },
      correctAnswer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Question', QuestionSchema);
