const express = require("express");
const router = express.Router();
const {
  studentSubmissionForm,
  getStudentsSubmissionForm,
  updateStudentSubmissionForm,
  deleteStudentSubmissionForm,
} = require("../../controllers/training/studentTraining.controller");

// Create a new training form
router.post("/student-training", studentSubmissionForm);

// Get all training forms
router.get("/get-all-training", getStudentsSubmissionForm);

// Update a training form by ID
router.put("/update/:id", updateStudentSubmissionForm);

// Delete a training form by ID
router.delete("/delete/:id", deleteStudentSubmissionForm);

module.exports = router;
