import { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { format, differenceInMilliseconds } from "date-fns"; // New package for formatting date and time
import { FaSignOutAlt } from "react-icons/fa"; // Exit icon

// Helper function to get current date and time in a specific format using date-fns
const getCurrentDateAndTime = () => {
  const now = new Date();
  const formattedDate = format(now, "EEEE, MM/dd/yyyy hh:mm:ss a"); // Format example: Monday, 08/12/2024 10:30:22 AM
  return formattedDate;
};

// Helper function to format date as dd/mm/yyyy using date-fns
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return format(date, "dd/MM/yyyy");
};

// Helper function to extract time part (HH:MM AM/PM) using date-fns
const formatTime = (dateTimeString) => {
  const time = new Date(dateTimeString);
  return format(time, "hh:mm a");
};

// Helper function to extract weekday from the date-time string using date-fns
const formatWeekday = (dateTimeString) => {
  const weekday = new Date(dateTimeString);
  return format(weekday, "EEEE");
};

const Attendance = () => {
  // State for attendance status (Present, Absent, etc.)
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false); // To show the checkout button
  const [checkInTime, setCheckInTime] = useState(null); // Store check-in time
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  ); // State for current time, updated every second
  const [attendanceId, setAttendanceId] = useState(""); // Store attendance record ID for checkout
  const userName = sessionStorage.getItem("username"); // Fetch the user's name from session storage
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if attendance is already is marked in sessionStorage
    const savedAttendanceId = sessionStorage.getItem("attendanceId");
    const savedCheckInTime = sessionStorage.getItem("checkInTime");
    if (savedAttendanceId && savedCheckInTime) {
      setIsAttendanceMarked(true);
      setAttendanceId(savedAttendanceId);
      setCheckInTime(savedCheckInTime);
    }
  }, []);

  // Handle form submission
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
    const timePart = formatTime(currentDateAndTime); // Format time
    const weekdayPart = formatWeekday(currentDateAndTime); // Extract weekday

    try {
      // Send a POST request to the backend to mark attendance
      const res = await api.post(
        "/api/employee/mark/attendance",
        {
          status: attendanceStatus, // Attendance status (Present, Absent, etc.)
          date: datePart, // Date
          time: timePart, // Time
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
      setCheckInTime(currentDateAndTime); // Store full check-in Date object

      // Save attendance state in sessionStorage
      sessionStorage.setItem("attendanceId", res.data.data._id);
      sessionStorage.setItem("checkInTime", currentDateAndTime);

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
    const hoursWorked = calculateTotalHours(new Date(checkInTime), logoutTime); // Pass check-in time and checkout time to the function
    try {
      await api.put(
        `/api/employee/attendance/${attendanceId}/checkout`,
        {
          logoutTime: formatTime(logoutTime), // Send formatted logout time to backend
          totalHours: hoursWorked,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Checked out successfully!");
      // Clear sessionStorage after checkout
      sessionStorage.removeItem("attendanceId");
      sessionStorage.removeItem("checkInTime");
      setIsAttendanceMarked(false); // Hide the checkout button after logout
    } catch (error) {
      toast.error("Error checking out.");
    }
  };

  // Function to calculate total worked hours
  const calculateTotalHours = (checkIn, logout) => {
    if (!checkIn || !logout) return "0 hours";

    const diffMs = differenceInMilliseconds(logout, checkIn); // Calculate the difference in milliseconds
    const hours = Math.floor(diffMs / (1000 * 60 * 60)); // Hours
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

    return `${hours} hours, ${minutes} minutes`;
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
            Your Name:{" "}
            <span className="text-base tracking-wide text-blue-900">
              {userName}
            </span>
          </h2>
          <h2 className="text-base text-start font-semibold p-2 px-3 rounded bg-sky-100 shadow-md">
            Time:{" "}
            <span className="font-medium tracking-wide text-blue-900 md:text-base xl:text-base sm:text-base">
              {currentTime}
            </span>
          </h2>
          <h2 className="text-base text-start font-semibold p-2 px-3 rounded bg-sky-100 shadow-md">
            Date:{" "}
            <span className="font-medium tracking-wide text-blue-900 md:text-base xl:text-base sm:text-base">
              {formatDate(getCurrentDateAndTime())}
            </span>
          </h2>
        </div>

        {isAttendanceMarked ? (
          <div className=" text-center mt-8">
            <h1 className="text-3xl text-green-700 font-bold">
              THANK YOU FOR TODAY!
            </h1>
            <div className="flex justify-center">
              <button
                className="mt-4  flex items-center justify-center text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 shadow-md"
                onClick={handleCheckout}
              >
                <FaSignOutAlt className="mr-2" /> Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center pt-6 bg-slate-100 rounded ">
            <div className="w-full  sm:w-full md:w-full lg:w-full xl:w-1/2 bg-orange-100 shadow-xl my-4 mx-2 rounded">
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
export default Attendance;

{/* part-2 */}
{ /* <div className="flex flex-wrap bg-slate-100 rounded ">
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
                  onChange={() => setAttendanceStatus("present")}  // onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="w-5 h-5 cursor-pointer text-green-600 bg-green-200  border-green-700 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 "
                  style={{accentColor: '#15803d'}}
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
                  style={{ accentColor: '#b91c1c' }} // Red color for Absent
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
                  style={{ accentColor: '#3b82f6' }}  // Blue color for HalfDay
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
                  style={{ accentColor: '#ea580c' }}  // Orange color for HalfDay
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
        </div> */
}
