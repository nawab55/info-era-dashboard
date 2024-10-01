const Attendance = require("../../models/attendance_model/attendance.model");
const User = require("../../models/user_model/User"); 
const { parseISO } = require("date-fns");

exports.markAttendance = async (req, res) => {
  const userId = req.user._id; // Retrieve user ID from the token
  const { status, date, checkInTime, weekday } = req.body;
  console.log(status, date, checkInTime, weekday);
  try {
    // Fetch employee information by _id // Ensure the user exists
    const user = await User.findById(userId);
    console.log(user.name);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if attendance for the date already exists
    const existingAttendance = await Attendance.findOne({ userId, date });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance for today has already been marked.' });
    }
     // Parse checkInTime to Date object
    const parsedCheckInTime = new Date(checkInTime);
    if (isNaN(parsedCheckInTime)) {
      return res.status(400).json({ message: 'Invalid checkInTime format.' });
    }
    // Create attendance record with the current date and time
    const attendance = new Attendance({
      userId: user._id,
      empname: user.name,
      date: date,
      checkInTime: parsedCheckInTime,
      weekday: weekday,
      status: status,
    });
    // Save the attendance record
    const savedAttendance = await attendance.save();
    res.status(201).json({
      message: `Attendance marked for ${user.name} today!`,
      data: savedAttendance,
    });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error while marking attendance.' });
  }
};

exports.checkoutAttendance = async (req, res) => {
  const { attendanceId } = req.params;
  const { logoutTime } = req.body;
  console.log(`logoutTime -> ${logoutTime}`);
  
  try {
    // Parse logoutTime to Date object
    const parsedLogoutTime = new Date(logoutTime);
    if (isNaN(parsedLogoutTime)) {
      return res.status(400).json({ message: 'Invalid logoutTime format.' });
    }
    // Find the attendance record
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found." });
    }
    // Ensure check-out has not already been done
    if (attendance.logoutTime) {
      return res.status(400).json({ message: "Already checked out." });
    }
    // Calculate total hours worked
    const diffMs = parsedLogoutTime - attendance.checkInTime;
    if (isNaN(diffMs) || diffMs < 0) {
      return res.status(400).json({ message: "Invalid logout time." });
    }
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const totalHours = `${hours} hours, ${minutes} minutes`;

    // Update the attendance record using findByIdAndUpdate
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      {
        logoutTime: parsedLogoutTime,
        totalHours: totalHours,
      },
      { new: true }
    );
    console.log(`logoutTime -> ${logoutTime}. and totalHours -> ${totalHours}`);
    // Update the attendance record with logout time and total hours
    // attendance.logoutTime = logoutTime;
    // attendance.totalHours = totalHours;
    // await attendance.save();
    res.status(200).json({ message: "Checkout successfully", data: updatedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Server error during checkout." });
    console.log({ error:error.message });
  }
};
// Fetch today's attendance for the logged-in user
exports.getTodayAttendance = async (req, res) => {
  const userId = req.user._id; // Assuming user data is available via req.user after authentication
  const { date } = req.body; // Use the date from the frontend
  try {
    // Find attendance for the user and today's date
    const attendance = await Attendance.findOne({ userId, date });
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for today.' });
    }
    res.status(200).json({
      message: `Attendance record for ${attendance.empname} on ${attendance.date}`,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Error fetching attendance.", error });
  }
};

exports.getUserAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch all attendance records for the user
    const attendanceRecords = await Attendance.find({ userId }).populate(
      "userId",
      "email"
    );
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
