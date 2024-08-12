import { useState, useEffect } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const Services = () => {
  const [servicesFormData, setServicesFormData] = useState({
    categoryName: "",
    hsnCode: "",
    service: "",
    amount: "",
  });

  const [categories, setCategories] = useState([]);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [services, setServices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicesFormData({ ...servicesFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/product/services", servicesFormData);
      console.log("Services data added:", response.data);
      toast.success("Data added successfully");
      setServicesFormData({
        categoryName: "",
        hsnCode: "",
        service: "",
        amount: "",
      });
      fetchServices(); // Fetch the updated list of services
    } catch (error) {
      console.error("Error adding services data:", error);
      toast.error("Error adding data");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("api/product/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };

  const fetchHsnCodes = async () => {
    try {
      const response = await api.get("api/product/hsncodes");
      setHsnCodes(response.data.hsnCodes);
    } catch (error) {
      console.error("Error fetching HSN codes:", error);
      toast.error("Error fetching HSN codes");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("api/product/services");
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchHsnCodes();
    fetchServices();
  }, []);

  return (
    <section className="p-4 md:ml-48 bg-blue-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="text-3xl font-bold mb-6 pb-2 text-center uppercase border-b border-gray-300">
            Services
          </h1>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Category Name:
              <span className="text-red-600 font-bold">*</span>
            </label>
            <select
              name="categoryName"
              value={servicesFormData.categoryName}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              HSN Code:
              <span className="text-red-600 font-bold">*</span>
            </label>
            <select
              name="hsnCode"
              value={servicesFormData.hsnCode}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select HSN Code</option>
              {hsnCodes.map((hsn) => (
                <option key={hsn._id} value={hsn.hsnCode}>
                  {hsn.hsnCode}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Service:
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="service"
              value={servicesFormData.service}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Amount:
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={servicesFormData.amount}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="rounded-md my-4 bg-custom-blue px-4 py-2 text-sm text-white shadow-sm hover:bg-custom-hover-blue"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center uppercase border-b border-gray-300">
          Services List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  HSN Code
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {services.map((service, index) => (
                <tr key={service._id}>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm text-gray-700">
                    {service.categoryName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm text-gray-700">
                    {service.hsnCode}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm text-gray-700">
                    {service.service}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm text-gray-700">
                    {service.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Services;
