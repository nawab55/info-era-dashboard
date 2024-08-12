import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from '../../../config/api';

const AddHsnCode = () => {
  const [hsnFormData, setHsnFormData] = useState({
    categoryName: "",
    hsnCode: "",
  });

  const [categories, setCategories] = useState([]);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCategory = (categoryName) => {
    setHsnFormData({ ...hsnFormData, categoryName });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHsnFormData({ ...hsnFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/product/hsncode", hsnFormData);
      console.log("HSN data added:", response.data);
      toast.success("HSN code Data added successfully");
      setHsnFormData({ categoryName: "", hsnCode: "" });
      fetchHsnCodes(); // Fetch the updated list of HSN codes
    } catch (error) {
      console.error("Error adding HSN code:", error);
      toast.error("Error adding HSN code");
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

  useEffect(() => {
    fetchCategories();
    fetchHsnCodes();
  }, []);

  return (
    <section className="p-4 md:ml-48 bg-blue-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="text-3xl font-bold mb-6 pb-2 text-center uppercase border-b border-gray-300">
            Add HSN Code
          </h1>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Category Name:
              <span className="text-red-600 font-bold">*</span>
            </label>
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex justify-between items-center"
                style={{ minHeight: "2.5rem" }} // Example height
              >
                <span>{hsnFormData.categoryName || "Select Category"}</span>
                <svg
                  className="w-6 h-6 ml-2 -mr-1 pointer-events-none"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06-.02L10 10.94l3.71-3.75a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"
                  />
                </svg>
              </div>
              {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      onClick={() => handleSelectCategory(category.categoryName)}
                      className="cursor-pointer p-2 hover:bg-blue-gray-50 border-b border-gray-300"
                    >
                      {category.categoryName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              HSN Code:
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="hsnCode"
              value={hsnFormData.hsnCode}
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
          HSN Codes List
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {hsnCodes.map((hsn, index) => (
                <tr key={hsn._id}>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm text-gray-700">
                    {hsn.categoryName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm text-gray-700">
                    {hsn.hsnCode}
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

export default AddHsnCode;

