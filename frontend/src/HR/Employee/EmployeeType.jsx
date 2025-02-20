/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import api from "../../config/api";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const EmployeeType = () => {
  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);

  useEffect(() => {
    fetchEmployeeTypes();
  }, []);

  const fetchEmployeeTypes = async () => {
    try {
      const response = await api.get("/api/type/employee-types");
      // console.log(response.data);

      setEmployeeTypes(response.data);
      // console.log(employeeTypes);
    } catch (error) {
      console.error("Error fetching employee types:", error);
    }
  };

  const handleAddEmployeeType = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/type/employee-types", { type: employeeType });
      toast.success("Employee Type is Created successfully.");
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
    <div className="flex-1 min-h-screen p-8 bg-green-200">
      <div className="mb-6 text-2xl font-bold text-center rounded-lg bg-blue-gray-600 text-gray-950">
        Employee Type
      </div>
      <form
        onSubmit={handleAddEmployeeType}
        className="flex justify-between mb-6"
      >
        <div className="w-96">
          <label className="block px-1 text-base font-medium leading-6 text-gray-900">
            Add Employee Type <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            placeholder="Enter Employee Type"
            className="block w-full py-2 border-0 rounded-md shadow-md ps-2 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="px-8 py-2 mt-4 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 shadow-gray-200"
        >
          Submit
        </button>
      </form>
      <ul className="space-y-4">
        {employeeTypes &&
          employeeTypes.map((type) => (
            <li
              key={type._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <span>{type.type}</span>
              <button
                onClick={() => handleDeleteEmployeeType(type._id, type)}
                className="text-red-600 hover:text-red-800"
              >
                <MdDelete size={24} />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EmployeeType;
