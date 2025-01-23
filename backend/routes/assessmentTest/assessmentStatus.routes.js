const express = require("express");
const router = express.Router();
const {
  getStatus,
  updateStatus,
} = require("../../controllers/assessmentTest/assessmentStatus.controller");

// Route to get the current status
router.get("/get-status", getStatus);

// Route to update the status
router.put("/update-status", updateStatus);

module.exports = router;
