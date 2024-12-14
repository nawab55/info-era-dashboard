const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    yearSession: {
      type: String,
      trim: true,
    },
    rollNo: {
      type: String,
      trim: true,
    },
    semester: {
      type: String,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
    },
    trainingTopic: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // This enables createdAt and updatedAt fields
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
