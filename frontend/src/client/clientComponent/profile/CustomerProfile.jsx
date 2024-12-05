import { useEffect, useState } from "react";
import api from "../../../config/api";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  ShieldCheck,
  Loader2,
  Edit,
} from "lucide-react";

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

  const profileFields = [
    {
      icon: <User className="text-blue-500" size={24} />,
      label: "Full Name",
      value: customer?.name,
    },
    {
      icon: <Mail className="text-green-500" size={24} />,
      label: "Email Address",
      value: customer?.email,
    },
    {
      icon: <Phone className="text-purple-500" size={24} />,
      label: "Contact Number",
      value: customer?.mobile,
    },
    {
      icon: <Calendar className="text-red-500" size={24} />,
      label: "Date of Birth",
      value: customer?.dob,
    },
    {
      icon: <MapPin className="text-orange-500" size={24} />,
      label: "Address",
      value: customer?.address,
    },
    {
      icon: <FileText className="text-teal-500" size={24} />,
      label: "GST Number",
      value: customer?.gstNo,
    },
    {
      icon: <ShieldCheck className="text-indigo-500" size={24} />,
      label: "Aadhar Number",
      value: customer?.aadharNo,
    },
  ];

  const onEditProfile = () => {};
  return (
    <section className="bg-gradient-to-br flex-1 from-gray-50 to-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded border mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              User Profile
            </h1>

            {customer && (
              <div className="flex items-center space-x-4">
                <img
                  src={
                    customer.profileImage || "https://via.placeholder.com/50"
                  }
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-white/30 transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <p className="text-white font-semibold text-lg">
                    {customer.name}
                  </p>
                  <p className="text-white/70 text-sm">{customer.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        {/* <div className="box"> */}
        <div className="bg-white m-[2px] rounded-md relative border p-8">
          <div className="flex justify-between z-10 items-center border-b border-gray-200 pb-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h2>
              <p className="text-gray-500 text-sm">
                Detailed view of your personal information
              </p>
            </div>

            {onEditProfile && (
              <button
                onClick={onEditProfile}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                <Edit size={20} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-blue-600" size={56} />
            </div>
          ) : customer ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileFields.map((field, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 border overflow-hidden rounded flex items-center space-x-4 transform transition-all duration-300 "
                >
                  <div className="bg-white p-3 rounded-full shadow-md">
                    {field.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      {field.label}
                    </p>
                    <p className="text-md font-semibold max-w-full  text-gray-800">
                      {field.value || "Not Provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded">
              <p className="text-red-500 font-semibold text-lg">
                Unable to load profile information
              </p>
              <p className="text-gray-500 mt-2">
                Please check your connection or try again later
              </p>
            </div>
          )}
        </div>
        </div>
      
      {/* </div> */}
    </section>
  );
};

export default CustomerProfile;
