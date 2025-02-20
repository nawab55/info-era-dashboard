const mongoose = require('mongoose');

// Family Details Schema
const familyDetailsSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  frelation: {
    type: String,
  },
  foccupation: {
    type: String,
  },
  fdob: {
    type: Date,
  },
});

// Educational Details Schema
const educationalDetailsSchema = new mongoose.Schema({
  edegree: {
    type: String,
  },
  euniversity: {
    type: String,
  },
  especialization: {
    type: String,
  },
  efromDate: {
    type: Date,
  },
  etoDate: {
    type: Date,
  },
  epercentage: {
    type: String,
  },
});

// Employment Details Schema
const employmentDetailsSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  designation: {
    type: String,
  },
  empFromDate: {
    type: Date,
  },
  empToDate: {
    type: Date,
  },
  annualctc: {
    type: String,
  },
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  empType: {
    type: String,
  },
  designation: {
    type: String,
  },
  // Employee-specific fields
  fathersName: {
    type: String,
  },
  mothersName: {
    type: String,
  },
  correspondenceAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  altMobile: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  aadharNo: {
    type: String,
  },
  aadhaarFrontImage: {
    type: String, // Storing the path to the file
  },
  aadhaarBackImage: {
    type: String, // Storing the path to the file
  },
  panImage: {
    type: String, // Storing the path to the file
  },
  panNo: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  dateOfJoining: {
    type: Date,
  },
  EmpId: {
    type: String,
    unique: true,
  },
  emergencyContactName: {
    type: String,
  },
  emergencyContactRelation: {
    type: String,
  },
  emergencyContactMobile: {
    type: String,
  },
  emergencyContactAddress: {
    type: String,
  },
  familyDetails: [familyDetailsSchema],
  educationalDetails: [educationalDetailsSchema],
  employmentDetails: [employmentDetailsSchema],
  bankAccName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  branchName: {
    type: String,
  },
  decDate: {
    type: Date,
  },
  signature: {
    type: String, // Storing the path to the file
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
