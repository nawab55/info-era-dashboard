const express = require("express");
const router = express.Router();
const jobController = require("../../controllers/jobs/job.controller");

// Route to create a new job
router.post("/post-job", jobController.createJob);

// Route to get all jobs
router.get("/get-all-jobs", jobController.getAllJobs);

// Route to update a job by ID
router.put("/:id", jobController.updateJob);

module.exports = router;
