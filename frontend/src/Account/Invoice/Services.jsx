/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { Pencil, Trash2, X, Loader2 } from "lucide-react";
import { FiPackage, FiDollarSign, FiGrid, FiHash } from "react-icons/fi";

const Services = () => {
  const [servicesFormData, setServicesFormData] = useState({
    categoryName: "",
    hsnCode: "",
    service: "",
    amount: ""
  });

  const [hsnCodes, setHsnCodes] = useState([]);
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const itemsPerPage = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      const selectedCategory = hsnCodes.find(
        (data) => data.categoryName === value
      );
      setServicesFormData((prev) => ({
        ...prev,
        [name]: value,
        hsnCode: selectedCategory ? selectedCategory.hsnCode : ""
      }));
    } else {
      setServicesFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setServicesFormData({
      categoryName: "",
      hsnCode: "",
      service: "",
      amount: ""
    });
    setIsEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        // Assuming that `selectedService` contains the service object with _id
        const response = await api.put(
          `api/product/services/${selectedService._id}`,
          servicesFormData
        );
        setServices((prev) =>
          prev.map((service) =>
            service._id === selectedService._id
              ? response.data.updatedService
              : service
          )
        );
        toast.success("Service updated successfully");
      } else {
        const response = await api.post(
          "api/product/services",
          servicesFormData
        );
        setServices((prev) => [...prev, response.data.savedService]);
        toast.success("Service added successfully");
      }
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        isEditMode ? "Error updating service" : "Error adding service"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (service) => {
    setServicesFormData({
      categoryName: service.categoryName,
      hsnCode: service.hsnCode,
      service: service.service,
      amount: service.amount
    });
    setSelectedService(service); // Storing the service to get the _id for update
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`api/product/services/${selectedService._id}`);
      setServices((prev) =>
        prev.filter((service) => service._id !== selectedService._id)
      );
      toast.success("Service deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Error deleting service");
    }
  };

  const fetchHsnCodes = async () => {
    try {
      const response = await api.get("api/product/hsncodes");
      setHsnCodes(response.data.hsnCodes);
    } catch (error) {
      toast.error("Failed to load HSN codes");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("api/product/services");
      setServices(response.data.services);
    } catch (error) {
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchHsnCodes();
    fetchServices();
  }, []);

  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(services.length / itemsPerPage);

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
          Are you sure you want to delete service &quot;
          {selectedService?.service}&quot;? This action cannot be undone.
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
    <div className="flex-1 max-w-full min-h-screen p-2 bg-gradient-to-br from-gray-50 to-gray-100 md:p-4 lg:p-6">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Form Section */}
        <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
          <div className="flex justify-center px-6 py-4 bg-gradient-to-r from-slate-100 to-slate-200">
            <h1 className="p-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700">
              {isEditMode ? "Edit Services" : "Services"}
            </h1>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Category Select */}
                <div className="relative">
                  <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                    <FiGrid className="mr-2" />
                    Category Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <select
                    name="categoryName"
                    value={servicesFormData.categoryName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    {hsnCodes.map((data) => (
                      <option key={data._id} value={data.categoryName}>
                        {data.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* HSN Code Input */}
                <div className="relative">
                  <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                    <FiHash className="mr-2" />
                    HSN Code
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hsnCode"
                    value={servicesFormData.hsnCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter HSN code"
                  />
                </div>

                {/* Service Input */}
                <div className="relative">
                  <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                    <FiPackage className="mr-2" />
                    Service
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={servicesFormData.service}
                    onChange={handleChange}
                    required
                    placeholder="Enter service name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                {/* Amount Input */}
                <div className="relative">
                  <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                    <FiDollarSign className="mr-2" />
                    Amount
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={servicesFormData.amount}
                    onChange={handleChange}
                    required
                    placeholder="Enter amount"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
                           hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 
                           disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isEditMode ? "Updating..." : "Submitting..."}
                    </>
                  ) : isEditMode ? (
                    "Update Service"
                  ) : (
                    "Add Service"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Services List</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600 uppercase">
                    S.No
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600 uppercase">
                    HSN Code
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600 uppercase">
                    Service
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-right text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedServices.map((service, index) => (
                  <tr
                    key={service._id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.categoryName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.hsnCode}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ₹{service.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-blue-700 transition-colors bg-blue-100 rounded hover:bg-blue-200"
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setShowDeleteModal(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 text-red-700 transition-colors bg-red-100 rounded hover:bg-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No services found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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

      {/* Delete Modal */}
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

export default Services;




// import { useState, useEffect } from "react";
// import api from "../../config/api";
// import { toast } from "react-toastify";
// import {
//   // FiPlus,
//   FiPackage,
//   FiDollarSign,
//   FiGrid,
//   FiHash,
// } from "react-icons/fi";

// const Services = () => {
//   const [servicesFormData, setServicesFormData] = useState({
//     categoryName: "",
//     hsnCode: "",
//     service: "",
//     amount: "",
//   });

//   const [hsnCodes, setHsnCodes] = useState([]);
//   const [services, setServices] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "categoryName") {
//       // Find the corresponding HSN code based on the selected category
//       const selectedCategory = hsnCodes.find(
//         (data) => data.categoryName === value
//       );
//       setServicesFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//         hsnCode: selectedCategory ? selectedCategory.hsnCode : "",
//       }));
//     } else {
//       setServicesFormData({ ...servicesFormData, [name]: value });
//       // setServicesFormData((prevState) => ({
//       //   ...prevState,
//       //   [name]: value,
//       // }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("api/product/services", servicesFormData);
//       toast.success("Service added successfully");
//       setServicesFormData({
//         categoryName: "",
//         hsnCode: "",
//         service: "",
//         amount: "",
//       });
//       fetchServices();
//     } catch (error) {
//       console.error("Error adding services data:", error);
//       toast.error("Failed to add service");
//     }
//   };

//   const fetchHsnCodes = async () => {
//     try {
//       const response = await api.get("api/product/hsncodes");
//       setHsnCodes(response.data.hsnCodes);
//     } catch (error) {
//       console.error("Error fetching HSN codes:", error);
//       toast.error("Failed to load HSN codes");
//     }
//   };

//   const fetchServices = async () => {
//     try {
//       const response = await api.get("api/product/services");
//       // console.log(response.data.services);
//       setServices(response.data.services);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//       toast.error("Failed to load services");
//     }
//   };

//   useEffect(() => {
//     fetchHsnCodes();
//     fetchServices();
//   }, []);

//   return (
//     <div className="flex-1 max-w-full min-h-screen p-2 bg-gradient-to-br from-gray-50 to-gray-100 md:p-4 lg:p-6">
//       <div className="mx-auto space-y-8 max-w-7xl">
//         {/* Form Section */}
//         <div className="overflow-hidden bg-white border rounded">
//           <div className="flex justify-center px-6 py-4 bg-gradient-to-r from-slate-100 to-slate-200">
//             <h1
//               id="header"
//               className="p-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700"
//             >
//               Services
//             </h1>
//           </div>

//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid gap-6 md:grid-cols-2">
//                 {/* Category Select */}
//                 <div className="relative">
//                   <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
//                     <FiGrid className="mr-2" />
//                     Category Name
//                     <span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <select
//                     name="categoryName"
//                     value={servicesFormData.categoryName}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
//                   >
//                     <option value="">Select Category</option>
//                     {hsnCodes.map((data) => (
//                       <option key={data._id} value={data.categoryName}>
//                         {data.categoryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* HSN Code Select */}
//                 <div className="relative">
//                   <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
//                     <FiHash className="mr-2" />
//                     HSN Code
//                     <span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     name="hsnCode"
//                     value={servicesFormData.hsnCode}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
//                     placeholder="Enter HSN code"
//                   />
//                 </div>

//                 {/* Service Input */}
//                 <div className="relative">
//                   <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
//                     <FiPackage className="mr-2" />
//                     Service
//                     <span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="service"
//                     value={servicesFormData.service}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter service name"
//                     className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
//                   />
//                 </div>

//                 {/* Amount Input */}
//                 <div className="relative">
//                   <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
//                     <FiDollarSign className="mr-2" />
//                     Amount
//                     <span className="ml-1 text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="amount"
//                     value={servicesFormData.amount}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter amount"
//                     className="w-full px-4 py-2.5 rounded border border-gray-200 focus:border-blue-500 outline-none transition-colors bg-white"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg shadow-blue-500/30"
//                 >
//                   {/* <FiPlus className="mr-2" /> */}
//                   Add Service
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="overflow-hidden bg-white border rounded">
//           <div className="px-6 py-4 border-b border-gray-100">
//             <h2 className="text-xl font-bold text-gray-800">Services List</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full overflow-x-auto">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                     S.No
//                   </th>
//                   <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                     HSN Code
//                   </th>
//                   <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                     Service
//                   </th>
//                   <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                     Amount
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {services.map((service, index) => (
//                   <tr
//                     key={service._id}
//                     className="transition-colors hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
//                       {service.categoryName}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
//                       {service.hsnCode}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
//                       {service.service}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
//                       ₹{service.amount}
//                     </td>
//                   </tr>
//                 ))}
//                 {services.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="px-6 py-4 text-center text-gray-500"
//                     >
//                       No services found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;
