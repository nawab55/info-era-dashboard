const mongoose = require("mongoose");

const studentTrainingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    fatherName: {
      type: String,
      required: true,
    },
    perCountry: {
      type: String,
      required: true,
    },
    perState: {
      type: String,
      required: true,
    },
    perDistrict: {
      type: String,
      required: true,
    },
    perPinCode: {
      type: String,
      required: true,
    },
    perAddress: {
      type: String,
      required: true,
    },
    corCountry: {
      type: String,
      required: true,
    },
    corState: {
      type: String,
      required: true,
    },
    corDistrict: {
      type: String,
      required: true,
    },
    corPinCode: {
      type: String,
      required: true,
    },
    corAddress: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    passingYear: {
      type: String,
      required: true,
    },
    universityName: {
      type: String,
      required: true,
    },
    collegeRollNo: {
      type: String,
      required: true,
    },
    streamName: {
      type: String,
      required: true,
    },
    universityRegNo: {
      type: String,
    },
    interestedFor: {
      type: String,
      required: true,
    },
    profilePhoto: {
      src: String,
      fileType: String,
      fileName: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentTraining", studentTrainingSchema);
