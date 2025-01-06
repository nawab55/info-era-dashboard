import { useState, useEffect } from "react";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useWorkContext } from "../../context/WorkContext";

function WorkList() {
  const [workList, setWorkList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { setSelectedWork } = useWorkContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkList = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const decoded = jwtDecode(token);
        const empId = decoded.user.EmpId;
        const response = await api.get(`/api/worksheet/allData/${empId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data);
        setWorkList(response.data.worksheetData);
      } catch (error) {
        console.error("Error fetching work list:", error);
      }
    };

    fetchWorkList();
  }, []);

  const handleDateChange = (event, type) => {
    if (type === "start") {
      setStartDate(event.target.value);
    } else if (type === "end") {
      setEndDate(event.target.value);
    }
  };

  const handleEdit = (work) => {
    setSelectedWork(work); // Set the selected work in the context
    navigate("/employee/dailysheet"); // Redirect to the DailySheet component
  };
  const filteredWorkList = workList.filter((work) => {
    const entryDate = new Date(work.date);
    return (
      (startDate === "" || entryDate >= new Date(startDate)) &&
      (endDate === "" || entryDate <= new Date(endDate))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b flex-1 overflow-x-scroll from-blue-50 to-slate-100 p-4 space-y-6">
      <header className="bg-blue-700 text-white p-4 rounded-md shadow-md">
        <h1 className="text-xl md:text-2xl font-semibold text-center">
          Work List
        </h1>
      </header>

      <div className="bg-white  p-4 rounded-md shadow-md space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
        <div className="space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
          <label
            htmlFor="startDate"
            className="font-semibold text-gray-700 whitespace-nowrap"
          >
            Start Date:
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, "start")}
            className="w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
          <label
            htmlFor="endDate"
            className="font-semibold text-gray-700 whitespace-nowrap"
          >
            End Date:
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, "end")}
            className="w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className=" divide-y divide-gray-200 min-w-full">
          <thead className="bg-blue-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Employee ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Employee Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Designation
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Project Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Work
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Work Done
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredWorkList.map((work, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {work.empId}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {work.empName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {work.designation}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {work.projectName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {work.work}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {work.workDone}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {work.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => handleEdit(work)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkList;


// import { useState, useEffect } from "react";
// import api from "../../config/api";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// function WorkList() {
//   const [workList, setWorkList] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWorkList = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const decoded = jwtDecode(token);
//         const empId = decoded.user.EmpId;
//         const response = await api.get(`/api/worksheet/allData/${empId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // console.log(response.data);
//         setWorkList(response.data.worksheetData);
//       } catch (error) {
//         console.error("Error fetching work list:", error);
//       }
//     };

//     fetchWorkList();
//   }, []);

//   const handleDateChange = (event, type) => {
//     if (type === "start") {
//       setStartDate(event.target.value);
//     } else if (type === "end") {
//       setEndDate(event.target.value);
//     }
//   };

//   const handleEdit = (work) => {
//     navigate("/employee/dailysheet",  { state: { work } }); // Redirect to the DailySheet component
//   };

//   const filteredWorkList = workList.filter((work) => {
//     const entryDate = new Date(work.date);
//     return (
//       (startDate === "" || entryDate >= new Date(startDate)) &&
//       (endDate === "" || entryDate <= new Date(endDate))
//     );
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-b flex-1 overflow-x-scroll from-blue-50 to-slate-100 p-4 space-y-6">
//       <header className="bg-blue-700 text-white p-4 rounded-md shadow-md">
//         <h1 className="text-xl md:text-2xl font-semibold text-center">
//           Work List
//         </h1>
//       </header>

//       <div className="bg-white  p-4 rounded-md shadow-md space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
//         <div className="space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
//           <label
//             htmlFor="startDate"
//             className="font-semibold text-gray-700 whitespace-nowrap"
//           >
//             Start Date:
//           </label>
//           <input
//             id="startDate"
//             type="date"
//             value={startDate}
//             onChange={(e) => handleDateChange(e, "start")}
//             className="w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
//           />
//         </div>
//         <div className="space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
//           <label
//             htmlFor="endDate"
//             className="font-semibold text-gray-700 whitespace-nowrap"
//           >
//             End Date:
//           </label>
//           <input
//             id="endDate"
//             type="date"
//             value={endDate}
//             onChange={(e) => handleDateChange(e, "end")}
//             className="w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto w-full">
//         <table className=" divide-y divide-gray-200 min-w-full">
//           <thead className="bg-blue-700">
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Employee ID
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Employee Name
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Designation
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Project Name
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Work
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Work Done
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Date
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredWorkList.map((work, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-blue-50 transition-colors duration-150"
//               >
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {work.empId}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {work.empName}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {work.designation}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {work.projectName}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {work.work}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {work.workDone}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {work.date}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
//                   <button
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     onClick={() => handleEdit(work)}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default WorkList;