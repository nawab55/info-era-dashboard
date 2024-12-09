const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/training/student.controller');

// Route to create a new student
router.post('/create-students', studentController.createStudent);

// Route to get the latest registration number
router.get("/latest-registration", studentController.getLatestRegistration);

// Route to get all students
router.get('/get-students', studentController.getStudents);

// Route to delete a student by ID
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
