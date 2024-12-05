const express = require("express");
const router = express.Router();
const jobFormController = require("../../controllers/jobs/jonForm.controller");

// Route to create a new job
router.post("/post-jobForm", jobFormController.createJobForm);

// Route to get all jobs
router.get("/get-allJobForm", jobFormController.getAllJobsForm);

// Route to update a job form by ID
router.put("/update-jobForm/:id", jobFormController.updateJobForm);

// Route to delete a job form by ID
router.delete("/delete-jobForm/:id", jobFormController.deleteJobForm);

module.exports = router;
