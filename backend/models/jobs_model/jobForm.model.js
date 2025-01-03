const mongoose = require("mongoose");

const jobFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    mobile: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    resume: {
      src: String,
      fileType: String,
      fileName: String,
    },
    // resume: {
    //   type: String,
    //   required: true, // Validate file type and size in middleware
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobForm", jobFormSchema);
