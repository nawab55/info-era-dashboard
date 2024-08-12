// models/Worksheet.js
const mongoose = require('mongoose');

const worksheetSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  empName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  workDone: {
    type: String,
  }
});

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

module.exports = Worksheet;
