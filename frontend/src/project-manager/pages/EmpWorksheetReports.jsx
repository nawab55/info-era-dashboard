import { useState, useEffect } from "react";
import { Calendar, Search, FileSpreadsheet } from "lucide-react";
import api from "../../config/api";

const EmpWorksheetReports = () => {
  const [reports, setReports] = useState([]);
  const [fromDate, setFromDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/worksheet/reports", {
          params: {
            fromDate,
            toDate,
            searchQuery,
            searchType: "empName" // We're now fixed to search by employee name
          }
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching worksheet reports:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchReports();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fromDate, toDate, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <FileSpreadsheet className="w-8 h-8 text-blue-600" />
            Worksheet Reports
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage employee worksheets across different time periods
          </p>
        </div>

        {/* Filters Section */}
        <div className="p-6 mb-8 bg-white shadow-sm rounded-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by employee name..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Date Range Inputs */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden bg-white shadow-sm rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Project
                  </th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : reports.length > 0 ? (
                  reports.map((report, index) => (
                    <tr
                      key={index}
                      className="transition-colors duration-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                              <span className="font-medium text-blue-600">
                                {report.empName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {report.empName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {report.designation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {report.projectName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {report.work}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {report.workDone || "No remarks"}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No worksheets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpWorksheetReports;

// import { useState, useEffect } from "react";
// import api from "../../config/api";

// const EmpWorksheetReports = () => {
//   const [reports, setReports] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date().toISOString().split("T")[0];
//     return today;
//   });
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchType, setSearchType] = useState("empName"); // Default search by empName

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await api.get("/api/worksheet/reports", {
//           params: {
//             date: selectedDate,
//             fromDate,
//             toDate,
//             searchQuery,
//             searchType
//           }
//         });
//         setReports(response.data);
//       } catch (error) {
//         console.error("Error fetching worksheet reports:", error);
//       }
//     };

//     if (selectedDate) {
//       fetchReports();
//     }
//   }, [selectedDate, fromDate, toDate, searchQuery, searchType]);

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };
//   const handleFromDateChange = (e) => {
//     setFromDate(e.target.value);
//   };
//   const handleToDateChange = (e) => {
//     setToDate(e.target.value);
//   };
//   const handleSearchQueryChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
//   const handleSearchTypeChange = (e) => {
//     setSearchType(e.target.value);
//   };

//   return (
//     <section className="flex-1 min-h-screen p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-indigo-100">
//       <div className="p-5 text-2xl font-semibold text-center text-white bg-blue-600 rounded-lg shadow-md">
//         View All Worksheets
//       </div>

//       {/* Date Picker */}
//       <div className="flex flex-col items-center mt-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
//         <div className="flex flex-col items-center">
//           <label className="mb-2 text-lg font-medium text-gray-800">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="p-2 text-lg bg-white border border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
//           />
//         </div>

//         <div className="flex flex-col items-center">
//           <label className="mb-2 text-lg font-medium text-gray-800">
//             From Date:
//           </label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={handleFromDateChange}
//             className="p-2 text-lg bg-white border border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
//           />
//         </div>

//         <div className="flex flex-col items-center">
//           <label className="mb-2 text-lg font-medium text-gray-800">
//             To Date:
//           </label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={handleToDateChange}
//             className="p-2 text-lg bg-white border border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
//           />
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="flex flex-col items-center mt-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
//         <div className="flex flex-col items-center">
//           <label className="mb-2 text-lg font-medium text-gray-800">
//             Search By:
//           </label>
//           <select
//             value={searchType}
//             onChange={handleSearchTypeChange}
//             className="p-2 text-lg bg-white border border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
//           >
//             <option value="empName">Employee Name</option>
//             <option value="empId">Employee ID</option>
//             <option value="projectName">Project Name</option>
//           </select>
//         </div>

//         <div className="flex flex-col items-center">
//           <label className="mb-2 text-lg font-medium text-gray-800">
//             Search Query:
//           </label>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchQueryChange}
//             placeholder="Enter search term"
//             className="p-2 text-lg bg-white border border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
//           />
//         </div>
//       </div>

//       {/* Search Button */}
//       <div className="flex justify-center mt-6">
//         <button
//           onClick={() => setReports([])} // Clear the reports to trigger the fetch
//           className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           Search
//         </button>
//       </div>

//       {/* Table Container */}
//       <div className="mt-6 overflow-x-auto">
//         <table className="w-full text-sm text-center bg-white border border-blue-300 rounded-lg shadow-md">
//           <thead className="text-white bg-blue-600 text-md">
//             <tr>
//               <th className="px-4 py-3 border border-blue-400">Name</th>
//               <th className="px-4 py-3 border border-blue-400">Project</th>
//               <th className="px-4 py-3 border border-blue-400">Description</th>
//               <th className="px-4 py-3 border border-blue-400">Remarks</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-900">
//             {reports.length > 0 ? (
//               reports.map((report, index) => (
//                 <tr
//                   key={index}
//                   className="border border-blue-300 hover:bg-blue-50"
//                 >
//                   <td className="px-4 py-2 border border-blue-300 text-nowrap">
//                     {report.empName}
//                   </td>
//                   <td className="px-4 py-2 overflow-x-auto text-justify border border-blue-300 text-nowrap">
//                     {report.projectName}
//                   </td>
//                   <td className="px-4 py-2 text-justify border border-blue-300">
//                     {report.work}
//                   </td>
//                   <td className="px-4 py-2 text-justify border border-blue-300">
//                     {report.workDone || "No remarks"}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="py-6 text-gray-500">
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default EmpWorksheetReports;

// <section className="flex-1 min-h-screen p-4 rounded bg-blue-50">
//   <div className="p-5 text-2xl font-semibold text-center text-white bg-blue-600 rounded-lg shadow-md">
//     View All Worksheets
//   </div>
//   {/* Date Picker */}
//   <div className="flex flex-col items-center mt-6">
//     <label className="mb-2 text-lg font-medium text-gray-800">
//       Select Date:
//     </label>
//     <input
//       type="date"
//       value={selectedDate}
//       onChange={handleDateChange}
//       className="p-2 text-lg bg-white border border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
//     />
//   </div>
//   {/* Table Container */}
//   <div className="mt-6 overflow-x-auto ">
//     <table className="w-full text-sm text-center bg-white border border-blue-300 rounded-lg">
//       <thead className="text-white bg-blue-600 text-md">
//         <tr>
//           <th className="px-4 py-3 border border-blue-400">Name</th>
//           <th className="px-4 py-3 border border-blue-400">Project</th>
//           <th className="px-4 py-3 border border-blue-400">Description</th>
//           <th className="px-4 py-3 border border-blue-400">Remarks</th>
//         </tr>
//       </thead>
//       <tbody className="text-gray-900">
//         {reports.length > 0 ? (
//           reports.map((report, index) => (
//             <tr
//               key={index}
//               className="border border-blue-300 hover:bg-blue-50"
//             >
//               <td className="px-4 py-2 border border-blue-300 text-nowrap">
//                 {report.empName}
//               </td>
//               <td className="px-4 py-2 overflow-x-auto text-justify border border-blue-300 text-nowrap">
//                 {report.projectName}
//               </td>
//               <td className="px-4 py-2 text-justify border border-blue-300">
//                 {report.work}
//               </td>
//               <td className="px-4 py-2 text-justify border border-blue-300">
//                 {report.workDone || "No remarks"}
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="4" className="py-6 text-gray-500">
//               No data available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </section>
