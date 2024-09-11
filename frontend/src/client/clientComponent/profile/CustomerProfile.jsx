import { useEffect, useState } from "react";
import api from "../../../config/api";

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
    <section className="md:ml-60 bg-inherit p-4 pb-8 -mt-4">
      <div
        className="max-w-full overflow-y-auto bg-white p-8 mx-4 rounded-lg shadow-md"
        style={{ height: "600px", border: "1px solid white" }}
      >
        <h2 className="text-2xl font-semibold text-gray-500">
          Profile Details
        </h2>
        <div className="mt-4">
          {loading ? (
            <p>Loading customer details...</p>
          ) : customer ? (
            <div className="text-left">
              <h3 className="text-3xl text-center border-b-2 border-black font-bold mb-4 pb-4 text-gray-700">
                Your Profile Information
              </h3>
              {/* Profile Image */}
              <div className="text-center mb-6">
                {customer.profileImage ? (
                  <img
                    src={customer.profileImage}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                ) : (
                  <p>No Profile Image</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">Name:</strong>{" "}
                  {customer.name}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">Email:</strong>{" "}
                  {customer.email}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">Mobile:</strong>{" "}
                  {customer.mobile}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">
                    Date Of Birth:
                  </strong>{" "}
                  {customer.dob}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">Address:</strong>{" "}
                  {customer.address}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">GST Number:</strong>{" "}
                  {customer.gstNo}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">GST Name:</strong>{" "}
                  {customer.gstName}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">Aadhar No:</strong>{" "}
                  {customer.aadharNo}
                </p>
                <p className="text-gray-700">
                  <strong className="text-indigo-600 mr-4">Password:</strong>{" "}
                  {customer.password}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Failed to load customer details.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerProfile;
