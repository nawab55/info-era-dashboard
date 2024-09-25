const express = require('express');

const { markAttendance, checkoutAttendance } = require('../../controllers/attendance/attendance.controller.js');
const { authenticate } = require('../../middleware/auth.js');

const router = express.Router();

// POST /api/attendance
router.post('/mark/attendance', authenticate, markAttendance);
router.put('/attendance/:attendanceId/checkout', authenticate, checkoutAttendance); // New route for checkout

module.exports = router;
