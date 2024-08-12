const Attendance = require("../../models/attendance_model/attendance.model");
const User = require("../../models/user_model/User");

exports.markAttendance = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user._id; // Retrieve user ID from the token
    const { status } = req.body;

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save the attendance record
    // const attendance = new Attendance({ userId, status });
    // await attendance.save();

    // Create and save the attendance record using the create method
    const attendance = await Attendance.create({ userId, status });

    res
      .status(201)
      .json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
