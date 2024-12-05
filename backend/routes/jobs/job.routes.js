const express = require("express");
const router = express.Router();
const jobController = require("../../controllers/jobs/job.controller");

// Route to create a new job
router.post("/post-job", jobController.createJob);

// Route to get all jobs (with pagination)
router.get("/get-all-jobs", jobController.getAllJobs);

// Route to update a job by ID
router.put("/:id", jobController.updateJob);

// Route to delete a job by ID
router.delete("/:id", jobController.deleteJob);

module.exports = router;
