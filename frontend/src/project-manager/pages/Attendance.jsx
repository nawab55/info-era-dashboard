import { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { format, isSameDay, parse } from "date-fns"; // New package for formatting date and time
import { FaSignOutAlt } from "react-icons/fa";

// // Helper function to get current date and time in a specific format using date-fns
// const getCurrentDateAndTime = () => {
//   const now = new Date();
//   const formattedDate = format(now, "EEEE, MM/dd/yyyy hh:mm:ss a"); // Format example: Monday, 08/12/2024 10:30:22 AM
//   return formattedDate;
// };

// Helper function to get current date and time in a specific format
const getCurrentDateAndTime = () => {
  return new Date(); // Return full Date object
};

// Helper function to format date as dd/mm/yyyy using date-fns
// const formatDate = (dateTimeString) => {
//   const date = new Date(dateTimeString);
//   return format(date, "dd/MM/yyyy");
// };
const formatDate = (dateTime) => {
  return format(dateTime, "dd/MM/yyyy");
};

// Helper function to extract time part (HH:MM AM/PM) using date-fns
// const formatTime = (dateTimeString) => {
//   const time = new Date(dateTimeString);
//   return format(time, "hh:mm a");
// };
// const formatTime = (dateTime) => {
//   return format(dateTime, "hh:mm a");
// };

// Helper function to extract weekday from the date-time string using date-fns
// const formatWeekday = (dateTimeString) => {
//   const weekday = new Date(dateTimeString);
//   return format(weekday, "EEEE");
// };
const formatWeekday = (dateTime) => {
  return format(dateTime, "EEEE");
};

// Helper function to check if the last attendance date is the same as today
const isToday = (dateString) => {
  const today = new Date();
  // Parse the date string (dd/MM/yyyy) into a Date object
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  // Compare if the parsed date and today's date are the same
  return isSameDay(parsedDate, today);
};

const Attendance = () => {
  // State for attendance status (Present, Absent, etc.)
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false); // To show the checkout button
  // const [checkInTime, setCheckInTime] = useState(null); // Store check-in time
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  ); // State for current time, updated every second
  const [attendanceId, setAttendanceId] = useState(""); // Store attendance record ID for checkout
  // const [isAutoCheckedOut, setIsAutoCheckedOut] = useState(false); // state to track automatic checkout

  // Fetch the user's name from session storage
  const userName = sessionStorage.getItem("username");
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch attendance status from the backend
    const fetchAttendance = async () => {
      try {
        // Get the current date and format it
        const currentDateAndTime = getCurrentDateAndTime();
        const datePart = formatDate(currentDateAndTime); // e.g., "28/09/2024"
        const response = await api.post(
          "/api/employee/attendance/today",
          { date: datePart },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        const lastAttendance = response.data.data; //Fetch last attendance date from db
        // console.log(lastAttendance);

        // Check if the last attendance date is today
        if (lastAttendance && isToday(lastAttendance.date)) {
          if (lastAttendance.logoutTime) {
            // If logoutTime exists, it means the user has already checked out (manually or automatically)
            setIsAttendanceMarked(false); // Hide checkout button
            // setIsAutoCheckedOut(true); // Show auto checkout message
          } else {
            // If logoutTime does not exist, show the checkout button
            setIsAttendanceMarked(true);
            setAttendanceId(lastAttendance._id);
            // setCheckInTime(lastAttendance.checkInTime);
            // setIsAutoCheckedOut(false); // Reset auto checkout message
          }
        } else {
          setIsAttendanceMarked(false); // If date has changed, show form again
          // setIsAutoCheckedOut(false); // Reset auto checkout message
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        toast.info("Welcome! Please mark your attendance for today.");
      }
    };
    fetchAttendance(); // Check if attendance is already marked for today
  }, []);

  // Handle form submission (Check-in)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Check if a valid attendance status is selected
    if (!attendanceStatus) {
      toast.error("Please select a valid attendance status.");
      return;
    }
    // Get current date, time, and weekday
    const currentDateAndTime = getCurrentDateAndTime();
    const datePart = formatDate(currentDateAndTime); // Format date
    // const timePart = formatTime(currentDateAndTime); // Format time
    const weekdayPart = formatWeekday(currentDateAndTime); // Extract weekday
    try {
      // Send a POST request to the backend to mark attendance
      const res = await api.post(
        "/api/employee/mark/attendance",
        {
          status: attendanceStatus, // Attendance status (Present, Absent, etc.)
          date: datePart, // Date  (formatted as dd/MM/yyyy)
          // checkInTime: timePart, // Time
          checkInTime: currentDateAndTime.toISOString(), // Send ISO string, (Send full Date object)
          weekday: weekdayPart, // Weekday
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Authorization using token
          },
        }
      );
      setIsAttendanceMarked(true); // Show checkout button
      setAttendanceId(res.data.data._id); // Store the ID for later use in checkout
      // setCheckInTime(res.data.data.checkInTime);
      // setIsAutoCheckedOut(false); // Reset auto checkout message

      // Save attendance data to localStorage
      localStorage.setItem("attendanceId", res.data.data._id);
      // localStorage.setItem("checkInTime", res.data.data.checkInTime);
      localStorage.setItem(
        "lastAttendanceDate",
        currentDateAndTime.toISOString()
      ); // Save the current date as ISO string to track the last attendance

      toast.success("Today Attendance marked Successfully!");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        "Error marking attendance:",
        error.response ? error.response.data.message : error.message
      );
      toast.error(
        `${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const handleCheckout = async () => {
    const logoutTime = getCurrentDateAndTime(); // Full Date object for logout
    // const hoursWorked = calculateTotalHours(new Date(checkInTime), logoutTime); // Pass check-in time and checkout time to the function
    try {
      await api.put(
        `/api/employee/attendance/${attendanceId}/checkout`,
        {
          logoutTime: logoutTime.toISOString(), // Send full Date object as ISO string to backend
          // logoutTime: formatTime(logoutTime), // Send formatted logout time to backend
          // totalHours: hoursWorked,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Checked out successfully!");
      localStorage.removeItem("attendanceId");
      // localStorage.removeItem("checkInTime");
      localStorage.removeItem("lastAttendanceDate"); // Clear attendance date when checking out
      setIsAttendanceMarked(false); // Hide the checkout button after logout and Show attendance form again
      // setIsAutoCheckedOut(false);
    } catch (error) {
      toast.error("Error checking out.");
    }
  };

  return (
    <section className="flex-1 min-h-screen p-4 rounded bg-gradient-to-br from-blue-100 via-white to-gray-100">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border rounded-lg bg-blue-50">
        <h1 className="text-2xl font-bold tracking-wide text-gray-900 md:text-3xl">
          Attendance
        </h1>
      </div>

      {/* Attendance Info */}
      <div className="flex flex-col p-4 mt-4 space-y-4 bg-white border rounded-lg md:p-6">
        {/* User Info */}
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="w-full px-4 py-2 text-base font-semibold bg-blue-100 rounded-lg shadow md:text-lg md:w-auto">
            <span className="text-gray-600">Your Name: </span>
            <span className="text-blue-800">{userName}</span>
          </div>
          <div className="w-full px-4 py-2 text-base font-semibold bg-blue-100 rounded-lg shadow md:text-lg md:w-auto">
            <span className="text-gray-600">Time: </span>
            <span className="text-blue-800">{currentTime}</span>
          </div>
          <div className="w-full px-4 py-2 text-base font-semibold bg-blue-100 rounded-lg shadow md:text-lg md:w-auto">
            <span className="text-gray-600">Date: </span>
            <span className="text-blue-800">
              {formatDate(getCurrentDateAndTime())}
            </span>
          </div>
        </div>

        {/* Attendance Status */}
        {isAttendanceMarked ? (
          <div className="p-4 text-center border rounded-lg bg-blue-50 md:p-6">
            <h2 className="text-xl font-bold text-green-700 md:text-2xl">
              Thank you for today!
            </h2>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 mx-auto mt-6 font-semibold text-white transition-transform transform bg-blue-600 rounded-lg shadow-md md:px-6 md:py-3 hover:bg-blue-700 "
              onClick={handleCheckout}
            >
              <FaSignOutAlt />
              Checkout
            </button>
            <hr className="mt-8 border-t-2 border-green-700" />
            <p className="mt-4 text-base font-semibold text-yellow-700 md:text-lg">
              You were automatically checked out at 9:00 PM today.
            </p>
          </div>
        ) : (
          <div className="p-4 mt-8 border rounded shadow-inner bg-gradient-to-tr from-white via-blue-50 to-blue-100 md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-center text-blue-700 md:text-xl">
              Mark Attendance
            </h2>
            {/* Attendance Options */}
            <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="present"
                  name="attendance"
                  checked={attendanceStatus === "present"}
                  onChange={() => setAttendanceStatus("present")}
                  className="sr-only"
                />
                <span
                  className="flex items-center justify-center w-6 h-6 text-green-700 transition-all duration-200 ease-in-out bg-green-200 rounded-full shadow-lg ring-offset-2 ring-offset-white"
                  aria-hidden="true"
                >
                  {attendanceStatus === "present" && "✓"}
                </span>
                <span className="ml-2 text-base font-medium text-green-700 md:text-lg">
                  Present
                </span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="absent"
                  name="attendance"
                  checked={attendanceStatus === "absent"}
                  onChange={() => setAttendanceStatus("absent")}
                  className="sr-only"
                />
                <span
                  className="flex items-center justify-center w-6 h-6 text-red-700 transition-all duration-200 ease-in-out bg-red-200 rounded-full shadow-lg ring-offset-2 ring-offset-white"
                  aria-hidden="true"
                >
                  {attendanceStatus === "absent" && "✗"}
                </span>
                <span className="ml-2 text-base font-medium text-red-700 md:text-lg">
                  Absent
                </span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="halfday"
                  name="attendance"
                  checked={attendanceStatus === "halfday"}
                  onChange={() => setAttendanceStatus("halfday")}
                  className="sr-only"
                />
                <span
                  className="flex items-center justify-center w-6 h-6 text-blue-700 transition-all duration-200 ease-in-out bg-blue-200 rounded-full shadow-lg ring-offset-2 ring-offset-white"
                  aria-hidden="true"
                >
                  {attendanceStatus === "halfday" && "½"}
                </span>
                <span className="ml-2 text-base font-medium text-blue-700 md:text-lg">
                  Half Day
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 font-semibold text-white transition-transform transform bg-blue-500 rounded-lg shadow-md md:px-6 md:py-3 hover:bg-blue-600 hover:scale-105"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Attendance;
