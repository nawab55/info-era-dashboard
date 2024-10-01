// attendanceService.js
const Attendance = require('./models/attendance_model/attendance.model'); // Adjust the path as necessary
const { format } = require('date-fns');

// Helper function to calculate total hours
// const calculateTotalHours = (checkIn, logout) => {
//   if (!checkIn || !logout) return '0 hours';

//   const diffMs = logout - checkIn; // Difference in milliseconds
//   const hours = Math.floor(diffMs / (1000 * 60 * 60)); // Hours
//   const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

//   return `${hours} hours, ${minutes} minutes`;
// };

// Function to perform checkout
const performCheckout = async (attendanceId, logoutTimeStr) => {
  try {
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      throw new Error('Attendance record not found.');
    }
    if (attendance.logoutTime) {
      throw new Error('Already checked out.');
    }

    // Parse check-in time
    const checkInTime = new Date(`1970-01-01T${attendance.checkInTime}Z`);
    const logoutTime = new Date(`1970-01-01T${logoutTimeStr}Z`);

    const totalHours = calculateTotalHours(checkInTime, logoutTime);

    attendance.logoutTime = logoutTimeStr;
    attendance.totalHours = totalHours;

    await attendance.save();

    return attendance;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  performCheckout,
};
