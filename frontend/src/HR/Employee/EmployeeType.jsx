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
      console.log(response.data);

      setEmployeeTypes(response.data);
      console.log(employeeTypes);
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
    <div className="bg-green-200 h-full p-8 flex-1">
      <div className=" text-center bg-blue-gray-600 text-gray-950 font-bold text-2xl mb-6 rounded-lg">
        Employee Type
      </div>
      <form
        onSubmit={handleAddEmployeeType}
        className="mb-6 flex justify-between"
      >
        <div className="w-96">
          <label className="block text-base px-1 font-medium leading-6 text-gray-900">
            Add Employee Type <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            placeholder="Enter Employee Type"
            className="ps-2 block w-full rounded-md border-0 py-2 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg shadow-gray-200"
        >
          Submit
        </button>
      </form>
      <ul className="space-y-4">
        {employeeTypes &&
          employeeTypes.map((type) => (
            <li
              key={type._id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
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
