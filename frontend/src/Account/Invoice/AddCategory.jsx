/* eslint-disable react/prop-types */

// claidiai
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pencil, Trash2, X, Loader2, Search } from "lucide-react";
import api from "../../config/api";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    _id: null
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (categoryData._id) {
        await api.put(
          `api/product/categories/${categoryData._id}`,
          categoryData
        );
        toast.success("Category updated successfully");
      } else {
        await api.post("api/product/categories", categoryData);
        toast.success("Category added successfully");
      }
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        categoryData._id ? "Error updating category" : "Error adding category"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCategoryData({ categoryName: "", _id: null });
  };

  const handleEdit = (category) => {
    setCategoryData({
      categoryName: category.categoryName,
      _id: category._id
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`api/product/categories/${selectedCategory._id}`);
      toast.success("Category deleted successfully");
      setShowDeleteModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
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

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const DeleteModal = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="max-w-md p-6 mx-4 bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Delete
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete &quot;{selectedCategory?.categoryName}&quot;? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white transition-colors bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Form Section */}
        <div className="p-6 bg-white border rounded-lg shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            {categoryData._id ? "Edit Category" : "Add Category"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid sm:grid-cols-[1fr,auto] gap-4"
          >
            <div className="space-y-2">
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
                className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium
                         hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/50 
                         transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{categoryData._id ? "Update" : "Submit"}</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="p-6 bg-white border rounded-lg shadow-sm sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Categories List
            </h2>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:outline-none"
              />
              <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>

          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="w-16 px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
                      No.
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
                      Category Name
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-right text-gray-600 uppercase ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedCategories.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-8 text-center text-gray-500"
                      >
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    paginatedCategories.map((category, index) => (
                      <tr
                        key={category._id}
                        className="transition-colors duration-150 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {category.categoryName}
                        </td>
                        <td className="px-6 py-4 space-x-2 text-sm text-right">
                          <button
                            onClick={() => handleEdit(category)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-blue-700 transition-colors bg-blue-100 rounded hover:bg-blue-200"
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1 text-red-700 transition-colors bg-red-100 rounded hover:bg-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm text-gray-600 transition-colors bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm text-gray-600 transition-colors bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <DeleteModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default AddCategory;


// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import api from "../../config/api";

// const AddCategory = () => {
//   const [categoryData, setCategoryData] = useState({
//     categoryName: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCategoryData({ ...categoryData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await api.post("api/product/categories", categoryData);
//       toast.success("Category added successfully");
//       setCategoryData({ categoryName: "" });
//       fetchCategories();
//     } catch (error) {
//       console.error("Error adding category:", error);
//       toast.error("Error adding category");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get("api/product/categories");
//       setCategories(response.data.categories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Error fetching categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="flex-1 min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Add Category Form */}
//         <div className="p-6 transition-all duration-300 bg-white border rounded sm:p-8 ">
//           <h2 className="mb-4 text-lg font-semibold text-gray-800">
//             Add Product Category
//           </h2>

//           <form onSubmit={handleSubmit} className="flex items-end gap-2 mx-auto">
//             <div className="flex-1 space-y-2">
//               <label
//                 htmlFor="categoryName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Category Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="categoryName"
//                 name="categoryName"
//                 value={categoryData.categoryName}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter category name"
//                 className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded outline-none focus:border-blue-500"
//               />
//             </div>

//             <div className="mt-6">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full px-6 py-2 font-medium text-white transition-all duration-200 transform bg-blue-600 rounded // hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed "
//               >
//                 {isSubmitting ? "Adding..." : "Add Category"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Categories List */}
//         <div className="p-6 transition-all duration-300 bg-white border rounded sm:p-8 ">
//           <h2 className="mb-4 text-lg font-semibold text-gray-800">
//             Categories List
//           </h2>

//           <div className="overflow-hidden border border-gray-200 rounded-lg">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200 bg-gray-50">
//                     <th className="w-24 px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
//                       No.
//                     </th>
//                     <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
//                       Category Name
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {categories.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={2}
//                         className="py-8 text-center text-gray-500"
//                       >
//                         No categories found
//                       </td>
//                     </tr>
//                   ) : (
//                     categories.map((category, index) => (
//                       <tr
//                         key={category._id}
//                         className="transition-colors duration-150 hover:bg-gray-50"
//                       >
//                         <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                           {index + 1}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-700">
//                           {category.categoryName}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;

// deepseek
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import api from "../../config/api";

// const AddCategory = () => {
//   const [categoryData, setCategoryData] = useState({
//     categoryName: ""
//   });
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);

//   const itemsPerPage = 10;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCategoryData({ ...categoryData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       if (editingCategory) {
//         await api.put(
//           `api/product/categories/${editingCategory._id}`,
//           categoryData
//         );
//         toast.success("Category updated successfully");
//       } else {
//         await api.post("api/product/categories", categoryData);
//         toast.success("Category added successfully");
//       }
//       setCategoryData({ categoryName: "" });
//       setEditingCategory(null);
//       fetchCategories();
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(`Error ${editingCategory ? "updating" : "adding"} category`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get("api/product/categories");
//       setCategories(response.data.categories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Error fetching categories");
//     }
//   };

//   const handleEdit = (category) => {
//     setEditingCategory(category);
//     setCategoryData({ categoryName: category.categoryName });
//   };

//   const handleDelete = (category) => {
//     setCategoryToDelete(category);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await api.delete(`api/product/categories/${categoryToDelete._id}`);
//       toast.success("Category deleted successfully");
//       fetchCategories();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       toast.error("Error deleting category");
//     } finally {
//       setShowDeleteModal(false);
//       setCategoryToDelete(null);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const filteredCategories = categories.filter((category) =>
//     category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedCategories = filteredCategories.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="flex-1 min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Add/Edit Category Form */}
//         <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-lg sm:p-8">
//           <h2 className="mb-6 text-2xl font-bold text-gray-800">
//             {editingCategory ? "Edit Product Category" : "Add Product Category"}
//           </h2>
//           <form onSubmit={handleSubmit} className="flex items-end gap-4">
//             <div className="flex-1">
//               <label
//                 htmlFor="categoryName"
//                 className="block mb-2 text-sm font-medium text-gray-700"
//               >
//                 Category Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="categoryName"
//                 name="categoryName"
//                 value={categoryData.categoryName}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter category name"
//                 className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-6 py-2 font-semibold text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
//                   {editingCategory ? "Updating..." : "Submitting..."}
//                 </div>
//               ) : editingCategory ? (
//                 "Update"
//               ) : (
//                 "Submit"
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Categories List */}
//         <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-lg sm:p-8">
//           <h2 className="mb-6 text-2xl font-bold text-gray-800">
//             Categories List
//           </h2>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Search categories..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//             />
//           </div>
//           <div className="overflow-hidden border border-gray-200 rounded-lg">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
//                 <tr>
//                   <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-white uppercase">
//                     No.
//                   </th>
//                   <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-white uppercase">
//                     Category Name
//                   </th>
//                   <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-white uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {paginatedCategories.length === 0 ? (
//                   <tr>
//                     <td colSpan={3} className="py-8 text-center text-gray-500">
//                       No categories found
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedCategories.map((category, index) => (
//                     <tr
//                       key={category._id}
//                       className="transition-colors duration-150 hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                         {(currentPage - 1) * itemsPerPage + index + 1}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {category.categoryName}
//                       </td>
//                       <td className="flex gap-2 px-6 py-4 text-sm text-gray-700">
//                         <button
//                           onClick={() => handleEdit(category)}
//                           className="px-3 py-1 text-white transition-all duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(category)}
//                           className="px-3 py-1 text-white transition-all duration-200 bg-red-500 rounded-lg hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex items-center justify-between mt-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 text-gray-700 transition-all duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of{" "}
//               {Math.ceil(filteredCategories.length / itemsPerPage)}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(
//                     prev + 1,
//                     Math.ceil(filteredCategories.length / itemsPerPage)
//                   )
//                 )
//               }
//               disabled={
//                 currentPage ===
//                 Math.ceil(filteredCategories.length / itemsPerPage)
//               }
//               className="px-4 py-2 text-gray-700 transition-all duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="p-6 bg-white rounded-lg w-96">
//             <h2 className="mb-4 text-xl font-bold text-gray-800">
//               Confirm Delete
//             </h2>
//             <p className="mb-6 text-gray-700">
//               Are you sure you want to delete the category &quot;
//               {categoryToDelete?.categoryName}&quot;?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 text-gray-700 transition-all duration-200 bg-gray-200 rounded-lg hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 text-white transition-all duration-200 bg-red-500 rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddCategory;


