const express = require("express");
const {
  submitAssessment,
  getStudentAnswers,
  deleteStudentAnswers,
} = require("../../controllers/assessmentTest/studentAssessment.controller");

const router = express.Router();

// Route to submit a test
router.post("/submit-test", submitAssessment);

// Route to get a specific student's report
router.get("/student-answers/:mobile", getStudentAnswers);

// Route to delete a specific student's report and details
router.delete("/delete-student/:mobile", deleteStudentAnswers);
module.exports = router;
