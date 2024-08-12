import { useState, useEffect } from "react";
import api from '../../../config/api';
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const CustomerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    gstNo: "",
    gstName: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.get(
          `/api/customers/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching customer details", error);
        toast.error("Failed to fetch customer details");
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/customers/${id}`, formData);
      toast.success("Customer updated successfully");
      navigate("/admin/customerReport");
    } catch (error) {
      console.error("Error updating customer", error);
      toast.error("Failed to update customer");
    }
  };

  return (
    <div className="p-4 md:ml-48">
      <div className="bg-blue-gray-50 p-4 text-center text-2xl font-bold mb-6">
        Update Customer
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700">
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gstNo" className="block text-gray-700">
            GST No.
          </label>
          <input
            type="text"
            id="gstNo"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gstName" className="block text-gray-700">
            GST Name
          </label>
          <input
            type="text"
            id="gstName"
            name="gstName"
            value={formData.gstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
          >
            Update Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerUpdate;
