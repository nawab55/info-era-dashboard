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
    <section className="flex-1 min-h-screen p-2 bg-white">
      {/* Content before the attendance form */}
      <div className="flex items-center justify-center bg-blue-100 border-b-2 rounded ">
        <h1 className="py-2 text-2xl font-bold">Attendance</h1>
      </div>
      <div className="flex flex-col justify-start pt-2 pb-40 rounded  bg-slate-100">
        {/* name, date, time */}
        <div className="flex justify-between w-full px-2 py-1 my-0 text-xl border shadow-2xl border-slate-100 sm:text-md md:text-xl lg:text-xl xl:text-xl">
          <h2 className="p-2 px-3 text-base font-semibold rounded shadow-md text-start bg-sky-100">
            Your Name:{" "}
            <span className="text-base tracking-wide text-blue-900">
              {userName}
            </span>
          </h2>
          <h2 className="p-2 px-3 text-base font-semibold rounded shadow-md text-start bg-sky-100">
            Time:{" "}
            <span className="font-medium tracking-wide text-blue-900 md:text-base xl:text-base sm:text-base">
              {currentTime}
            </span>
          </h2>
          <h2 className="p-2 px-3 text-base font-semibold rounded shadow-md text-start bg-sky-100">
            Date:{" "}
            <span className="font-medium tracking-wide text-blue-900 md:text-base xl:text-base sm:text-base">
              {formatDate(getCurrentDateAndTime())}
            </span>
          </h2>
        </div>

        {isAttendanceMarked ? (
          <div className="pt-8 text-center  bg-inherit">
            <h1 className="text-3xl font-bold text-green-700">
              THANK YOU FOR TODAY!
            </h1>
            <div className="flex justify-center">
              <button
                className="flex items-center justify-center px-4 py-2 mt-4 text-white bg-blue-600 rounded shadow-md hover:bg-blue-700"
                onClick={handleCheckout}
              >
                <FaSignOutAlt className="mr-2" /> Checkout
              </button>
            </div>
            <div className="mt-8 text-center ">
              <hr className="h-1 mx-8 mb-4 bg-green-900" />
              <h1 className="text-3xl font-bold text-yellow-600">
                You were automatically checked out at 9:00 PM today.
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center pt-6 rounded bg-slate-100 ">
            <div className="w-full mx-2 my-4 bg-orange-100 rounded shadow-xl sm:w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex justify-center text-center">
                <h1 className="mt-4 text-xl font-medium tracking-wide uppercase xl:text-2xl lg:text-2xl text-start text-custom-blue me-10">
                  Make Attendance
                </h1>
              </div>
              <div className="flex flex-wrap justify-center mx-2 mt-4 text-center">
                <div className="flex items-center my-2 me-10">
                  <input
                    id="present-radio"
                    type="radio"
                    value="present"
                    name="attendance"
                    checked={attendanceStatus === "present"}
                    onChange={() => setAttendanceStatus("present")} // onChange={(e) => setAttendanceStatus(e.target.value)}
                    className="w-5 h-5 text-green-600 bg-green-200 border-green-700 cursor-pointer focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 "
                    style={{ accentColor: "#15803d" }}
                  />
                  <label
                    htmlFor="present-radio"
                    className="text-xl font-semibold text-green-600 cursor-pointer ms-2 "
                  >
                    Present
                  </label>
                </div>
                <div className="flex items-center my-2 me-10">
                  <input
                    id="absent-radio"
                    type="radio"
                    value="absent"
                    name="attendance"
                    checked={attendanceStatus === "absent"}
                    onChange={() => setAttendanceStatus("absent")}
                    className="w-5 h-5 text-red-600 bg-red-200 border-red-700 cursor-pointer focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 "
                    style={{ accentColor: "#b91c1c" }} // Red color for Absent
                  />
                  <label
                    htmlFor="absent-radio"
                    className="text-xl font-semibold text-red-600 cursor-pointer ms-2 "
                  >
                    Absent
                  </label>
                </div>
                <div className="flex items-center my-2 me-10">
                  <input
                    id="halfday-radio"
                    type="radio"
                    value="halfday"
                    name="attendance"
                    checked={attendanceStatus === "halfday"}
                    onChange={() => setAttendanceStatus("halfday")}
                    className="w-5 h-5 text-blue-400 bg-blue-200 cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    style={{ accentColor: "#3b82f6" }} // Blue color for HalfDay
                  />
                  <label
                    htmlFor="halfday-radio"
                    className="text-xl font-semibold text-blue-600 cursor-pointer ms-2"
                  >
                    HalfDay
                  </label>
                </div>

                {/* <div className="flex items-center my-2 me-10">
                    <input
                      id="holiday-radio"
                      type="radio"
                      value="holiday"
                      name="attendance"
                      checked={attendanceStatus === "holiday"}
                      onChange={() => setAttendanceStatus("holiday")}
                      className="w-5 h-5 text-orange-400 bg-orange-200 cursor-pointer focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                      style={{ accentColor: "#ea580c" }} // Orange color for HalfDay
                    />
                    <label
                      htmlFor="holiday-radio"
                      className="text-xl font-semibold text-orange-600 cursor-pointer ms-2"
                    >
                      Holiday
                    </label>
                  </div> */}
              </div>

              <div className="flex justify-center mx-4 my-8 text-center">
                <button
                  className="px-3 py-1 mb-2 text-base font-semibold text-center text-white transition duration-300 ease-in-out delay-150 rounded cursor-pointer hover:-translate-y-1 hover:scale-10 bg-custom-blue hover:bg-custom-hover-blue focus:ring-2 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 me-2"
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
