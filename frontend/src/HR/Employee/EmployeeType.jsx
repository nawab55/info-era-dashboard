import { useState, useEffect } from "react";
import api from "../../config/api";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { CiCalendar } from "react-icons/ci";

const EmployeeType = () => {
  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchEmployeeTypes();
  }, []);

  const fetchEmployeeTypes = async () => {
    try {
      const response = await api.get("/api/type/employee-types");
      setEmployeeTypes(response.data);
    } catch (error) {
      console.error("Error fetching employee types:", error);
    }
  };

  const handleAddEmployeeType = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/type/employee-types", { type: employeeType });
      toast.success("Employee Type is created successfully.");
      setEmployeeType("");
      fetchEmployeeTypes();
    } catch (error) {
      console.error("Error adding employee type:", error);
    }
  };

  const handleDeleteEmployeeType = async (id, data) => {
    try {
      await api.delete(`/api/type/employee-types/${id}`);
      toast.success(`${data.type} is deleted successfully`);
      fetchEmployeeTypes();
    } catch (error) {
      console.error("Error deleting employee type:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex-1">
      {/* Header */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-gradient-to-r from-blue-700 to-indigo-600 px-5 py-3 shadow-lg rounded-tl rounded-tr">
        <h1 className="text-lg md:text-2xl font-bold text-white tracking-wide w-full md:w-auto text-center md:text-left">
          Employee Type Management
        </h1>
        <div className="flex items-center bg-white text-violet-700 px-3 py-2 rounded shadow-lg cursor-pointer hover:text-purple-600 transition duration-300 w-full md:w-auto justify-center md:justify-start">
          <CiCalendar className="mr-3 text-xl" />
          <span className="font-medium text-sm md:text-base">{todayDate}</span>
        </div>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleAddEmployeeType}
        className="my-6 flex gap-4 bg-white p-6 rounded border"
      >
        <div className="flex-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Add Employee Type <span className="text-red-600">*</span>
          </label>
          <div className="flex justify-between">
            <input
              type="text"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              placeholder="Enter Employee Type"
              className=" w-full rounded border border-gray-300 py-2 px-4 mr-6 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="flex px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow-md transition"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* List Section */}
      <ul className="space-y-4">
        {employeeTypes.length > 0 ? (
          employeeTypes.map((type) => (
            <li
              key={type._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-300 hover:bg-blue-50 transition"
            >
              <span className="text-lg font-medium text-gray-700">
                {type.type}
              </span>
              <button
                onClick={() => handleDeleteEmployeeType(type._id, type)}
                className="text-red-600 hover:text-red-800 flex items-center justify-center"
              >
                <MdDelete size={24} />
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No employee types available.
          </p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeType;
