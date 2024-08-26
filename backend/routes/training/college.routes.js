const express = require('express');
const router = express.Router();
const collegeController = require('../../controllers/training/college.controller');

// Route to create a new college
router.post('/create-colleges', collegeController.createCollege);

// Route to get all colleges
router.get('/get-colleges', collegeController.getColleges);

module.exports = router;
