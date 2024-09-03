// models/worksheet_model/worksheet.model.js
const mongoose = require('mongoose');

// actual schema for excel data file for uploading work for telecaller
// const excelDataSchema = new mongoose.Schema({
//   sNo: String,
//   domainName: String,
//   CreationDate: String,
//   expiryDate: String,
//   clientName: String,
//   clientMobNo: String,
//   emailId: String,
//   state: String,
//   district: String,
//   remark: String,
//   gender: String,
//   age: Number,
//   country: String
// })

// dummy schema for testing purpose
const excelDataSchema = new mongoose.Schema({
  sNo: Number,
  firstName: String,
  lastName: String,
  gender: String,
  country: String,
  age: Number,
  date: String,
  id: Number,
});

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
  },
  date: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
  },
  work: {
    type: String,
  },
  workDone: {
    type: String,
  },
  excelData: [excelDataSchema],  // Add this field for Excel data
});

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

module.exports = Worksheet;
