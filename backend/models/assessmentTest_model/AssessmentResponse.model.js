const mongoose = require("mongoose");

const AssessmentResponseSchema = new mongoose.Schema(
  {
    // studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentDetails', required: true },
    student: {
      name: { type: String, required: true },
      mobile: { type: String, required: true },
    },
    responses: [
      {
        questionTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        questionId: { type: mongoose.Schema.Types.ObjectId,  },
        selectedOption: { type: String, required: true },  // Store as "A", "B", "C", "D"
      },
    ],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssessmentResponse", AssessmentResponseSchema);
