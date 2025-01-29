const express = require('express');
const router = express.Router();
const {
  addQuestions,
  getQuestionList,
  getQuestionsByBackground,
  deleteQuestion,
} = require('../../controllers/assessmentTest/question.controller');

router.post('/create', addQuestions);
router.get('/question-list', getQuestionList);
router.get("/background", getQuestionsByBackground); // New route to fetch questions based on background
router.delete('/delete/:questionSetId/:questionId', deleteQuestion); // New route for deleting questions

module.exports = router;
