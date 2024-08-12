import { useState } from 'react';
import { toast } from "react-toastify";
import api from '../../../config/api';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    gstNo: '',
    gstName: ''
  });

  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted customer data

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post customer data to API endpoint
      const response = await api.post('/api/customers/createCustomer', formData);
      console.log('Post response:', response.data);
      toast.success("Customer Details data submitted successfully");

      // Set submitted customer data to display in modal
      setSubmittedData(formData);

      // Open modal after successful submission
      setModalOpen(true);

      // Clear form data
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: '',
        gstNo: '',
        gstName: ''
      });
    } catch (error) {
      console.error('Error posting customer data:', error);
      toast.error("Error submitting customer data");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* <InvoiceNav /> */}
      <div className="flex items-center justify-center bg-gray-100 p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl md:ml-48">
          <h2 className="text-2xl font-bold mb-6 text-center uppercase">Customer Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email Id</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="mobile">Mobile No.</label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
              <textarea
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="gstNo">GST No.</label>
              <input
                type="text"
                name="gstNo"
                id="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="gstName">GST Name</label>
              <input
                type="text"
                name="gstName"
                id="gstName"
                value={formData.gstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">Customer Details</h2>
              {submittedData && (
                <div className="space-y-2">
                  <p><strong className="text-gray-700 mr-2">Name:</strong> {submittedData.name}</p>
                  <p><strong className="text-gray-700 mr-2">Email:</strong> {submittedData.email}</p>
                  <p><strong className="text-gray-700 mr-2">Mobile:</strong> {submittedData.mobile}</p>
                  <p><strong className="text-gray-700 mr-2">Address:</strong> {submittedData.address}</p>
                  <p><strong className="text-gray-700 mr-2">GST No.:</strong> {submittedData.gstNo}</p>
                  <p><strong className="text-gray-700 mr-2">GST Name:</strong> {submittedData.gstName}</p>
                </div>
              )}
              <button
                className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 w-full"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerForm;
