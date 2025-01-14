const express = require("express");
const { addStudent, getStudentCookies } = require("../../controllers/assessmentTest/studentDetails.controller");
const router = express.Router();

// Route to add a new student
router.post("/add", addStudent);

// Route to get student details from cookies.
router.get("/get-student-cookies", getStudentCookies);

module.exports = router;
