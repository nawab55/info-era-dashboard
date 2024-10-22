const express = require('express');

const { 
    markAttendance, 
    checkoutAttendance, 
    getTodayAttendance, 
    getUserAttendanceByMonthYear,
} = require('../../controllers/attendance/attendance.controller.js');
const { authenticate } = require('../../middleware/auth.js');

const router = express.Router();

// Mark attendance
router.post('/mark/attendance', authenticate, markAttendance);
// Checkout attendance
router.put('/attendance/:attendanceId/checkout', authenticate, checkoutAttendance); 
// Get today's attendance for logged-in user
router.post("/attendance/today", authenticate, getTodayAttendance);

// Get attendance for a specific month and year (NEW ROUTE)
router.get('/attendance/:userId', authenticate, getUserAttendanceByMonthYear);

module.exports = router;

//  in future merge attendance and leave routes for all employee 

// const express = require('express');
// const {
//   createLeaveRequest,
//   getLeaveRequestsByUser,
//   deleteLeaveRequest,
//   updateLeaveStatus,
// } = require('../../controllers/leave/leave.controller');
// const router = express.Router();

// // Create a leave request
// router.post('/leave', createLeaveRequest);

// // Get leave requests by userId
// router.get('/leave/:userId', getLeaveRequestsByUser);

// // Delete a leave request by id
// router.delete('/leave/:id', deleteLeaveRequest);

// // Update leave request status (approve, reject, etc.)
// router.put('/leave/:id', updateLeaveStatus);

// module.exports = router;
