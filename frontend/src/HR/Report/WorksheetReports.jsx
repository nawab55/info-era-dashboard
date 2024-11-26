import { useState, useEffect } from "react";
import api from "../../config/api";
import { CiCalendar } from "react-icons/ci";

const WorksheetReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/api/worksheet/reports", {
          params: { date: selectedDate },
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching worksheet reports:", error);
      }
    };

    if (selectedDate) {
      fetchReports();
    }
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="flex-1 overflow-x-scroll bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      {/* Top Section */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-gradient-to-r from-blue-700 to-indigo-600 px-5 py-3 shadow-lg rounded-tl rounded-tr">
        <h1 className="text-lg md:text-2xl font-bold text-white tracking-wide w-full md:w-auto text-center md:text-left">
          Worksheet Reports
        </h1>
        <div className="flex items-center bg-white text-blue-700 px-3 py-2 rounded shadow-lg cursor-pointer hover:text-indigo-600 transition duration-300 w-full md:w-auto justify-center md:justify-start">
          <CiCalendar className="mr-3 text-xl" />
          <span className="font-medium text-sm md:text-base">{todayDate}</span>
        </div>
      </div>

      {/* Date Picker */}
      <div className="border px-4 py-4 my-6 bg-white rounded">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 pb-2">
          Select Date
        </h2>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="block bg-blue-50 px-4 py-2 border border-gray-300 shadow rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-1/3"
        />
      </div>

      {/* Reports List */}
      <div className="border px-4 py-4  bg-white rounded">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 pb-2">
          Reports List
        </h2>
        <div className="overflow-x-auto">
          <table className="lg:min-w-full min-w-[100%] max-w-fit overflow-x-auto bg-gradient-to-br from-gray-50 to-white border-collapse">
            <thead className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left whitespace-nowrap">Name</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Project</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                    } hover:bg-indigo-100 transition duration-200`}
                  >
                    <td className="border px-2 md:px-4 py-2 text-nowrap">{report.empName}</td>
                    <td className="border px-2 md:px-4 py-2">{report.projectName}</td>
                    <td className="border px-2 md:px-4 py-2">{report.work}</td>
                    <td className="border px-2 md:px-4 py-2 text-nowrap">
                      {report.workDone || "No remarks"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default WorksheetReports;
