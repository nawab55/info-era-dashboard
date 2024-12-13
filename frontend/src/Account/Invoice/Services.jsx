import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiPackage,
  FiDollarSign,
  FiGrid,
  FiHash,
} from "react-icons/fi";

const Services = () => {
  const [servicesFormData, setServicesFormData] = useState({
    categoryName: "",
    hsnCode: "",
    service: "",
    amount: "",
  });

  const [hsnCodes, setHsnCodes] = useState([]);
  const [services, setServices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      // Find the corresponding HSN code based on the selected category
      const selectedCategory = hsnCodes.find(
        (data) => data.categoryName === value
      );
      setServicesFormData((prevState) => ({
        ...prevState,
        [name]: value,
        hsnCode: selectedCategory ? selectedCategory.hsnCode : "",
      }));
    } else {
      setServicesFormData({ ...servicesFormData, [name]: value });
      // setServicesFormData((prevState) => ({
      //   ...prevState,
      //   [name]: value,
      // }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/product/services", servicesFormData);
      toast.success("Service added successfully");
      setServicesFormData({
        categoryName: "",
        hsnCode: "",
        service: "",
        amount: "",
      });
      fetchServices();
    } catch (error) {
      console.error("Error adding services data:", error);
      toast.error("Failed to add service");
    }
  };

  const fetchHsnCodes = async () => {
    try {
      const response = await api.get("api/product/hsncodes");
      setHsnCodes(response.data.hsnCodes);
    } catch (error) {
      console.error("Error fetching HSN codes:", error);
      toast.error("Failed to load HSN codes");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("api/product/services");
      // console.log(response.data.services);
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchHsnCodes();
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen flex-1 max-w-full bg-gradient-to-br from-gray-50 to-gray-100 p-2 md:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Form Section */}
        <div className="bg-white rounded border overflow-hidden">
          <div className="bg-gradient-to-r flex justify-center from-slate-100 to-slate-200 px-6 py-4">
            <h1
              id="header"
              className="p-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700 text-2xl"
            >
              Services
            </h1>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Select */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FiGrid className="mr-2" />
                    Category Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="categoryName"
                    value={servicesFormData.categoryName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Select Category</option>
                    {hsnCodes.map((data) => (
                      <option key={data._id} value={data.categoryName}>
                        {data.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* HSN Code Select */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FiHash className="mr-2" />
                    HSN Code
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="hsnCode"
                    value={servicesFormData.hsnCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
                    placeholder="Enter HSN code"
                  />
                </div>

                {/* Service Input */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FiPackage className="mr-2" />
                    Service
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={servicesFormData.service}
                    onChange={handleChange}
                    required
                    placeholder="Enter service name"
                    className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
                  />
                </div>

                {/* Amount Input */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="mr-2" />
                    Amount
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={servicesFormData.amount}
                    onChange={handleChange}
                    required
                    placeholder="Enter amount"
                    className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg shadow-blue-500/30"
                >
                  <FiPlus className="mr-2" />
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Services List</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full overflow-x-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HSN Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map((service, index) => (
                  <tr
                    key={service._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.categoryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.hsnCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ₹{service.amount}
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No services found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
