import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("api/product/categories", categoryData);
      toast.success("Category added successfully");
      setCategoryData({ categoryName: "" });
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Error adding category");
    } finally {
      setIsSubmitting(false);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex-1 bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Add Category Form */}
        <div className="bg-white rounded border p-6 sm:p-8 transition-all duration-300 ">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Add Product Category
          </h2>

          <form onSubmit={handleSubmit} className="flex items-end gap-2 mx-auto">
            <div className="space-y-2 flex-1">
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={categoryData.categoryName}
                onChange={handleChange}
                required
                placeholder="Enter category name"
                className="w-full px-4 py-2 rounded outline-none border border-gray-300  focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-6 rounded bg-blue-600 text-white font-medium
                       hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 
                       transition-all duration-200 transform 
                       disabled:opacity-70 disabled:cursor-not-allowed "
              >
                {isSubmitting ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded border p-6 sm:p-8 transition-all duration-300 ">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categories List
          </h2>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider w-24">
                      No.
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Category Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.length === 0 ? (
                    <tr>
                      <td
                        colSpan={2}
                        className="text-center py-8 text-gray-500"
                      >
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    categories.map((category, index) => (
                      <tr
                        key={category._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-700">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {category.categoryName}
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

export default AddCategory;
