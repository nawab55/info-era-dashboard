const express = require("express");
const router = express.Router();
const { createAlert, getAlerts } = require("../../controllers/notification/alert.controller");
const { authenticate } = require("../../middleware/auth");
const { createIssue, getIssues, updateIssueStatus } = require("../../controllers/notification/issue.controller");

// Route to add a new alert
router.post("/alerts", authenticate, createAlert);
// Route to get all alerts
router.get("/alerts", getAlerts);

// POST /api/issues - Create a new issue
router.post("/issues", authenticate, createIssue);
// GET /api/issues - Get all issues
router.get("/issues", authenticate, getIssues);
// PATCH /api/issues/:id/status - Update issue status
router.patch("/issues/:id/status", authenticate, updateIssueStatus);


module.exports = router;

// const express = require("express");
// const {
//   createIssue,
//   getIssues,
//   updateIssueStatus,
// } = require("../controllers/issueController");

// const router = express.Router();

// // POST /api/issues - Create a new issue
// router.post("/issues", createIssue);

// // GET /api/issues - Get all issues
// router.get("/issues", getIssues);

// // PATCH /api/issues/:id/status - Update issue status
// router.patch("/issues/:id/status", updateIssueStatus);

// module.exports = router;
