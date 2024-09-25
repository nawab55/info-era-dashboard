import { useState, useEffect } from "react";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const DailySheet = () => {
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

    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // Convert to string "YYYY-MM-DD"

    setFormData((prevFormData) => ({
      ...prevFormData, 
      date: formattedDate,
    }));

    fetchWorksheet(empId, formattedDate);
    setIsCurrentDate(true); // Initially set for today's date
  }, []);

  const fetchWorksheet = async (empId, date) => {
    try {
      console.log(empId, date);

      const response = await api.get(`/api/worksheet/view/${empId}`, {
        params: { date },
      });
      // console.log(response.data);
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
      const response = await api.put(`/api/worksheet/update/${empId}`, formData);

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
    <section className="bg-slate-50 h-full mt-16 md:ml-52">
      <form className="bg-blue-100 pb-8 p-4 space-y-4" onSubmit={handleSubmit}>
        <div className="p-4 text-center text-2xl bg-blue-700 rounded-md shadow-lg shadow-blue-500 text-white">
          Worksheet 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">
          <div>
            <label className="block text-sm font-medium text-gray-900">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              className="bg-blue-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-blue-400 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="bg-blue-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-blue-400 rounded-md focus:border-blue-500 focus:outline-none"
              readOnly={isWorksheetExists}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Work Assign</label>
            <input
              type="text"
              name="work"
              value={formData.work}
              onChange={handleInputChange}
              className="bg-blue-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-blue-400 rounded-md focus:border-blue-500 focus:outline-none"
              readOnly={isWorksheetExists}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Work Done</label>
            <textarea
              name="workDone"
              value={formData.workDone}
              onChange={handleInputChange}
              className="bg-blue-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-blue-400 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {isCurrentDate && (
          <div className="flex justify-center py-2">
            <button
              type="submit"
              className="flex items-center justify-center px-5 py-3 bg-blue-700 text-white rounded-md shadow-xl shadow-blue-500"
            >
              Submit
            </button>
          </div>
        )}
        {/* <div className="h-20"></div> */}
      </form>
    </section>
  );
};

export default DailySheet;
