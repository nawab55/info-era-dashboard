import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiFileText,
} from "react-icons/fi";
import { FaSave } from "react-icons/fa";

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
    dob: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.get(`/api/customers/details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      await api.put(`/api/customers/details/update/${id}`, formData);
      toast.success("Customer updated successfully");
      navigate("/account/customer/customerReport");
    } catch (error) {
      console.error("Error updating customer", error);
      toast.error("Failed to update customer");
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded border  overflow-hidden">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
              Customer Management
            </div>
            <h1 className="block mt-1 text-2xl leading-tight font-bold text-gray-900 mb-6">
              Update Customer
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "name", label: "Name", type: "text", icon: FiUser },
                { name: "email", label: "Email", type: "email", icon: FiMail },
                { name: "mobile", label: "Mobile", type: "tel", icon: FiPhone },
                {
                  name: "dob",
                  label: "Date of Birth",
                  type: "date",
                  icon: FiCalendar,
                },
                {
                  name: "gstNo",
                  label: "GST No.",
                  type: "text",
                  icon: FiFileText,
                },
                {
                  name: "gstName",
                  label: "GST Name",
                  type: "text",
                  icon: FiFileText,
                },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    {field.label}
                  </label>
                  <div className="mt-1 relative rounded-md ">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <field.icon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="focus:ring-1-indigo-500 focus:border-indigo-500 border block w-full pl-10 py-3 outline-none focus:ring-1-1 sm:text-sm border-gray-300 rounded-md transition duration-150 ease-in-out"
                      required
                    />
                  </div>
                </div>
              ))}
              <div className="relative">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Address
                </label>
                <div className="mt-1 relative rounded-md ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-2 pointer-events-none">
                    <FiMapPin
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="focus:ring-1-indigo-500 focus:border-indigo-500 pt-2 block w-full min-h-20 resize-none pl-10 outline-none border sm:text-sm border-gray-300 rounded-md transition duration-150 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end" >
                <button
                  type="submit"
                  className=" flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1-2 focus:ring-1-offset-2 focus:ring-1-indigo-500 transition duration-150 ease-in-out transform"
                >
                  Update Customer <FaSave/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerUpdate;
