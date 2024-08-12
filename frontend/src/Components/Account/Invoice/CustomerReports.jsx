import { useState, useEffect } from 'react';
import api from '../../../config/api';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

// Set app element for accessibility
Modal.setAppElement('#root');

const CustomerReports = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all customers
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/api/customers/getCustomer');
        console.log(response.data);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers', error);
        toast.error('Failed to fetch customers');
      }
    };

    fetchCustomers();
  }, []);

  const handleViewClick = async (customerId) => {
    try {
      const response = await api.get(`/api/customers/${customerId}`);
      setSelectedCustomer(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching customer details', error);
      toast.error('Failed to fetch customer details');
    }
  };

  const handleUpdateClick = (customerId) => {
    navigate(`/account/updateCustomer/${customerId}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="p-4 md:ml-48">
      <div className="bg-blue-gray-50 p-4 text-center text-2xl font-bold mb-6">Customer Reports</div>
      <table className="min-w-full divide-y divide-gray-200 shadow-lg">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">S.No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">View</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Update</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {customers.map((customer, index) => (
            <tr key={customer._id} className="hover:bg-gray-100">
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{customer.name}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    <button 
                    onClick={() => handleViewClick(customer._id)} 
                    className=" border border-indigo-600 bg-cyan-400 hover:bg-cyan-800 text-white shadow-md hover:shadow-lg transition-all duration-200 px-4 py-2 rounded-md"
                    >
                    <PiEyeClosedBold className='font-bold text-xl' />
                    </button>
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    <button 
                    onClick={() => handleUpdateClick(customer._id)} 
                    className="text-white border border-indigo-600 bg-blue-600 hover:bg-blue-900 shadow-md hover:shadow-lg transition-all duration-200 px-4 py-2 rounded-md"
                    >
                    Update
                    </button>
                </td>
            </tr>
        ))}
        </tbody>

      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Customer Details Modal"
        className="mt-8 fixed inset-0 flex justify-center items-center p-4"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-full overflow-auto relative">
          <button 
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-700 text-3xl p-2"
          >
            &times;
          </button>
          {selectedCustomer && (
            <div className="space-y-2">
              <p><strong className="text-gray-700 mr-2">Name:</strong> {selectedCustomer.name}</p>
              <p><strong className="text-gray-700 mr-2">Email:</strong> {selectedCustomer.email}</p>
              <p><strong className="text-gray-700 mr-2">Mobile:</strong> {selectedCustomer.mobile}</p>
              <p><strong className="text-gray-700 mr-2">Address:</strong> {selectedCustomer.address}</p>
              <p><strong className="text-gray-700 mr-2">GST No.:</strong> {selectedCustomer.gstNo}</p>
              <p><strong className="text-gray-700 mr-2">GST Name:</strong> {selectedCustomer.gstName}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CustomerReports;
