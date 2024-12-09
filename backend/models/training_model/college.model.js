const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    collegeCode: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // This enables createdAt and updatedAt fields
  }
);

const College = mongoose.model("College", collegeSchema);

module.exports = College;
