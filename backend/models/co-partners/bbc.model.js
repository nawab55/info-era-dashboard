const mongoose = require("mongoose");

const bbcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true, 
  },
  gender: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
  },
  email: {
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
  district: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BBC", bbcSchema);
