const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    empname: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    logoutTime: {
      type: Date,
    },
    totalHours: {
      type: String,
    },
    weekday: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "halfday", "holiday"],
      required: true,
    },
    autoSubmit: {
      type: String, // Field to store your message
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
