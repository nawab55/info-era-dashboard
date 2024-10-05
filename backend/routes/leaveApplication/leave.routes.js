const express = require('express');
const {
  createLeaveRequest,
  getLeaveRequestsByUser,
  deleteLeaveRequest,
  updateLeaveStatus,
  getAllPendingLeaveRequest,
} = require('../../controllers/leave/leave.controller');
const { authenticate } = require('../../middleware/auth');
const router = express.Router();

// Create a leave request
router.post('/create/leave/:userId', authenticate, createLeaveRequest);
// Get leave requests by userId
router.get('/get/leave/:userId', authenticate, getLeaveRequestsByUser);
// Get leave requests of all employee which has pending status
router.get('/getAll/pendingLeaves', authenticate, getAllPendingLeaveRequest)
// Update leave request status (approve, reject, etc.)
router.put('/updateStatus/:leaveId', updateLeaveStatus);
// Delete a leave request by id
router.delete('/leave/:id', deleteLeaveRequest);

module.exports = router;
