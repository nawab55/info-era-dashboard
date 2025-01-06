import { useState, useEffect } from "react";
import { useWorkContext } from "../../context/WorkContext";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const DailySheet = () => {
  const { selectedWork } = useWorkContext();
  const [formData, setFormData] = useState({
    date: "",
    projectName: "",
    work: "",
    workDone: "",
  });
  const [isWorksheetExists, setIsWorksheetExists] = useState(false);
  const [isCurrentDate, setIsCurrentDate] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    const empId = decoded.user.EmpId;
      // If selectedWork exists, use it to set the form data
      if (selectedWork) {
        setFormData({
          date: selectedWork.date,
          projectName: selectedWork.projectName,
          work: selectedWork.work,
          workDone: selectedWork.workDone || "",
        });

        setIsWorksheetExists(true); // Assume worksheet exists as data is coming from state
        setIsCurrentDate(selectedWork.date === new Date().toISOString().split("T")[0]);
      } else {
        // If no state is passed, fetch data from backend for the current date
        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0]; // Convert to string "YYYY-MM-DD"
  
        setFormData((prevFormData) => ({
          ...prevFormData,
          date: formattedDate,
        }));
  
        fetchWorksheet(empId, formattedDate);
        setIsCurrentDate(true); // Initially set for today's date
      }  
    }, [selectedWork]);  // Run only when selectedWork changes
    console.log(isCurrentDate);

  const fetchWorksheet = async (empId, date) => {
    try {
      const response = await api.get(`/api/worksheet/view/${empId}`, {
        params: { date },
      });
      if (response.data) {
        setFormData({
          date: response.data[0].date,
          projectName: response.data[0].projectName,
          work: response.data[0].work,
        });
        setIsWorksheetExists(true);
      } else {
        setIsWorksheetExists(false);
      }
    } catch (error) {
      console.log("Error fetching worksheet:", error);
      setIsWorksheetExists(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Current date in "YYYY-MM-DD" format
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: selectedDate,
    }));
    setIsCurrentDate(selectedDate === today); // Check if the selected date is today

    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    const empId = decoded.user.EmpId;

    fetchWorksheet(empId, selectedDate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(token);
      const empId = decoded.user.EmpId;

      // Submit form data via PUT request
      const response = await api.put(
        `/api/worksheet/update/${empId}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Worksheet updated successfully.");
      } else {
        toast.error("Error updating worksheet.");
      }
    } catch (error) {
      console.error("Error submitting worksheet:", error);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 min-h-screen to-slate-100 h-full flex-1">
      <form
        className="p-6 rounded-lg bg-white border m-4 space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="text-center text-3xl font-bold text-blue-700">
          Worksheet
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300  rounded outline-none shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className={`mt-2 block w-full px-4 py-2 text-sm outline-none border rounded shadow-sm ${
                isWorksheetExists
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-gray-300  focus:ring-1 focus:ring-blue-500"
              }`}
              readOnly={isWorksheetExists}
            />
          </div>

          {/* Work Assign */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Assign
            </label>
            <input
              type="text"
              name="work"
              value={formData.work}
              onChange={handleInputChange}
              className={`mt-2 block w-full px-4 py-2 text-sm border outline-none rounded shadow-sm ${
                isWorksheetExists
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-gray-300  focus:ring-1 focus:ring-blue-500"
              }`}
              readOnly={isWorksheetExists}
            />
          </div>

          {/* Work Done */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Work Done
            </label>
            <textarea
              name="workDone"
              value={formData.workDone}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 text-sm border rounded border-gray-300  outline-none  focus:ring-1 focus:ring-blue-500"
              rows="4"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-700 text-white font-semibold rounded  hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        {/* {isCurrentDate && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-700 text-white font-semibold rounded  hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        )} */}
      </form>
    </section>
  );
};

export default DailySheet;


// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import api from "../../config/api";
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-toastify";

// const DailySheet = () => {
//   const location = useLocation();
  
//   const [formData, setFormData] = useState({
//     date: "",
//     projectName: "",
//     work: "",
//     workDone: "",
//   });
//   const [isWorksheetExists, setIsWorksheetExists] = useState(false);
//   const [isCurrentDate, setIsCurrentDate] = useState(false);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     const decoded = jwtDecode(token);
//     const empId = decoded.user.EmpId;

//       // If location.state.work exists, use it to set the form data
//       if (location.state?.work) {
//         const work = location.state.work;
//         setFormData({
//           date: work.date || "",
//           projectName: work.projectName || "",
//           work: work.work || "",
//           workDone: work.workDone || "",
//         });

//         setIsWorksheetExists(true); // Assume worksheet exists as data is coming from state
//         setIsCurrentDate(work.date === new Date().toISOString().split("T")[0]);
//       } else {
//         // If no state is passed, fetch data from backend for the current date
//         const date = new Date();
//         const formattedDate = date.toISOString().split("T")[0]; // Convert to string "YYYY-MM-DD"
  
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           date: formattedDate,
//         }));
  
//         fetchWorksheet(empId, formattedDate);
//         setIsCurrentDate(true); // Initially set for today's date
//       }  
//     }, [location.state]);  // Run only when location.state changes
//     console.log(isCurrentDate);

//   const fetchWorksheet = async (empId, date) => {
//     try {
//       const response = await api.get(`/api/worksheet/view/${empId}`, {
//         params: { date },
//       });
//       if (response.data) {
//         setFormData({
//           date: response.data[0].date,
//           projectName: response.data[0].projectName,
//           work: response.data[0].work,
//         });
//         setIsWorksheetExists(true);
//       } else {
//         setIsWorksheetExists(false);
//       }
//     } catch (error) {
//       console.log("Error fetching worksheet:", error);
//       setIsWorksheetExists(false);
//     }
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     const today = new Date().toISOString().split("T")[0]; // Current date in "YYYY-MM-DD" format
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       date: selectedDate,
//     }));
//     setIsCurrentDate(selectedDate === today); // Check if the selected date is today

//     const token = sessionStorage.getItem("token");
//     const decoded = jwtDecode(token);
//     const empId = decoded.user.EmpId;

//     fetchWorksheet(empId, selectedDate);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = sessionStorage.getItem("token");
//       const decoded = jwtDecode(token);
//       const empId = decoded.user.EmpId;

//       // Submit form data via PUT request
//       const response = await api.put(
//         `/api/worksheet/update/${empId}`,
//         formData
//       );

//       if (response.status === 200) {
//         toast.success("Worksheet updated successfully.");
//       } else {
//         toast.error("Error updating worksheet.");
//       }
//     } catch (error) {
//       console.error("Error submitting worksheet:", error);
//     }
//   };

//   return (
//     <section className="bg-gradient-to-b from-blue-50 min-h-screen to-slate-100 h-full flex-1">
//       <form
//         className="p-6 rounded-lg bg-white border m-4 space-y-6"
//         onSubmit={handleSubmit}
//       >
//         <div className="text-center text-3xl font-bold text-blue-700">
//           Worksheet
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Date Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleDateChange}
//               className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300  rounded outline-none shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
//             />
//           </div>

//           {/* Project Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Project Name
//             </label>
//             <input
//               type="text"
//               name="projectName"
//               value={formData.projectName}
//               onChange={handleInputChange}
//               className={`mt-2 block w-full px-4 py-2 text-sm outline-none border rounded shadow-sm ${
//                 isWorksheetExists
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "border-gray-300  focus:ring-1 focus:ring-blue-500"
//               }`}
//               readOnly={isWorksheetExists}
//             />
//           </div>

//           {/* Work Assign */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Work Assign
//             </label>
//             <input
//               type="text"
//               name="work"
//               value={formData.work}
//               onChange={handleInputChange}
//               className={`mt-2 block w-full px-4 py-2 text-sm border outline-none rounded shadow-sm ${
//                 isWorksheetExists
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "border-gray-300  focus:ring-1 focus:ring-blue-500"
//               }`}
//               readOnly={isWorksheetExists}
//             />
//           </div>

//           {/* Work Done */}
//           <div className="md:col-span-3">
//             <label className="block text-sm font-medium text-gray-700">
//               Work Done
//             </label>
//             <textarea
//               name="workDone"
//               value={formData.workDone}
//               onChange={handleInputChange}
//               className="mt-2 block w-full px-4 py-2 text-sm border rounded border-gray-300  outline-none  focus:ring-1 focus:ring-blue-500"
//               rows="4"
//             />
//           </div>
//         </div>
        
//         {/* Submit Button */}
//         <div className="flex justify-center">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-700 text-white font-semibold rounded  hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300"
//             >
//               Submit
//             </button>
//           </div>
//         {/* {isCurrentDate && (
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-700 text-white font-semibold rounded  hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300"
//             >
//               Submit
//             </button>
//           </div>
//         )} */}
//       </form>
//     </section>
//   );
// };

// export default DailySheet;

