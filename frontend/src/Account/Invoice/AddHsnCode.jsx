import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";

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
    <div className="min-h-screen max-w-full flex-1 bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Add HSN Code Form */}
        <div className="bg-white rounded border p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-800  mb-8">
            Add HSN Code
          </h2>

          <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col gap-10">
            {/* Category Dropdown */}
            <div className="space-y-2 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Category Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-full px-4 py-2 text-left bg-white rounded border border-gray-200 
                         focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                         transition-colors duration-200 flex items-center truncate justify-between"
                >
                  <span
                    className={`${
                      !hsnFormData.categoryName && "text-gray-400 truncate"
                    }`}
                  >
                    {hsnFormData.categoryName || "Select Category"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 
                            ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    className="absolute z-10 w-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg 
                              overflow-hidden max-h-60 overflow-y-auto"
                  >
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        type="button"
                        onClick={() =>
                          handleSelectCategory(category.categoryName)
                        }
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors 
                               duration-150 text-gray-700 text-sm border-b border-gray-100 last:border-0"
                      >
                        {category.categoryName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* HSN Code Input */}
            <div className="space-y-2 flex-1 ">
              <label className="block text-sm font-medium text-gray-700">
                HSN Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hsnCode"
                value={hsnFormData.hsnCode}
                onChange={handleChange}
                required
                placeholder="Enter HSN code"
                className="w-full px-4 py-2 rounded outline-none border border-gray-200 
                       focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                       transition-colors duration-200"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-end">
              <button
                type="submit"
                className="w-full py-2 px-6 rounded bg-blue-600 text-white outline-none font-medium
                       hover:bg-blue-700 focus:ring-4 focus:ring-gray-200
                       transition-colors duration-200"
              >
                Add HSN Code
              </button>
            </div>
          </form>
        </div>

        {/* HSN Codes List */}
        <div className="bg-white rounded border p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-8">
            HSN Codes List
          </h2>

          <div className="overflow-hidden rounded border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full overflow-x-auto">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider w-20">
                      No.
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      HSN Code
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {hsnCodes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-8 text-gray-500"
                      >
                        No HSN codes found
                      </td>
                    </tr>
                  ) : (
                    hsnCodes.map((hsn, index) => (
                      <tr
                        key={hsn._id}
                        className="hover:bg-gray-50/50 transition-colors duration-150"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-700">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {hsn.categoryName}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-mono">
                          {hsn.hsnCode}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHsnCode;
