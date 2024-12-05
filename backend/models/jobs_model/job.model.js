const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: [true, "Job title is required"],
            minlength: [3, "Job title must be at least 3 characters long"],
            maxlength: [100, "Job title cannot exceed 100 characters"],
        },
        experience: {
            type: String,
            required: [true, "Experience is required"],
            match: [/^\d+(\+)? years?$/, "Experience must be a valid format (e.g., '3 years' or '5+ years')"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [10, "Description must be at least 10 characters long"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
