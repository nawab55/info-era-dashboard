import { useState, useEffect } from "react";
import api from "../../config/api";
import { FaPrint } from "react-icons/fa";
import EmpDetailModal from "./EmpDetailModal";

const EmpRegReports = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);  // State to store the selected employee
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

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
    const selected = employees.find(emp => emp._id === employeeId);
    setSelectedEmployee(selected);
    setIsModalOpen(true);
  }

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  }

  return (
    <section className="md:ml-52 mt-16 bg-gray-50 p-4">
      <div className="bg-blue-700 p-4 text-center text-white text-2xl font-bold border-b-2 border-gray-700 shadow-md">
        View All Employee Registration Reports
      </div>

      <div className="p-4">
        <div className="overflow-x-auto pb-10">
          <table className="min-w-full text-center text-sm bg-white shadow-lg rounded-lg">
            <thead className="border-b border-gray-300 font-medium bg-gray-200 ">
              <tr className="text-gray-900 border font-bold text-lg  top-0">
                <th className="px-2 py-3 border border-gray-300">Sl. No</th>
                <th className="px-2 py-3 border border-gray-300">Name</th>
                <th className="px-2 py-3 border border-gray-300">Date of Joining</th>
                <th className="px-2 py-3 border border-gray-300">Designation</th>
                <th className="px-2 py-3 border border-gray-300">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr
                    key={employee._id}
                    className="bg-white text-sm font-medium border border-gray-300 hover:bg-gray-100 transition duration-150"
                  >
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {employee.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {new Date(employee.dateOfJoining).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {employee.designation}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300 text-center">
                      <button
                        onClick={() => handlePrintClick(employee._id)}
                        className="text-indigo-600 hover:text-indigo-900">
                        <FaPrint className="inline-block w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
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
