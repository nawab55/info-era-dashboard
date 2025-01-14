const express = require('express');
const { addCourse, getCourses, deleteCourse, getCourseByName } = require('../../controllers/assessmentTest/course.controller');
const router = express.Router();

router.post('/add', addCourse);
router.get('/', getCourses);

// get all courses by course name
router.get('/:courseName', getCourseByName); 

router.delete('/:id', deleteCourse);

module.exports = router;
