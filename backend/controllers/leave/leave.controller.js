const Leave = require("../../models/leave_model/leaveApplication.model");

// Create a new leave request
exports.createLeaveRequest = async (req, res) => {
  const { type, fromDate, toDate, reason } = req.body;
  const { userId } = req.params;

  try {
    const newLeaveRequest = new Leave({
      userId,  // Associate the leave with the userId
      type,
      fromDate,
      toDate,
      reason,
    });

    const savedLeaveRequest = await newLeaveRequest.save();
    res.status(201).json({ message: 'Leave request submitted successfully', leave: savedLeaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit leave request', error });
  }
};

// Get leave requests for a specific user
exports.getLeaveRequestsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const leaveRequests = await Leave.find({ userId }).sort({ appliedDate: -1 }); // Sorted by applied date (latest first)
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve leave requests', error });
  }
};

// Get all leave requests of pending status
exports.getAllPendingLeaveRequest = async (req, res) => {
  
}

// Delete a leave request
exports.deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await Leave.findByIdAndDelete(id);
    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete leave request', error });
  }
};

// Update the status of a leave request
exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const leaveRequest = await Leave.findById(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leaveRequest.status = status;
    await leaveRequest.save();

    res.status(200).json({ message: 'Leave request status updated successfully', leave: leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update leave request status', error });
  }
};
