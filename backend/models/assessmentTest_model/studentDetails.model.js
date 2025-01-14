const mongoose = require("mongoose");

const studentDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    course: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentDetails", studentDetailsSchema);
