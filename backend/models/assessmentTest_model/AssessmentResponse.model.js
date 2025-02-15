const mongoose = require("mongoose");

const AssessmentResponseSchema = new mongoose.Schema(
  {
    // studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentDetails', required: true },
    student: {
      name: { type: String, required: true },
      mobile: { type: String, required: true, unique: true },
    },
    responses: [
      {
        questionTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question',  },
        questionId: { type: mongoose.Schema.Types.ObjectId,  },
        selectedOption: { type: String },  // Store as "A", "B", "C", "D"
      },
    ],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssessmentResponse", AssessmentResponseSchema);
