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
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); // State for current time, updated every second
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
        const response = await api.post("/api/employee/attendance/today",
          { date: datePart },
          {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        const lastAttendance = response.data.data;    //Fetch last attendance date from db
        
        // Check if the last attendance date is today
        if (lastAttendance && isToday(lastAttendance.date)) {
          if(lastAttendance.logoutTime){
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
    <section className="bg-white p-2 mt-16 md:ml-52">
      {/* Content before the attendance form */}
      <div className="flex items-center justify-center border-b-2 bg-blue-100 rounded ">
        <h1 className="text-2xl font-bold py-2">Attendance</h1>
      </div>
      <div className=" bg-slate-100 flex flex-col justify-start pb-40 rounded pt-2">
        {/* name, date, time */}
        <div className="w-full flex justify-between px-2 shadow-2xl border border-slate-100 py-1 text-xl sm:text-md md:text-xl lg:text-xl xl:text-xl my-0">
          <h2 className="text-base text-start font-semibold p-2 px-3  rounded bg-sky-100 shadow-md">
            Your Name: <span className="text-base tracking-wide text-blue-900">{userName}</span>
          </h2>
          <h2 className="text-base text-start font-semibold p-2 px-3 rounded bg-sky-100 shadow-md">
            Time: <span className="font-medium tracking-wide text-blue-900 md:text-base xl:text-base sm:text-base">{currentTime}</span>
          </h2>
          <h2 className="text-base text-start font-semibold p-2 px-3 rounded bg-sky-100 shadow-md">
            Date: <span className="font-medium tracking-wide text-blue-900 md:text-base xl:text-base sm:text-base">
              {formatDate(getCurrentDateAndTime())}
            </span>
          </h2>
        </div>

        {isAttendanceMarked ? (
          <div className=" text-center pt-8 bg-inherit">
            <h1 className="text-3xl text-green-700 font-bold">
              THANK YOU FOR TODAY!
            </h1>
            <div className="flex justify-center">
              <button
                className="mt-4 flex items-center justify-center text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 shadow-md"
                onClick={handleCheckout}
              >
                <FaSignOutAlt className="mr-2" /> Checkout
              </button>
            </div>
            <div className=" text-center mt-8">
              <hr className="mx-8 mb-4 h-1 bg-green-900" />
              <h1 className="text-3xl text-yellow-600 font-bold">
                You were automatically checked out at 9:00 PM today.
              </h1>
            </div>
          </div>
        ) : 
          (
            <div className="flex flex-wrap justify-center pt-6 bg-slate-100 rounded ">
              <div className="w-full sm:w-full md:w-full lg:w-full xl:w-1/2 bg-orange-100 shadow-xl my-4 mx-2 rounded">
                <div className="flex justify-center text-center">
                  <h1 className="text-xl xl:text-2xl lg:text-2xl tracking-wide text-start font-medium uppercase text-custom-blue me-10 mt-4">
                    Make Attendance
                  </h1>
                </div>
                <div className="flex flex-wrap mx-2 text-center justify-center mt-4">
                  <div className="flex items-center me-10 my-2">
                    <input
                      id="present-radio"
                      type="radio"
                      value="present"
                      name="attendance"
                      checked={attendanceStatus === "present"}
                      onChange={() => setAttendanceStatus("present")} // onChange={(e) => setAttendanceStatus(e.target.value)}
                      className="w-5 h-5 cursor-pointer text-green-600 bg-green-200  border-green-700 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 "
                      style={{ accentColor: "#15803d" }}
                    />
                    <label
                      htmlFor="present-radio"
                      className="ms-2 text-xl cursor-pointer font-semibold text-green-600 "
                    >
                      Present
                    </label>
                  </div>
                  <div className="flex items-center me-10 my-2">
                    <input
                      id="absent-radio"
                      type="radio"
                      value="absent"
                      name="attendance"
                      checked={attendanceStatus === "absent"}
                      onChange={() => setAttendanceStatus("absent")}
                      className="w-5 h-5 cursor-pointer text-red-600 bg-red-200 border-red-700 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 "
                      style={{ accentColor: "#b91c1c" }} // Red color for Absent
                    />
                    <label
                      htmlFor="absent-radio"
                      className="ms-2 text-xl cursor-pointer font-semibold text-red-600 "
                    >
                      Absent
                    </label>
                  </div>
                  <div className="flex items-center me-10 my-2">
                    <input
                      id="halfday-radio"
                      type="radio"
                      value="halfday"
                      name="attendance"
                      checked={attendanceStatus === "halfday"}
                      onChange={() => setAttendanceStatus("halfday")}
                      className="w-5 h-5 cursor-pointer text-blue-400 bg-blue-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      style={{ accentColor: "#3b82f6" }} // Blue color for HalfDay
                    />
                    <label
                      htmlFor="halfday-radio"
                      className="ms-2 text-xl cursor-pointer font-semibold text-blue-600"
                    >
                      HalfDay
                    </label>
                  </div>

                  <div className="flex items-center me-10 my-2">
                    <input
                      id="holiday-radio"
                      type="radio"
                      value="holiday"
                      name="attendance"
                      checked={attendanceStatus === "holiday"}
                      onChange={() => setAttendanceStatus("holiday")}
                      className="w-5 h-5 cursor-pointer text-orange-400 bg-orange-200 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                      style={{ accentColor: "#ea580c" }} // Orange color for HalfDay
                    />
                    <label
                      htmlFor="holiday-radio"
                      className="ms-2 text-xl cursor-pointer font-semibold text-orange-600"
                    >
                      Holiday
                    </label>
                  </div>
                </div>

                <div className="text-center my-8 mx-4 flex justify-center">
                  <button
                    className="text-white cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-10 duration-300 bg-custom-blue hover:bg-custom-hover-blue focus:ring-2 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-semibold rounded text-base px-3 py-1 text-center me-2 mb-2"
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