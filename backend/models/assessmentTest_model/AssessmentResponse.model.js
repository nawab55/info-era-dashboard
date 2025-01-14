const mongoose = require("mongoose");

const AssessmentResponseSchema = new mongoose.Schema(
  {
    student: {
      name: { type: String, required: true },
      mobile: { type: String, required: true },
    },
    responses: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        answer: { type: String, required: true },
      },
    ],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssessmentResponse", AssessmentResponseSchema);
