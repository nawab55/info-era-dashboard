const Job = require('../../models/jobs_model/job.model');

// Create a new job
const createJob = async (req, res) => {
    try {
        const { jobTitle, experience, description } = req.body;

        if (!jobTitle || !experience || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const job = new Job({ jobTitle, experience, description });
        await job.save();
        res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
        res.status(500).json({ error: "Failed to create job", message: error.message });
    }
};

// Get all jobs with pagination
const getAllJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const jobs = await Job.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalJobs = await Job.countDocuments();

        res.status(200).json({
            jobs,
            currentPage: Number(page),
            totalPages: Math.ceil(totalJobs / limit),
            totalJobs,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch jobs", details: error.message });
    }
};

// Update a job by ID
const updateJob = async (req, res) => {
    try {
        // Extract the job ID from the request parameters
        const jobId = req.params.id;
        // Extract the updated job data from the request body
        const updatedJobData = req.body;
        // Find the job by ID and update it with the new data
        const job = await Job.findByIdAndUpdate(jobId, updatedJobData, { new: true });

        // If the job with the specified ID was not found, return a 404 error
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // If the job was successfully updated, return a success response with the updated job data
        res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        // If an error occurs during the update process, return a 500 error response
        res.status(500).json({ error: "Failed to update job", message: error.message });
    }
};

// Delete a job by ID
const deleteJob = async (req, res) => {
    try {
        // Extract the job ID from the request parameters
        const jobId = req.params.id;

        // Find the job by ID and delete it
        const job = await Job.findByIdAndDelete(jobId);

        // If the job with the specified ID was not found, return a 404 error
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // If the job was successfully deleted, return a success response
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        // If an error occurs during the delete process, return a 500 error response
        res.status(500).json({ error: "Failed to delete job", messsage: error.message });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
}

