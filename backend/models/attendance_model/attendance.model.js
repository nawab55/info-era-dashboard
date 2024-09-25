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
      // required: true
    },
    time: {
      type: String,
      // required: true,
    },

    logouttime: {
      type: String,
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
      // required: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

