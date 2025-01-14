import { useState, useEffect } from "react";
import api from "../../config/api";
import { FaPrint } from "react-icons/fa";
import EmpDetailModal from "./EmpDetailModal";

const EmpRegReports = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch employee data from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/api/user/all/getalluser");
        setEmployees(response.data.users);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle the print button click and open the modal
  const handlePrintClick = (employeeId) => {
    const selected = employees.find((emp) => emp._id === employeeId);
    setSelectedEmployee(selected);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <section className="flex-1 min-h-screen p-4 bg-gray-50">
      <div className="p-4 text-2xl font-bold text-center text-white bg-blue-700 border-b-2 border-gray-700 shadow-md">
        View All Employee Registration Reports
      </div>

      <div className="p-4">
        <div className="pb-10 overflow-x-auto">
          <table className="min-w-full text-sm text-center bg-white rounded-lg shadow-lg">
            <thead className="font-medium bg-gray-200 border-b border-gray-300 ">
              <tr className="top-0 text-lg font-bold text-gray-900 border">
                <th className="px-2 py-3 border border-gray-300">Sl. No</th>
                <th className="px-2 py-3 border border-gray-300">Name</th>
                <th className="px-2 py-3 border border-gray-300">
                  Date of Joining
                </th>
                <th className="px-2 py-3 border border-gray-300">
                  Designation
                </th>
                <th className="px-2 py-3 border border-gray-300">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr
                    key={employee._id}
                    className="text-sm font-medium transition duration-150 bg-white border border-gray-300 hover:bg-gray-100"
                  >
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {employee.name}
                    </td>
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {new Date(employee.dateOfJoining).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
                      {employee.designation}
                    </td>
                    <td className="px-2 py-2 text-center border border-gray-300 whitespace-nowrap">
                      <button
                        onClick={() => handlePrintClick(employee._id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaPrint className="inline-block w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for displaying employee details */}
      {isModalOpen && selectedEmployee && (
        <EmpDetailModal
          employee={selectedEmployee}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default EmpRegReports;
