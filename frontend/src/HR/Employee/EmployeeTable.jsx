import { useState, useEffect } from 'react';
// import axios from 'axios';
// import  API_BASE_URL  from '../../../config/API_BASE_URL'
import api from '../../../config/api';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import EmployeeDetails from './EmployeeDetails';
import { PiEyeClosedBold } from "react-icons/pi";

// Set app element for accessibility
Modal.setAppElement('#root');

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch all employees
    const fetchEmployees = async () => {
      try {
        const response = await api.get(`/api/employees`);
        // console.log(response.data);
        setEmployees(response.data.employees);
      } catch (error) {
        console.error('Error fetching employees', error);
        toast.error('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  const handleViewClick = async (employeeId) => {
    try {
      const response = await api.get(`/api/employees/${employeeId}`);
      setSelectedEmployee(response.data.employee);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching employee details', error);
      toast.error('Failed to fetch employee details');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-4 md:ml-48">
      <table className="min-w-full divide-y divide-gray-200 shadow-lg">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-900 uppercase">S.No</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-900 uppercase">Name</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-900 uppercase">EmpId</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-900 uppercase">D.O.J</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-900 uppercase">View</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr key={employee._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{employee.EmpId}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <button 
                  onClick={() => handleViewClick(employee._id)} 
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <PiEyeClosedBold className='text-xl font-bold ' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Details Modal"
        className="fixed inset-0 flex items-center justify-center p-4 mt-8"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="relative w-full max-w-3xl max-h-full p-6 overflow-auto bg-white rounded-lg shadow-lg">
          <button 
            onClick={closeModal}
            className="absolute p-2 text-3xl text-gray-500 top-2 right-2 hover:text-red-700"
          >
            &times;
          </button>
          {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeTable;
