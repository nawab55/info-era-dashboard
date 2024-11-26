import { useEffect, useState } from "react";
import api from "../../../config/api";
import { FaSpinner } from "react-icons/fa";
// import { CiCalendar } from "react-icons/ci";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerId = sessionStorage.getItem("clientId");
        const token = sessionStorage.getItem("customerToken");
        const response = await api.get(`/api/customers/details/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setCustomer(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch customer data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <section className="flex-1 overflow-x-scroll bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      {/* Top Section */}
      <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-blue-700 to-indigo-600 px-5 py-4 shadow-lg rounded-tl-lg rounded-tr-lg">
        <h1 className="text-lg md:text-2xl font-bold text-white tracking-wide w-full md:w-auto text-center md:text-left">
          User Profile
        </h1>
        {customer && (
          <div className="flex items-center bg-white text-blue-700 px-4 py-2 rounded shadow-lg cursor-pointer hover:text-indigo-600 transition duration-300">
            <img
              src={customer.profileImage || "https://via.placeholder.com/50"}
              alt="User"
              className="w-10 h-10 object-cover rounded-full mr-3"
            />
            <span className="font-medium text-sm md:text-base">
              {customer.name}
            </span>
          </div>
        )}
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
        <h2 className="text-2xl font-bold text-blue-900 border-b pb-4 mb-6">
          Your Profile Information
        </h2>
      
          
        {loading ? (
          // <p className="text-gray-600 text-center">
          //   Loading customer details...
          // </p>
          <div className="w-full min-h-[70vh] flex justify-center items-center">
          <FaSpinner size={25} className="animate-spin text-blue-700" />
        </div>
        ) : customer ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <div className="text-center md:col-span-2">
              {customer.profileImage ? (
                <img
                  src={customer.profileImage}
                  alt="Profile"
                  className="w-20 h-20 object-cover rounded-full mx-auto shadow-md"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-300 mx-auto flex items-center justify-center">
                  <p className="text-gray-600">No Image</p>
                </div>
              )}
            </div> */}
            <p className="text-gray-700">
              <strong className="text-indigo-600">Name:</strong> {customer.name}
            </p>
            <p className="text-gray-700">
              <strong className="text-indigo-600">Email:</strong>{" "}
              {customer.email}
            </p>
            <p className="text-gray-700">
              <strong className="text-indigo-600">Mobile:</strong>{" "}
              {customer.mobile}
            </p>
            <p className="text-gray-700">
              <strong className="text-indigo-600">Date of Birth:</strong>{" "}
              {customer.dob}
            </p>
            <p className="text-gray-700">
              <strong className="text-indigo-600">Address:</strong>{" "}
              {customer.address}
            </p>
            <p className="text-gray-700">
              <strong className="text-indigo-600">GST Number:</strong>{" "}
              {customer.gstNo}
            </p>
            <p className="text-gray-700">
              <strong className="text-indigo-600">GST Name:</strong>{" "}
              {customer.gstName}
            </p>
            <p className="text-gray-700">
              <strong className="text-indigo-600">Aadhar No:</strong>{" "}
              {customer.aadharNo}
            </p>
            {/* <p className="text-gray-700">
              <strong className="text-indigo-600 mr-4">Password:</strong>{" "}
              {customer.password}
            </p> */}
          </div>
        ) : (
          <p className="text-red-500 text-center">
            Failed to load customer details.
          </p>
        )}
      </div>
    </section>
  );
};

export default CustomerProfile;
