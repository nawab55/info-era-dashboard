import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";


const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/product/categories', categoryData);
      console.log('Category added:', response.data);
      toast.success("Category added successfully");
      setCategoryData({ categoryName: "" });
      fetchCategories(); // Fetch the updated list of categories
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error("Error adding category");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('api/product/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="p-4 md:ml-48 bg-blue-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col mb-6">
          <h1 className="text-3xl font-bold mb-6 pb-2 text-center uppercase border-b border-gray-300">
            Add Product Category
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Category Name:
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="categoryName"
              value={categoryData.categoryName}
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center uppercase border-b border-gray-300">
            Categories List
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {categories.map((category, index) => (
                  <tr key={category._id}>
                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-sm text-gray-700">
                      {category.categoryName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
