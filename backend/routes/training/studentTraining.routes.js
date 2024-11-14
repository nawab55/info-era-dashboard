// routes/certificateRoutes.js
const express = require("express");
const router = express.Router();
const {
  studentSubmissionForm,
  getStudentsSubmissionForm,
} = require("../../controllers/training/studentTraining.controller");

// POST route to create a certificate
router.post("/student-training", studentSubmissionForm);

// GET route to retrieve all certificates
router.get("/get-all", getStudentsSubmissionForm);

module.exports = router;
