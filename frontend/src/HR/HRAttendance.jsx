import { useEffect, useState } from "react";
import api from "../config/api";
import { toast } from "react-toastify";
import { format, isSameDay, parse } from "date-fns"; // New package for formatting date and time
import { FaSignOutAlt } from "react-icons/fa"; // Exit icon

// Helper function to get current date and time in a specific format
const getCurrentDateAndTime = () => {
  return new Date(); // Return full Date object
};

// Helper function to format date as dd/mm/yyyy using date-fns
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

const HRAttendance = () => {
  // State for attendance status (Present, Absent, etc.)
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false); // To show the checkout button
  // const [checkInTime, setCheckInTime] = useState(null); // Store check-in time
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  ); // State for current time, updated every second
  const [attendanceId, setAttendanceId] = useState(""); // Store attendance record ID for checkout

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

        // Check if the last attendance date is today
        if (lastAttendance && isToday(lastAttendance.date)) {
          if (lastAttendance.logoutTime) {
            // If logoutTime exists, it means the user has already checked out (manually or automatically)
            setIsAttendanceMarked(false); // Hide checkout button
          } else {
            // If logoutTime does not exist, show the checkout button
            setIsAttendanceMarked(true);
            setAttendanceId(lastAttendance._id);
          }
        } else {
          setIsAttendanceMarked(false); // If date has changed, show form again
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

      // Save attendance data to localStorage
      // localStorage.setItem("attendanceId", res.data.data._id);
      // // localStorage.setItem("checkInTime", res.data.data.checkInTime);
      // localStorage.setItem("lastAttendanceDate", currentDateAndTime.toISOString()); // Save the current date as ISO string to track the last attendance

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
    try {
      await api.put(
        `/api/employee/attendance/${attendanceId}/checkout`,
        {
          logoutTime: logoutTime.toISOString(), // Send full Date object as ISO string to backend
          // logoutTime: formatTime(logoutTime), // Send formatted logout time to backend
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Checked out successfully!");
      setIsAttendanceMarked(false); // Hide the checkout button after logout and Show attendance form again
      // localStorage.removeItem("attendanceId");
      // // localStorage.removeItem("checkInTime");
      // localStorage.removeItem("lastAttendanceDate"); // Clear attendance date when checking out
    } catch (error) {
      toast.error("Error checking out.");
    }
  };

  return (
    <section className="bg-white p-4 flex-1">
      {/* Header */}
      <div className="flex items-center justify-center border-b-2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-white py-3">Attendance</h1>
      </div>

      <div className="bg-gray-100 flex flex-col justify-start pb-20 rounded-md mt-4 shadow-lg">
        {/* Name, Date, Time */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 shadow-md bg-white rounded-lg text-gray-800 mb-6">
          <h2 className="text-lg font-semibold p-2 rounded bg-blue-50 shadow">
            Your Name: <span className="text-blue-900">{userName}</span>
          </h2>
          <h2 className="text-lg font-semibold p-2 rounded bg-blue-50 shadow mt-2 md:mt-0">
            Time: <span className="text-blue-900">{currentTime}</span>
          </h2>
          <h2 className="text-lg font-semibold p-2 rounded bg-blue-50 shadow mt-2 md:mt-0">
            Date:{" "}
            <span className="text-blue-900">
              {formatDate(getCurrentDateAndTime())}
            </span>
          </h2>
        </div>

        {isAttendanceMarked ? (
          <div className="text-center pt-8">
            <h1 className="text-2xl md:text-3xl text-green-700 font-bold">
              THANK YOU FOR TODAY!
            </h1>
            <button
              className="mt-6 flex mx-auto items-center justify-center text-white bg-gradient-to-r from-blue-600 to-green-600 px-6 py-2 rounded shadow-lg  transform transition"
              onClick={handleCheckout}
            >
              <FaSignOutAlt className="mr-2" /> Checkout
            </button>
            <div className="mt-10">
              <hr className="mx-auto mb-4 h-1 w-1/2 bg-green-900" />
              <h1 className="text-xl md:text-2xl text-yellow-600 font-semibold">
                You were automatically checked out at 9:00 PM today.
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex justify-center pt-6">
            <div className="w-full sm:w-full md:w-3/4 lg:w-1/2 bg-gradient-to-r from-orange-100 to-teal-50 shadow-2xl rounded-lg p-6">
              <h1 className="text-center text-xl font-bold text-custom-blue uppercase mb-4">
                Mark Attendance
              </h1>

              <div className="flex justify-around text-center">
                {["present", "absent", "halfday"].map((status) => (
                  <div className="flex items-center my-2" key={status}>
                    <input
                      id={`${status}-radio`}
                      type="radio"
                      value={status}
                      name="attendance"
                      checked={attendanceStatus === status}
                      onChange={() => setAttendanceStatus(status)}
                      className={`w-5 h-5 cursor-pointer ${
                        status === "present"
                          ? "text-green-600"
                          : status === "absent"
                          ? "text-red-600"
                          : "text-blue-600"
                      } bg-gray-200 border focus:ring`}
                    />
                    <label
                      htmlFor={`${status}-radio`}
                      className={`ms-2 text-xl cursor-pointer font-semibold ${
                        status === "present"
                          ? "text-green-600"
                          : status === "absent"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default HRAttendance;
