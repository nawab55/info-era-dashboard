const express = require('express');
const router = express.Router();
const attendanceController = require('../../controllers/attendance/attendance.controller');
const { authenticate } = require('../../middleware/auth');

router.post('/attendance', authenticate, attendanceController.markAttendance);
router.get('/:userId', authenticate, attendanceController.getUserAttendance);

module.exports = router;
