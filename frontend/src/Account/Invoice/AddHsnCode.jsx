/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pencil, Trash2, X, Loader2 } from "lucide-react";
import api from "../../config/api";

const AddHsnCode = () => {
  const [hsnFormData, setHsnFormData] = useState({
    categoryName: "",
    hsnCode: "",
    _id: null
  });
  const [categories, setCategories] = useState([]);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHsnCode, setSelectedHsnCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const itemsPerPage = 10;

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

  const resetForm = () => {
    setHsnFormData({ categoryName: "", hsnCode: "", _id: null });
    setIsEditMode(false); // Reset edit mode when resetting the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const response = await api.put(
          `api/product/hsncode/${hsnFormData._id}`,
          hsnFormData
        );
        setHsnCodes((prevCodes) =>
          prevCodes.map((code) =>
            code._id === hsnFormData._id ? response.data.updatedHsnCode : code
          )
        );
        toast.success("HSN code updated successfully");
      } else {
        const response = await api.post("api/product/hsncode", hsnFormData);
        setHsnCodes((prevCodes) => [...prevCodes, response.data.savedHsnCode]);
        toast.success("HSN code added successfully");
      }
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        isEditMode ? "Error updating HSN code" : "Error adding HSN code"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (hsn) => {
    setHsnFormData({
      categoryName: hsn.categoryName,
      hsnCode: hsn.hsnCode,
      _id: hsn._id
    });
    setIsEditMode(true); // Set edit mode to true when editing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`api/product/hsncode/${selectedHsnCode._id}`);
      setHsnCodes((prevCodes) =>
        prevCodes.filter((code) => code._id !== selectedHsnCode._id)
      );
      toast.success("HSN code deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting HSN code:", error);
      toast.error("Error deleting HSN code");
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

  const paginatedHsnCodes = hsnCodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(hsnCodes.length / itemsPerPage);

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
          Are you sure you want to delete HSN code &quot;
          {selectedHsnCode?.hsnCode}&quot;? This action cannot be undone.
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
            {isEditMode ? "Edit HSN Code" : "Add HSN Code"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[1fr,1fr,auto]"
          >
            {/* Category Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-full px-4 py-2 text-left transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:outline-none"
                >
                  <span
                    className={
                      !hsnFormData.categoryName
                        ? "text-gray-400"
                        : "text-gray-700"
                    }
                  >
                    {hsnFormData.categoryName || "Select Category"}
                  </span>
                  <svg
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 
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
                  <div className="absolute z-10 w-full mt-2 overflow-hidden overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-60">
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        type="button"
                        onClick={() =>
                          handleSelectCategory(category.categoryName)
                        }
                        className="w-full px-4 py-2.5 text-left text-gray-700 transition-colors duration-150 hover:bg-blue-50"
                      >
                        {category.categoryName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* HSN Code Input */}
            <div className="space-y-2">
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
                className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
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
                    <span>{isEditMode ? "Updating..." : "Submitting..."}</span>
                  </>
                ) : (
                  <span>{isEditMode ? "Update" : "Submit"}</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="p-6 bg-white border rounded-lg shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            HSN Codes List
          </h2>

          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="w-16 px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
                      No.
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
                      HSN Code
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-right text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedHsnCodes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-gray-500"
                      >
                        No HSN codes found
                      </td>
                    </tr>
                  ) : (
                    paginatedHsnCodes.map((hsn, index) => (
                      <tr
                        key={hsn._id}
                        className="transition-colors duration-150 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {hsn.categoryName}
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-gray-700">
                          {hsn.hsnCode}
                        </td>
                        <td className="px-6 py-4 space-x-2 text-sm text-right">
                          <button
                            onClick={() => handleEdit(hsn)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-blue-700 transition-colors bg-blue-100 rounded hover:bg-blue-200"
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedHsnCode(hsn);
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

export default AddHsnCode;

// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import api from "../../config/api";

// const AddHsnCode = () => {
//   const [hsnFormData, setHsnFormData] = useState({
//     categoryName: "",
//     hsnCode: ""
//   });
//   const [categories, setCategories] = useState([]);
//   const [hsnCodes, setHsnCodes] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [totalItems, setTotalItems] = useState(0);

//   const resetForm = () => {
//     setHsnFormData({ categoryName: "", hsnCode: "" });
//     setIsEditing(false);
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSelectCategory = (categoryName) => {
//     setHsnFormData({ ...hsnFormData, categoryName });
//     setIsOpen(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setHsnFormData({ ...hsnFormData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `api/product/hsncode/${hsnFormData._id}`,
//           hsnFormData
//         );
//         setHsnCodes((prevCodes) =>
//           prevCodes.map((code) =>
//             code._id === hsnFormData._id ? response.data.updatedHsnCode : code
//           )
//         );
//         toast.success("HSN code updated successfully");
//       } else {
//         const response = await api.post("api/product/hsncode", hsnFormData);
//         setHsnCodes((prevCodes) => [...prevCodes, response.data.savedHsnCode]);
//         toast.success("HSN code added successfully");
//       }
//       resetForm();
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "An error occurred";
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setHsnFormData({
//       _id: item._id,
//       categoryName: item.categoryName,
//       hsnCode: item.hsnCode
//     });
//     setIsEditing(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this HSN code?"))
//       return;

//     try {
//       await api.delete(`api/product/hsncode/${id}`);
//       setHsnCodes((prevCodes) => prevCodes.filter((code) => code._id !== id));
//       toast.success("HSN code deleted successfully");
//     } catch (error) {
//       toast.error("Error deleting HSN code");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get("api/product/categories");
//       setCategories(response.data.categories);
//     } catch (error) {
//       toast.error("Error fetching categories");
//     }
//   };

//   const fetchHsnCodes = async () => {
//     try {
//       const response = await api.get(
//         `api/product/hsncodes?page=${currentPage}&limit=${itemsPerPage}`
//       );
//       setHsnCodes(response.data.hsnCodes);
//       setTotalItems(response.data.total);
//     } catch (error) {
//       toast.error("Error fetching HSN codes");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     fetchHsnCodes();
//   }, [currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   return (
//     <div className="flex-1 max-w-full min-h-screen p-4 bg-gray-50/50 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Add/Edit HSN Code Form */}
//         <div className="p-6 bg-white rounded-lg shadow-sm sm:p-8">
//           <h2 className="mb-8 text-xl font-semibold text-gray-800">
//             {isEditing ? "Edit HSN Code" : "Add HSN Code"}
//           </h2>

//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-6 lg:flex-row"
//           >
//             {/* Category Dropdown */}
//             <div className="flex-1 space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Category Name <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={toggleDropdown}
//                   className="w-full px-4 py-2.5 text-left bg-white rounded-md outline-none ring-1 ring-gray-200
//                          focus:ring-2 focus:ring-blue-500 hover:ring-gray-300
//                          transition-all duration-200 flex items-center justify-between"
//                 >
//                   <span
//                     className={
//                       !hsnFormData.categoryName
//                         ? "text-gray-400"
//                         : "text-gray-700"
//                     }
//                   >
//                     {hsnFormData.categoryName || "Select Category"}
//                   </span>
//                   <svg
//                     className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
//                       isOpen ? "rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {isOpen && (
//                   <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
//                     <div className="py-1 overflow-y-auto max-h-60">
//                       {categories.map((category) => (
//                         <button
//                           key={category._id}
//                           type="button"
//                           onClick={() =>
//                             handleSelectCategory(category.categoryName)
//                           }
//                           className="w-full px-4 py-2.5 text-left hover:bg-blue-50 text-gray-700 text-sm
//                                    transition-colors duration-150"
//                         >
//                           {category.categoryName}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* HSN Code Input */}
//             <div className="flex-1 space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 HSN Code <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="hsnCode"
//                 value={hsnFormData.hsnCode}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter HSN code"
//                 className="w-full px-4 py-2.5 rounded-md outline-none ring-1 ring-gray-200
//                        focus:ring-2 focus:ring-blue-500 hover:ring-gray-300
//                        transition-all duration-200"
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-end space-x-3">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-2.5 rounded-md bg-blue-600 text-white font-medium
//                        hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20
//                        transition-colors duration-200 disabled:opacity-70 min-w-[120px]"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="w-5 h-5 mr-2 animate-spin"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     {isEditing ? "Updating..." : "Submitting..."}
//                   </span>
//                 ) : isEditing ? (
//                   "Update"
//                 ) : (
//                   "Submit"
//                 )}
//               </button>
//               {isEditing && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-6 py-2.5 rounded-md bg-gray-100 text-gray-700 font-medium
//                          hover:bg-gray-200 focus:ring-4 focus:ring-gray-200
//                          transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* HSN Codes List */}
//         <div className="p-6 bg-white rounded-lg shadow-sm sm:p-8">
//           <h2 className="mb-8 text-xl font-semibold text-gray-800">
//             HSN Codes List
//           </h2>

//           <div className="overflow-hidden rounded-lg ring-1 ring-gray-200">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="w-20 px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
//                       No.
//                     </th>
//                     <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
//                       Category
//                     </th>
//                     <th className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-600 uppercase">
//                       HSN Code
//                     </th>
//                     <th className="px-6 py-4 text-sm font-semibold tracking-wider text-right text-gray-600 uppercase">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {hsnCodes.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="py-8 text-center text-gray-500"
//                       >
//                         No HSN codes found
//                       </td>
//                     </tr>
//                   ) : (
//                     hsnCodes.map((hsn, index) => (
//                       <tr
//                         key={hsn._id}
//                         className="transition-colors duration-150 hover:bg-gray-50/50"
//                       >
//                         <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                           {(currentPage - 1) * itemsPerPage + index + 1}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-700">
//                           {hsn.categoryName}
//                         </td>
//                         <td className="px-6 py-4 font-mono text-sm text-gray-700">
//                           {hsn.hsnCode}
//                         </td>
//                         <td className="px-6 py-4 space-x-3 text-sm text-right">
//                           <button
//                             onClick={() => handleEdit(hsn)}
//                             className="font-medium text-blue-600 hover:text-blue-700"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(hsn._id)}
//                             className="font-medium text-red-600 hover:text-red-700"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between mt-6">
//               <div className="text-sm text-gray-500">
//                 Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                 {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
//                 {totalItems} entries
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 text-gray-700 transition-colors duration-200 bg-white rounded-md ring-1 ring-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 text-gray-700 transition-colors duration-200 bg-white rounded-md ring-1 ring-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddHsnCode;
