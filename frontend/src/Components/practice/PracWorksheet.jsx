import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";

const PracWorksheet = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    designation: "",
    date: new Date().toISOString().split("T")[0], // Initialize with current date
    projectName: "",
    work: "",
  });

  useEffect(() => {
    // Fetch employee data from the backend
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/api/worksheet/employees");
        console.log(response.data);
        
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    const employee = employees.find((emp) => emp.EmpId === empId);
    if (employee) {
      setFormData({
        ...formData,
        empId: employee.EmpId,
        empName: employee.name,
        designation: employee.designation,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit form data to the backend
      const response = await api.post("/api/worksheet/creatework", formData);
      toast.success(`Worksheet for ${formData.empName} is created successfully`);
      console.log("Form submitted successfully:", response.data);
      // Reset form after submission
      setFormData({
        empId: "",
        empName: "",
        designation: "",
        date: "",
        projectName: "",
        work: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="bg-slate-50 h-full mt-16 md:ml-52" >
      <form className="bg-emerald-100 p-4 space-y-4" onSubmit={handleSubmit} >
        <div className="p-4 text-center text-2xl bg-emerald-600 rounded-md shadow-lg shadow-emerald-500 text-white">
          Worksheet Form
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">
          <div className="">
            <label className="block font-semibold text-gray-900">
              Employee ID
            </label>
            <select
              name="empId"
              value={formData.empId}
              onChange={handleEmployeeChange}
              className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.EmpId} value={employee.EmpId}>
                  {employee.name} - {employee.EmpId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-900">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-900">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-12">
            <label className="block font-semibold text-gray-900">Work</label>
            <textarea
              name="work"
              value={formData.work}
              onChange={handleInputChange}
              className="bg-teal-50 mt-1 block w-full p-2 border border-gray-300 shadow-lg shadow-emerald-400 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center py-2">
          <button
            type="submit"
            className="flex items-center justify-center px-5 py-3 bg-emerald-700 text-white rounded-md shadow-xl shadow-emerald-500"
          >
            Submit
          </button>
        </div>
        <div className="h-20"></div>
      </form>
    </section>
  );
};

export default PracWorksheet;