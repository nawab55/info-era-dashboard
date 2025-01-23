// models/AssessmentStatus.js
const mongoose = require("mongoose");

const assessmentStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
      default: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssessmentStatus", assessmentStatusSchema);
