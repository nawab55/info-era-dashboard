import { useState, useEffect } from "react";
import api from "../../config/api";

const WorksheetReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/api/worksheet/reports", {
          params: { date: selectedDate }, // Pass the selected date as a query parameter
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching worksheet reports:", error);
      }
    };
    0;
    if (selectedDate) {
      fetchReports();
    }
  }, [selectedDate]); // Re-fetch reports when the selected date changes

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Update selected date when user picks a date
  };

  return (
    <section className="flex-1 min-h-screen p-4 bg-white">
      <div className="p-4 text-2xl font-bold text-center text-white border-b-2 border-gray-700 shadow-md bg-violet-700">
        View All Worksheets
      </div>
      {/* Date picker for filtering reports */}
      <div className="p-4">
        <label className="block mb-2 text-lg font-medium text-gray-900">
          Select Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 mb-4 border border-gray-300 rounded-md shadow-lg bg-blue-50 shadow-blue-400 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="p-4">
        <div className="pb-10 overflow-x-auto">
          <table className="min-w-full text-sm text-center rounded-lg shadow-lg bg-gray-50">
            <thead className="top-0 font-medium bg-gray-200 border-b border-gray-300">
              <tr className="text-lg font-bold text-gray-900 border">
                <th className="px-2 py-3 border-gray-300 bprder">Name</th>
                <th className="px-2 py-3 border-gray-300 bprder">Project</th>
                <th className="px-2 py-3 border-gray-300 bprder">
                  Description
                </th>
                <th className="px-2 py-3 border-gray-300 bprder">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr
                    key={index}
                    className="text-sm font-medium transition duration-150 bg-white border border-gray-300 hover:bg-gray-100"
                  >
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {report.empName}
                    </td>
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {report.projectName}
                    </td>
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {report.work}
                    </td>
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {report.workDone || "No remarks"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
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
