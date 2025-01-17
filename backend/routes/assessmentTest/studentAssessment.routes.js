const express = require("express");
const {
  submitTest,
  getStudentAnswers,
  getDashboardSummary,
} = require("../../controllers/assessmentTest/studentAssessment.controller");

const router = express.Router();

// Route to submit a test
router.post("/submit-test", submitTest);

// Route to get a specific student's report
router.get("/student-answers/:mobile", getStudentAnswers);

// Route to get dashboard summary
router.get("/dashboard-summary", getDashboardSummary);

module.exports = router;
