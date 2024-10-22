const Attendance = require("../../models/attendance_model/attendance.model");
const User = require("../../models/user_model/User"); 
const { parse, isWithinInterval } = require("date-fns");

exports.markAttendance = async (req, res) => {
  const userId = req.user._id; // Retrieve user ID from the token
  const { status, date, checkInTime, weekday } = req.body;
  // console.log(status, date, checkInTime, weekday);
  try {
    // Fetch employee information by _id // Ensure the user exists
    const user = await User.findById(userId);
    // console.log(user.name);
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

exports.getUserAttendanceByMonthYear = async (req, res) => {
  const { userId } = req.params;
  const {month, year} = req.query;
  // console.log(userId, month, year, new Date() );

  // this is code for when date is stored in db as Date foramt
  // const startDate = new Date(`${year}-${month}-01`);  // Start of the month
  // const endDate = new Date(year, month, 0);  // End of the month

  // this is the code for date is stored in db as a String format 
 // Define start and end dates in the 'DD/MM/YYYY' format
 const startDateString = `01/${month.padStart(2, '0')}/${year}`; // First day of the month
 const endDateString = `${new Date(year, month, 0).getDate()}/${month.padStart(2, '0')}/${year}`; // Last day of the month

 // Parse the start and end dates to Date objects
  const startDate = parse(startDateString, "dd/MM/yyyy", new Date());
  const endDate = parse(endDateString, "dd/MM/yyyy", new Date());
  // console.log(`Querying from ${startDateString} (${startDate}) to ${endDateString} (${endDate}) for UserId: ${userId}`);
  try {
    // Fetch all attendance records for the user
    const attendanceRecords = await Attendance.find({ userId });

    // Filter records where the date is within the startDate and endDate range
    const filteredRecords = attendanceRecords.filter(record => {
      const recordDate = parse(record.date, "dd/MM/yyyy", new Date());
      return isWithinInterval(recordDate, { start: startDate, end: endDate });
    });

    // filteredRecords.forEach((data, index) => {
    //   console.log(data.date, "and status ", data.status);
    // });
    // console.log(filteredRecords);
    res.status(200).json(filteredRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json("Internal Server Error");
  }
};
