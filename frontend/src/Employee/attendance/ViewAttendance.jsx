import { useState, useEffect, useCallback } from "react";
import api from "../../config/api";
import toast, { Toaster } from "react-hot-toast";
import { SlCalender } from "react-icons/sl";

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    halfday: 0,
    holiday: 0,
  });
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default: current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default: current year

  const userId = sessionStorage.getItem("userId"); // Replace with the actual logged-in user's ID

  // Fetch attendance data for the selected month and year
  const fetchAttendance = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/employee/attendance/${userId}?month=${month}&year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
      );
      const records = response.data;
      setAttendanceRecords(records);
    //   console.log(records);
      calculateSummary(records);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance records.");
    }
  }, [userId, month, year]);

  // Calculate summary: Count of present, absent, halfday, holiday statuses
  const calculateSummary = (records) => {
    const summary = records.reduce(
      (acc, record) => {
        acc[record.status] += 1;
        return acc;
      },
      { present: 0, absent: 0, halfday: 0, holiday: 0 }
    );
    setSummary(summary);
  };

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return (
    <section className="bg-gray-50 min-h-screen p-4 mt-16 md:ml-56">
      <Toaster />
      {/* Top Section */}
      <div className="flex justify-between items-center bg-blue-100 p-4 shadow-lg rounded-lg">
        <div className="flex items-center">
          <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        </div>
        <div className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
          <SlCalender className="mr-2 w-6 h-6" />
          Attendance
        </div>
      </div>

      {/* Filters: Month and Year */}
      <div className="flex justify-between items-center gap-4 my-6">
        {/* Month Dropdown */}
        <select
          value={month}        // Bind the selected month to state
          onChange={(e) => setMonth(e.target.value)}     // Update the month state when selection changes
          className="border px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          {Array.from({ length: 12 }, (_, i) => (     // Generate options for 12 months
            <option key={i + 1} value={i + 1} >
              {new Date(0, i).toLocaleString("en", { month: "long" })}    
            </option>
          ))}
        </select>
          {/* Year Input Field */}
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)} 
          min="2000"    // Set min and max limits for the year input
          max="2100"
          className="border px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-text"
        />
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {["Present", "Absent", "Halfday", "Holiday"].map((status, idx) => (
          <div key={idx} className="bg-blue-50 sm:p-0 md:p-4 rounded-lg shadow-md text-center transition-all duration-300 transform hover:scale-105 hover:cursor-pointer">
            <h3 className="sm:text-sm sm:font-semibold md:text-xl md:font-bold text-gray-700 ">{status}</h3>
            <p className="text-2xl font-semibold text-purple-600">
              {summary[status.toLowerCase()]}
            </p>
          </div>
        ))}
      </div>

      {/* Attendance Records Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left bg-white rounded-lg shadow-lg">
          <thead className="rounded-lg">
            <tr className="bg-purple-600 text-white">
              <th className="p-4">Date</th>
              <th className="p-4">Check-In Time</th>
              <th className="p-4">Logout Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{record.date}</td>
                <td className="p-4">{new Date(record.checkInTime).toLocaleTimeString()}</td>
                <td className="p-4">
                  {record.logoutTime
                    ? new Date(record.logoutTime).toLocaleTimeString()
                    : "N/A"}
                </td>
                <td className="p-4 capitalize">{record.status}</td>
                <td className="p-4">{record.totalHours || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ViewAttendance;




// import { SlCalender } from "react-icons/sl";
// const ViewAttendance = () => {

//   return (
//     <section className="bg-white p-4 mt-16 md:ml-56">
//       {/* Top Card Section */}
//       <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
//         <div className="flex items-center my-auto">
//           <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
//           <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
//         </div>
//         <div className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
//           <SlCalender className="mr-2 w-6 h-6" />
//           Attendance
//         </div>
//       </div>


//     </section>
//   );
// }
// export default ViewAttendance;







// import { useEffect, useState } from "react";
// import Calendar from "react-calendar"; // Import react-calendar
// import api from "../../config/api";
// import { SlCalender } from "react-icons/sl";
// import "react-calendar/dist/Calendar.css"; // Calendar styles
// import { toast } from "react-toastify";
// import "./ViewAttendance.css";

// const ViewAttendance = () => {
//   const [date, setDate] = useState(new Date()); // Current selected date (month/year)
//     // const [attendanceData, setAttendanceData] = useState([]); // Holds attendance records
//   const [summary, setSummary] = useState({ present: 0, absent: 0, halfday: 0 }); // Summary of attendance
//   const [markedDates, setMarkedDates] = useState({}); // Store color-coded attendance

//   const userId = sessionStorage.getItem("userId"); // Assuming userId is stored in session

//   // Fetch attendance data based on the selected month/year
//   const fetchAttendanceData = async (selectedDate) => {
//     const year = selectedDate.getFullYear();
//     const month = selectedDate.getMonth() + 1; // Months are 0-indexed in JS
//     try {
//       const response = await api.get(
//         `/api/employee/attendance/${userId}?year=${year}&month=${month}`,
//         {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//         }
//       );
//       const attendance = response.data;
//       console.log(attendance);
//       processAttendanceData(attendance);
//     } catch (error) {
//       toast.error("Error fetching attendance data");
//       console.error(error);
//     }
//   };

//   // Process the attendance data to count statuses and mark dates
//   const processAttendanceData = (data) => {
//     const summary = { present: 0, absent: 0, halfday: 0 };
//     const marked = {};

//     data.forEach((record) => {
//       if (record.status === "present") {
//         summary.present += 1;
//         marked[record.date] = "green"; // Color for present
//       } else if (record.status === "absent") {
//         summary.absent += 1;
//         marked[record.date] = "red"; // Color for absent
//       } else if (record.status === "halfday") {
//         summary.halfday += 1;
//         marked[record.date] = "blue"; // Color for halfday
//       }
//     });

//     setSummary(summary);
//     setMarkedDates(marked);
//   };

//   // Handle month/year change
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     fetchAttendanceData(newDate); // Fetch new data on month/year change
//   };

//   // Initial load (current month/year)
//   useEffect(() => {
//     fetchAttendanceData(date);
//   }, [date]);

//   // Function to tile content based on attendance status
// //   const tileContent = ({ date }) => {
// //     const formattedDate = date.toISOString().split("T")[0]; // Format as yyyy-mm-dd
// //     const statusColor = markedDates[formattedDate]; // Check if the date has a marked status
// //     return statusColor ? (
// //       <div className={`h-2 w-2 rounded-full ${statusColor}`}></div>
// //     ) : null;
// //   };

// // Function to apply styles to calendar tiles based on attendance status
// const tileClassName = ({ date }) => {
//     const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
//     if (markedDates[formattedDate] === "present") {
//       return "bg-green-200 text-green-800 font-bold";
//     } else if (markedDates[formattedDate] === "absent") {
//       return "bg-red-200 text-red-800 font-bold";
//     } else if (markedDates[formattedDate] === "halfday") {
//       return "bg-blue-200 text-blue-800 font-bold";
//     }
//     return ""; // Default style for unmarked dates
//   };

//   return (
//     <section className="bg-white p-4 mt-16 md:ml-56">
//       {/* Top Card Section */}
//       <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
//         <div className="flex items-center my-auto">
//           <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
//           <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
//         </div>
//         <div className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
//           <SlCalender className="mr-2 w-6 h-6" />
//           Attendance
//         </div>
//       </div>

//       {/* Summary Section */}
//       <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-2">Summary</h2>
//         <div className="flex justify-between">
//           <div className="flex flex-col items-center">
//             <span className="text-2xl font-bold text-green-600">
//               {summary.present}
//             </span>
//             <span className="text-sm text-gray-700">Present Days</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-2xl font-bold text-red-600">
//               {summary.absent}
//             </span>
//             <span className="text-sm text-gray-700">Absent Days</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-2xl font-bold text-blue-600">
//               {summary.halfday}
//             </span>
//             <span className="text-sm text-gray-700">Half Days</span>
//           </div>
//         </div>
//       </div>

//       {/* Calendar Navigation */}
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           onClick={() =>
//             handleDateChange(new Date(date.setFullYear(date.getFullYear() - 1)))
//           }
//         >
//           Previous Year
//         </button>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           onClick={() =>
//             handleDateChange(new Date(date.setMonth(date.getMonth() - 1)))
//           }
//         >
//           Previous Month
//         </button>
//         <h2 className="text-xl font-bold">
//           {date.toLocaleString("default", { month: "long" })}{" "}
//           {date.getFullYear()}
//         </h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           onClick={() =>
//             handleDateChange(new Date(date.setMonth(date.getMonth() + 1)))
//           }
//         >
//           Next Month
//         </button>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           onClick={() =>
//             handleDateChange(new Date(date.setFullYear(date.getFullYear() + 1)))
//           }
//         >
//           Next Year
//         </button>
//       </div>

//       {/* Calendar Section */}
//       <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md w-full">
//         <Calendar
//           value={date}
//           onChange={handleDateChange}
//           tileClassName={tileClassName} // Add custom class based on attendance status
//           className="w-full" // Make the calendar full width
//         />
//       </div>
//     </section>
//   );
// };

// export default ViewAttendance;
