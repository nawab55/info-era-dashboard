const express = require('express');
const router = express.Router();
const {
  addQuestions,
  getQuestionList,
  getQuestionsByBackground,
} = require('../../controllers/assessmentTest/question.controller');

router.post('/create', addQuestions);
router.get('/question-list', getQuestionList);
router.get("/background", getQuestionsByBackground); // New route to fetch questions based on background

module.exports = router;
