const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/training/student.controller');

// Route to create a new student
router.post('/create-students', studentController.createStudent);

// Route to get all students
router.get('/get-students', studentController.getStudents);

module.exports = router;
