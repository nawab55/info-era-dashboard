import { useState, useEffect } from "react";
import { Pencil, Trash2, Printer, Search } from "lucide-react";
// import { FaFilePdf } from "react-icons/fa";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../Components/Modal/DeleteModal";
import EmpDetailModal from "./EmpDetailModal";
import { toast } from "react-toastify";

const EmpRegReports = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handlePrintClick = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailModalOpen(true);
  };

  const handleEditClick = (employee) => {
    navigate("/hr/register", { state: { employee } });
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/user/employee/${employeeToDelete._id}`);
      setEmployees(employees.filter((emp) => emp._id !== employeeToDelete._id));
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error(`Error deleting employee: ${error.message}`);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex-1 min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800">
            <h1 className="text-2xl font-bold text-center text-white md:text-3xl">
              Employee Registration Reports
            </h1>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
              <div className="relative w-full md:w-96">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full overflow-hidden divide-y divide-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600">
                      No.
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600">
                      Name
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600">
                      Date of Joining
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600">
                      Designation
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-center text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => (
                      <tr
                        key={employee._id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {new Date(
                            employee.dateOfJoining
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {employee.designation}
                        </td>
                        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                          <div className="flex items-center justify-center space-x-3">
                            <button
                              onClick={() => handlePrintClick(employee)}
                              className="p-1 text-blue-600 transition-colors rounded-full hover:text-blue-800 hover:bg-blue-50"
                              title="Print Details"
                            >
                              {/* <FileText className="w-5 h-5" /> */}
                              <Printer className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEditClick(employee)}
                              className="p-1 text-green-600 transition-colors rounded-full hover:text-green-800 hover:bg-green-50"
                              title="Edit Employee"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(employee)}
                              className="p-1 text-red-600 transition-colors rounded-full hover:text-red-800 hover:bg-red-50"
                              title="Delete Employee"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Print Details Modal */}
      {isDetailModalOpen && selectedEmployee && (
        <EmpDetailModal
          employee={selectedEmployee}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedEmployee(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name}'s record? This action cannot be undone.`}
      />
    </section>
  );
};

export default EmpRegReports;

// import { useState, useEffect } from "react";
// import api from "../../config/api";
// import { FaPrint } from "react-icons/fa";
// import EmpDetailModal from "./EmpDetailModal";

// const EmpRegReports = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

//   // Fetch employee data from the backend
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await api.get("/api/user/all/getalluser");
//         setEmployees(response.data.users);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // Function to handle the print button click and open the modal
//   const handlePrintClick = (employeeId) => {
//     const selected = employees.find((emp) => emp._id === employeeId);
//     setSelectedEmployee(selected);
//     setIsModalOpen(true);
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedEmployee(null);
//   };

//   return (
//     <section className="flex-1 min-h-screen p-4 bg-gray-50">
//       <div className="p-4 text-2xl font-bold text-center text-white bg-blue-700 border-b-2 border-gray-700 shadow-md">
//         View All Employee Registration Reports
//       </div>

//       <div className="p-4">
//         <div className="pb-10 overflow-x-auto">
//           <table className="min-w-full text-sm text-center bg-white rounded-lg shadow-lg">
//             <thead className="font-medium bg-gray-200 border-b border-gray-300 ">
//               <tr className="top-0 text-lg font-bold text-gray-900 border">
//                 <th className="px-2 py-3 border border-gray-300">Sl. No</th>
//                 <th className="px-2 py-3 border border-gray-300">Name</th>
//                 <th className="px-2 py-3 border border-gray-300">
//                   Date of Joining
//                 </th>
//                 <th className="px-2 py-3 border border-gray-300">
//                   Designation
//                 </th>
//                 <th className="px-2 py-3 border border-gray-300">Print</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {employees.length > 0 ? (
//                 employees.map((employee, index) => (
//                   <tr
//                     key={employee._id}
//                     className="text-sm font-medium transition duration-150 bg-white border border-gray-300 hover:bg-gray-100"
//                   >
//                     <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
//                       {index + 1}
//                     </td>
//                     <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
//                       {employee.name}
//                     </td>
//                     <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
//                       {new Date(employee.dateOfJoining).toLocaleDateString()}
//                     </td>
//                     <td className="px-2 py-2 border border-gray-300 whitespace-nowrap">
//                       {employee.designation}
//                     </td>
//                     <td className="px-2 py-2 text-center border border-gray-300 whitespace-nowrap">
//                       <button
//                         onClick={() => handlePrintClick(employee._id)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         <FaPrint className="inline-block w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="py-6 text-center text-gray-500">
//                     No employees found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* Modal for displaying employee details */}
//       {isModalOpen && selectedEmployee && (
//         <EmpDetailModal
//           employee={selectedEmployee}
//           onClose={handleCloseModal}
//         />
//       )}
//     </section>
//   );
// };

// export default EmpRegReports;
