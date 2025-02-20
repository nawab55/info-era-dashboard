const cron = require("node-cron");
const Attendance = require("../models/attendance_model/attendance.model");
const { format, parse } = require("date-fns");

// Helper function to calculate total hours worked
const calculateTotalHours = (checkIn, logout) => {
  if (!checkIn || !logout) return "0 hours";

  const diffMs = logout - checkIn; // Difference in milliseconds
  const hours = Math.floor(diffMs / (1000 * 60 * 60)); // Hours
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

  return `${hours} hours, ${minutes} minutes`;
};

// Function to perform automatic checkout
const autoCheckout = async () => {
  try {
    const now = new Date();
    const todayDate = format(now, "dd/MM/yyyy"); // Assuming date is stored as 'dd/MM/yyyy'

    // Find all attendance records for today without a logoutTime
    const pendingCheckouts = await Attendance.find({
      date: todayDate,
      logoutTime: { $exists: false },
    });
    // console.log(pendingCheckouts);

    if (pendingCheckouts.length === 0) {
      // console.log("No pending checkouts found for today.");
      return;
    }

    // console.log(
    //   `Found ${pendingCheckouts.length} pending checkouts. Performing automatic checkout.`
    // );

    // const autoLogoutTime = format(new Date(now.setHours(21, 0, 0, 0)), 'hh:mm a'); // 9:00 PM
    const autoLogoutTimeStr = "09:00 PM"; // Fixed logout time at 9:00 PM
    const parsedLogoutTime = parse(autoLogoutTimeStr, "hh:mm a", new Date());

    for (const attendance of pendingCheckouts) {
      // const checkInTime = new Date(`1970-01-01T${attendance.checkInTime}Z`); // Parsing check-in time
      // const logoutTime = new Date(`1970-01-01T21:00:00Z`); // Fixed logout time at 9:00 PM UTC
      const checkInDateTimeStr = `${attendance.date} ${format(
        attendance.checkInTime,
        "hh:mm a"
      )}`;
      const checkInDateTime = parse(
        checkInDateTimeStr,
        "dd/MM/yyyy hh:mm a",
        new Date()
      );
      const totalHours = calculateTotalHours(checkInDateTime, parsedLogoutTime);
      const autoSubmitMessage = "Attendance was auto-submitted";

      // const totalHours = calculateTotalHours(checkInTime, logoutTime);
      // attendance.logoutTime = autoLogoutTime;
      // attendance.totalHours = totalHours;
      // attendance.autoSubmit = autoSubmitMessage;
      // await attendance.save();

      // Update the attendance record using findByIdAndUpdate
      await Attendance.findByIdAndUpdate(
        attendance._id,
        {
          logoutTime: parsedLogoutTime,
          autoSubmit: autoSubmitMessage,
          totalHours: totalHours,
        },
        { new: true }
      );

      // console.log(
      //   `Automatically checked out user ${attendance.userId} on ${todayDate}.`
      // );
    }
  } catch (error) {
    console.error("Error during automatic checkout:", error);
  }
};

// Schedule the cron job to run at 9:00 PM every day
cron.schedule(
  "0 21 * * *",
  () => {
    // console.log("Executing automatic checkout job at 9:00 PM.");
    autoCheckout();
  },
  {
    timezone: "Asia/Kolkata", // Replace with your server's timezone if different
  }
);

module.exports = autoCheckout;
