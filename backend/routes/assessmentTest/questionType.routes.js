const express = require('express');
const router = express.Router();
const {
  addQuestionType,
  getQuestionTypes,
  deleteQuestionType,
} = require('../../controllers/assessmentTest/questionTypeController');
const { authenticate } = require('../../middleware/auth');

// Add a new question type
router.post('/add', authenticate, addQuestionType);

// Get all question types
router.get('/get', authenticate, getQuestionTypes);

// Delete a question type
router.delete('/:id', authenticate, deleteQuestionType);

module.exports = router;
