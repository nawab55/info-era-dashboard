const express = require('express');
const router = express.Router();
const jobFormController = require('../../controllers/jobs/jonForm.controller');

// Route to create a new job
router.post('/post-jobForm', jobFormController.createJobForm);

// Route to get all jobs
router.get('/get-allJobForm', jobFormController.getAllJobsForm);

// Route to update a job by ID
router.put('/:id', jobFormController.updateJobForm);

module.exports = router;
