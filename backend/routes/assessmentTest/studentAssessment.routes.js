const express = require("express");
const {
  submitAssessment,
  getStudentAnswers,
} = require("../../controllers/assessmentTest/studentAssessment.controller");

const router = express.Router();

// Route to submit a test
router.post("/submit-test", submitAssessment);

// Route to get a specific student's report
router.get("/student-answers/:mobile", getStudentAnswers);

module.exports = router;
