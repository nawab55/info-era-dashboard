const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false, // Not all activities may have an image
      enum: ["male", "female"],
    },
    country: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    requirementFor: {
      type: String,
      required: true,
    },
    email: {
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const ClientQuery = mongoose.model("ClientQuery", querySchema);

module.exports = ClientQuery;
