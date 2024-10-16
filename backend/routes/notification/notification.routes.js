const express = require("express");
const router = express.Router();
const { createAlert, getAlerts } = require("../../controllers/notification/alert.controller");
const { authenticate } = require("../../middleware/auth");
const { createIssue, updateIssueStatus, getIssuesByUserId, getIssues } = require("../../controllers/notification/issue.controller");

// Route to add a new alert
router.post("/alerts", authenticate, createAlert);
// Route to get all alerts
router.get("/alerts", getAlerts);

// POST /api/message/issues - Create a new issue
router.post("/issues", authenticate, createIssue);
// GET /api/message/issues/get-all?page=1&limit=10 - Get all Issues with pagination
router.get('/issues/get-all', authenticate, getIssues);
// GET /api/message/issues/get/:userId - Get all issues of employee(user) by its id
router.get("/issues/get/:userId", authenticate, getIssuesByUserId);
// PATCH /api/message/issues/:id/status - Update issue status
router.patch("/issues/:id/status", authenticate, updateIssueStatus);

module.exports = router;