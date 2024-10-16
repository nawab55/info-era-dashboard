const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  }, // Reference to the User
  empname: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Unresolved", "Resolved"],
    default: "Unresolved",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Issue", issueSchema);
