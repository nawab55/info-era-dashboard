const Attendance = require("../../models/attendance_model/attendance.model");
const User = require("../../models/user_model/User");


exports.markAttendance = async (req, res) => {
  
  const userId = req.user._id; // Retrieve user ID from the token
  const { status, date, time, weekday } = req.body;
  try {
    // Fetch employee information by _id // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if attendance for the date already exists
    const existingAttendance = await Attendance.findOne({ userId, date });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance for today has already been marked.' });
    }

    // Create attendance record with the current date and time
    const attendanceRecord = new Attendance({
      userId: user._id,
      empname: user.name,
      date: date,
      time: time,
      weekday: weekday,
      status: status,
    });
    // Save the attendance record
    await attendanceRecord.save();
    res.status(201).json({
      message: `Attendance marked for ${user.name} today!`,
      data: {
        _id: attendanceRecord._id,
        checkInTime: attendanceRecord.time,
      },
    });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error while marking attendance.' });
  }
};

exports.checkoutAttendance = async (req, res) => {
  const { attendanceId } = req.params;
  const { logoutTime, totalHours } = req.body;

  try {
    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found." });
    }

    // Update the attendance record with logout time and total hours
    attendance.logouttime = logoutTime;
    attendance.totalHours = totalHours;

    await attendance.save();

    res.status(200).json({ message: "Checkout successful", data: attendance });
  } catch (error) {
    res.status(500).json({ message: "Server error during checkout." });
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
