// models/worksheet_model/worksheet.model.js
const mongoose = require('mongoose');

// actual schema for excel data file for uploading work for telecaller
const excelDataSchema = new mongoose.Schema({
  sNo: String,
  domainName: String,
  creationDate: String,
  expiryDate: String,
  domainRegistrarName: String,
  registrantName: String,
  registrantCompany: String,
  registrantCity: String,
  registrantState: String, 
  registrantZip: String,
  registrantCountry: String,
  registrantEmail: String,
  registrantPhone: String,
  response: String,
  remark: String,
  action: String,
})

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
    // immutable: true,
  },
  excelData: [excelDataSchema],    // Array of objects to store sheet data
});

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

module.exports = Worksheet;
