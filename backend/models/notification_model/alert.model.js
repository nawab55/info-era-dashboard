const mongoose = require("mongoose");
const moment = require("moment");

const alertSchema = new mongoose.Schema({
  alertType: {
    type: String,
    required: true,
    enum: ["Success", "Info", "Warning", "Danger"],
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,  // Store date as string
    default: () => moment().format('Do MMMM YYYY, h:mm:ss a'),   // 3rd October 2024, 6:48:28 pm
  },
});

module.exports = mongoose.model("Alert", alertSchema);
