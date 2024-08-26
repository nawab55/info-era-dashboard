const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
  },
  yearSession: {
    type: String,
    required: true,
    trim: true,
  },
  rollNo: {
    type: String,
    required: true,
    trim: true,
  },
  semester: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true,
  },
  trainingTopic: {
    type: String,
    required: true,
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
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
