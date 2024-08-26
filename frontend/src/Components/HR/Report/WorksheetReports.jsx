// import { useState, useEffect } from "react";
// import api from "../../../config/api";


// const WorksheetReports = () => {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await api.get("/api/worksheet/reports");
//         setReports(response.data);
//       } catch (error) {
//         console.error("Error fetching worksheet reports:", error);
//       }
//     };

//     fetchReports();
//   }, []);

//   return (
//     <section className="md:ml-52 mt-16 bg-white ">
//       <div className="bg-violet-700 p-4 text-center text-white text-2xl font-bold border-b-2 border-gray-700 shadow-md">
//         View All Worksheets
//       </div>
//       <div className="p-4">
//         <div className="overflow-x-auto pb-10">
//           <table className="min-w-full text-center text-sm bg-gray-50 shadow-lg rounded-lg">
//             <thead className="border-b border-gray-300 font-medium bg-gray-200 sticky top-0">
//               <tr className="text-gray-900 border font-bold text-lg">
//                 <th className="px-2 py-3 border border-gray-300">Name</th>
//                 <th className="px-2 py-3 border border-gray-300">Project</th>
//                 <th className="px-2 py-3 border border-gray-300">Description</th>
//                 <th className="px-2 py-3 border border-gray-300">Remarks</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {reports.length > 0 ? (
//                 reports.map((report, index) => (
//                   <tr
//                     key={index}
//                     className="bg-white text-sm font-medium border border-gray-300 hover:bg-gray-100 transition duration-150"
//                   >
//                     <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
//                       {report.empName}
//                     </td>
//                     <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
//                       {report.projectName}
//                     </td>
//                     <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
//                       {report.work}
//                     </td>
//                     <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
//                       {report.workDone || "No remarks"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-6 text-gray-500">
//                     No data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WorksheetReports;

import { useState, useEffect } from "react";
import api from "../../../config/api";

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
      0
        if (selectedDate) {
          fetchReports();
        }
      }, [selectedDate]); // Re-fetch reports when the selected date changes

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);  // Update selected date when user picks a date
    }

    return (
        <section className="md:ml-52 mt-16 bg-white p-4">
            <div className="bg-violet-700 p-4 text-center text-white text-2xl font-bold border-b-2 border-gray-700 shadow-md">
                View All Worksheets
            </div>
            {/* Date picker for filtering reports */}
            <div className="p-4">
                <label className="block text-lg font-medium text-gray-900 mb-2">Select Date:</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="bg-blue-50 p-2 border border-gray-300 shadow-lg shadow-blue-400 rounded-md focus:border-blue-500 focus:outline-none mb-4"
                />
            </div>
            <div className="p-4">
                <div className="overflow-x-auto pb-10">
                    <table className="min-w-full text-center text-sm bg-gray-50 shadow-lg rounded-lg">
                        <thead className="border-b border-gray-300 font-medium bg-gray-200 top-0">
                            <tr className="text-gray-900 border font-bold text-lg">
                                <th className="px-2 py-3 bprder border-gray-300">Name</th>
                                <th className="px-2 py-3 bprder border-gray-300">Project</th>
                                <th className="px-2 py-3 bprder border-gray-300">Description</th>
                                <th className="px-2 py-3 bprder border-gray-300">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reports.length > 0 ? (
                                reports.map((report, index) => (
                                    <tr 
                                      key={index}
                                      className="bg-white text-sm font-medium border border-gray-300 hover:bg-gray-100 transition duration-150"
                                    >
                                        <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                                        {report.empName}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                                        {report.projectName}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                                        {report.work}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                                        {report.workDone || "No remarks"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">
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