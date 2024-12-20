// models/Certificate.js
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Remove whitespace
      uppercase: true, // Normalize case
      match: [/^[A-Z]{2}-[A-Z]{3}-\d+$/, "Invalid registration number format"],
    },

    studentName: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;
