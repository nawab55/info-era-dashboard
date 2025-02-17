import { useState, useEffect } from "react";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useWorkContext } from "../../context/WorkContext";
import { format } from "date-fns";
import { Pencil, Calendar, User, Briefcase } from "lucide-react";

function WorkList() {
  const [workList, setWorkList] = useState([]);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState({
    id: "",
    name: "",
    designation: ""
  });
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
            Authorization: `Bearer ${token}`
          }
        });
        setWorkList(response.data.worksheetData);
        if (response.data.worksheetData.length > 0) {
          setEmployeeInfo({
            id: response.data.worksheetData[0].empId,
            name: response.data.worksheetData[0].empName,
            designation: response.data.worksheetData[0].designation
          });
        }
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
    setSelectedWork(work);
    navigate("/employee/dailysheet");
  };

  const filteredWorkList = workList.filter((work) => {
    const entryDate = new Date(work.date);
    return (
      (startDate === "" || entryDate >= new Date(startDate)) &&
      (endDate === "" || entryDate <= new Date(endDate))
    );
  });

  return (
    <div className="flex-1 min-h-screen p-2 rounded-lg bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Employee Info Header */}
      <div className="mx-4 bg-white rounded-lg shadow-md md:mt-6 sm:mx-6 lg:mx-8">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-semibold">{employeeInfo.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{employeeInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-semibold">{employeeInfo.designation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Date Filter Section */}
        <div className="p-6 mb-8 bg-white shadow-md rounded-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange(e, "start")}
                className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange(e, "end")}
                className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Work List Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkList.map((work, index) => (
            <div
              key={index}
              className="overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {work.projectName}
                  </h3>
                  <button
                    onClick={() => handleEdit(work)}
                    className="p-2 text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Work:</span> {work.work}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Work Done:</span>{" "}
                    {work.workDone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {format(new Date(work.date), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkList;

// import { useState, useEffect } from "react";
// import api from "../../config/api";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import { useWorkContext } from "../../context/WorkContext";

// function WorkList() {
//   const [workList, setWorkList] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const { setSelectedWork } = useWorkContext();
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
//     setSelectedWork(work); // Set the selected work in the context
//     navigate("/employee/dailysheet"); // Redirect to the DailySheet component
//   };
//   const filteredWorkList = workList.filter((work) => {
//     const entryDate = new Date(work.date);
//     return (
//       (startDate === "" || entryDate >= new Date(startDate)) &&
//       (endDate === "" || entryDate <= new Date(endDate))
//     );
//   });

//   return (
//     <div className="flex-1 min-h-screen p-4 space-y-6 overflow-x-scroll bg-gradient-to-b from-blue-50 to-slate-100">
//       <header className="p-4 text-white bg-blue-700 rounded-md shadow-md">
//         <h1 className="text-xl font-semibold text-center md:text-2xl">
//           Work List
//         </h1>
//       </header>

//       <div className="p-4 space-y-4 bg-white rounded-md shadow-md md:space-y-0 md:flex md:justify-between md:items-center">
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
//             className="w-full p-2 border border-gray-300 rounded-md md:w-auto focus:ring focus:ring-blue-300 focus:outline-none"
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
//             className="w-full p-2 border border-gray-300 rounded-md md:w-auto focus:ring focus:ring-blue-300 focus:outline-none"
//           />
//         </div>
//       </div>

//       <div className="w-full overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 ">
//           <thead className="bg-blue-700">
//             <tr>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Employee ID
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Employee Name
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Designation
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Project Name
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Work
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Work Done
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Date
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredWorkList.map((work, index) => (
//               <tr
//                 key={index}
//                 className="transition-colors duration-150 hover:bg-blue-50"
//               >
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.empId}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.empName}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.designation}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.projectName}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.work}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.workDone}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.date}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   <button
//                     className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
//     <div className="flex-1 min-h-screen p-4 space-y-6 overflow-x-scroll bg-gradient-to-b from-blue-50 to-slate-100">
//       <header className="p-4 text-white bg-blue-700 rounded-md shadow-md">
//         <h1 className="text-xl font-semibold text-center md:text-2xl">
//           Work List
//         </h1>
//       </header>

//       <div className="p-4 space-y-4 bg-white rounded-md shadow-md md:space-y-0 md:flex md:justify-between md:items-center">
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
//             className="w-full p-2 border border-gray-300 rounded-md md:w-auto focus:ring focus:ring-blue-300 focus:outline-none"
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
//             className="w-full p-2 border border-gray-300 rounded-md md:w-auto focus:ring focus:ring-blue-300 focus:outline-none"
//           />
//         </div>
//       </div>

//       <div className="w-full overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 ">
//           <thead className="bg-blue-700">
//             <tr>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Employee ID
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Employee Name
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Designation
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Project Name
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Work
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Work Done
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Date
//               </th>
//               <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-white uppercase whitespace-nowrap">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredWorkList.map((work, index) => (
//               <tr
//                 key={index}
//                 className="transition-colors duration-150 hover:bg-blue-50"
//               >
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.empId}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.empName}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.designation}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.projectName}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.work}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.workDone}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   {work.date}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
//                   <button
//                     className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
