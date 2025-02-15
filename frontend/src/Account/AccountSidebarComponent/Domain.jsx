import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiGlobe,
  FiCalendar,
  FiServer,
  FiShield,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiLoader
} from "react-icons/fi";

const Domain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = location.state?.editMode || false;
  const domainData = location.state?.domainData || null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    domainName: "",
    purchaseDate: "",
    expiryDate: "",
    hosting: "",
    ssl: "",
    customerName: "",
    customerMobile: "",
    whatsappNumber: "",
    email: "",
    address: "",
    renewableAmount: ""
  });
  // const [domains, setDomains] = useState([]);

  useEffect(() => {
    if (editMode && domainData) {
      setFormData(domainData);
    }
  }, [editMode, domainData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editMode) {
        await api.put(`/api/domain/update/${domainData._id}`, formData);
        toast.success("Domain updated successfully");
      } else {
        await api.post("/api/domain/create", formData);
        toast.success("Domain added successfully");
        setFormData({
          domainName: "",
          purchaseDate: "",
          expiryDate: "",
          hosting: "",
          ssl: "",
          customerName: "",
          customerMobile: "",
          whatsappNumber: "",
          email: "",
          address: "",
          renewableAmount: ""
        });
      }

      navigate("/account/domain/report");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        editMode ? "Failed to update domain" : "Failed to add domain"
      );
    } finally {
      setIsSubmitting(false);
    }
    // Send formData to the backend to store it in the database
    // try {
    //   const response = await api.post("/api/domain/create", formData);
    //   console.log("Domain added:", response.data);
    //   toast.success("Data added successfully");
    //   // fetchDomains(); // Refresh the list of domains
    //   setFormData({
    //     domainName: "",
    //     purchaseDate: "",
    //     expiryDate: "",
    //     hosting: "",
    //     ssl: "",
    //     customerName: "",
    //     customerMobile: "",
    //     whatsappNumber: "",
    //     email: "",
    //     address: "",
    //     renewableAmount: "",
    //   });
    // } catch (error) {
    //   console.error("Error adding domain:", error);
    // }
  };

  // const fetchDomains = async () => {
  //   try {
  //     await api.get("/api/domain/get");
  //     // const response = await api.get("/api/domain/get");
  //     // console.log(response.data);

  //     // setDomains(response.data.domains);
  //     // console.log(domains);
  //   } catch (error) {
  //     console.error("Error fetching domains:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDomains();
  // }, []);

  const inputFields = [
    { name: "domainName", label: "Domain Name", type: "text", icon: FiGlobe },
    {
      name: "purchaseDate",
      label: "Domain Purchase Date",
      type: "date",
      icon: FiCalendar
    },
    {
      name: "expiryDate",
      label: "Domain Expiry Date",
      type: "date",
      icon: FiCalendar
    },
    {
      name: "hosting",
      label: "Hosting",
      type: "select",
      icon: FiServer,
      options: ["Yes", "No"]
    },
    {
      name: "ssl",
      label: "SSL",
      type: "select",
      icon: FiShield,
      options: ["Yes", "No"]
    },
    {
      name: "customerName",
      label: "Customer Name",
      type: "text",
      icon: FiUser
    },
    {
      name: "customerMobile",
      label: "Customer Mobile",
      type: "tel",
      icon: FiPhone
    },
    {
      name: "whatsappNumber",
      label: "WhatsApp Number",
      type: "tel",
      icon: FiPhone
    },
    { name: "email", label: "Email", type: "email", icon: FiMail },
    { name: "address", label: "Address", type: "text", icon: FiMapPin },
    {
      name: "renewableAmount",
      label: "Renewable Amount",
      type: "number",
      icon: FiDollarSign
    }
  ];

  return (
    <section className="flex-1 min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {editMode ? "Update Domain" : "Add New Domain"}
          </h1>
          <div className="relative w-48 h-1 mx-auto mt-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-[slide_2s_linear_infinite]" />
          </div>
        </div>

        <form
          className="overflow-hidden bg-white border rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <field.icon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    {field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="block w-full py-2 pl-10 pr-3 text-gray-700 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Select</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option.toLowerCase()}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="block w-full py-2 pl-10 pr-3 text-gray-700 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 text-right bg-gray-50">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-colors border border-transparent rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                  {editMode ? "Updating..." : "Submitting..."}
                </>
              ) : editMode ? (
                "Update Domain"
              ) : (
                "Add Domain"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>

    // <section className="flex-1 min-h-screen p-2 font-sans bg-gradient-to-br from-blue-50 to-indigo-100 lg:p-4">
    //   <div className="mx-auto ">
    //     <div className="flex justify-center mb-6">
    //       <h1
    //         id="header"
    //         className="p-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700"
    //       >
    //         Domain Management
    //       </h1>
    //     </div>
    //     <form
    //       className="overflow-hidden bg-white border rounded"
    //       onSubmit={handleSubmit}
    //     >
    //       <div className="p-4 space-y-6 lg:p-8">
    //         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    //           {inputFields.map((field) => (
    //             <div key={field.name} className="space-y-1">
    //               <label
    //                 htmlFor={field.name}
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 {field.label}
    //               </label>
    //               <div className="relative rounded-md shadow-sm">
    //                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //                   <field.icon
    //                     className="w-5 h-5 text-gray-400"
    //                     aria-hidden="true"
    //                   />
    //                 </div>
    //                 {field.type === "select" ? (
    //                   <select
    //                     id={field.name}
    //                     name={field.name}
    //                     value={formData[field.name]}
    //                     onChange={handleChange}
    //                     className="block w-full p-3 pl-10 pr-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                     required
    //                   >
    //                     <option value="">Select</option>
    //                     {field.options?.map((option) => (
    //                       <option key={option} value={option.toLowerCase()}>
    //                         {option}
    //                       </option>
    //                     ))}
    //                   </select>
    //                 ) : (
    //                   <input
    //                     type={field.type}
    //                     name={field.name}
    //                     id={field.name}
    //                     value={formData[field.name]}
    //                     onChange={handleChange}
    //                     className="block w-full p-3 pl-10 pr-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                     required
    //                   />
    //                 )}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
    //         <button
    //           type="submit"
    //           className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
  );
};

export default Domain;
