const mongoose = require("mongoose");

const consultingSchema = new mongoose.Schema(
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
    address: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    consulting: {
      type: String,
      enum: ["Physicial (₹ 5000 per hour)", "Virtual (₹ 2000 per hour)"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consulting", consultingSchema);
