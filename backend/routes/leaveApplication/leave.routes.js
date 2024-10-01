const express = require('express');
const {
  createLeaveRequest,
  getLeaveRequestsByUser,
  deleteLeaveRequest,
  updateLeaveStatus,
} = require('../../controllers/leave/leave.controller');
const router = express.Router();

// Create a leave request
router.post('/create/leave/:userId', createLeaveRequest);
// Get leave requests by userId
router.get('/get/leave/:userId', getLeaveRequestsByUser);
// Get leave requests of all employee which has pending status
router.get('/getAll/pendingLeaves', )
// Delete a leave request by id
router.delete('/leave/:id', deleteLeaveRequest);
// Update leave request status (approve, reject, etc.)
router.put('/leave/:id', updateLeaveStatus);

module.exports = router;
