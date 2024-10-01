const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  }, // Reference to the User
  type: {
    type: String,
    required: true,
  }, // Leave type (e.g., Casual Leave, Sick Leave, etc.)
  fromDate: {
    type: Date,
    required: true,
  }, // Leave start date
  toDate: {
    type: Date,
    required: true, 
  }, // Leave end date
  reason: {
    type: String,
    required: true,
  }, // Reason for leave
  status: {
    type: String,
    default: "Pending",
  }, // Status of leave request
  appliedDate: {
    type: Date,
    default: Date.now,
  }, // Automatically set applied date
});

module.exports = mongoose.model('Leave', leaveSchema);
