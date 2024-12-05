import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
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
} from "react-icons/fi";

const Domain = () => {
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
    renewableAmount: "",
  });
  // const [domains, setDomains] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to the backend to store it in the database
    try {
      const response = await api.post("/api/domain/create", formData);
      console.log("Domain added:", response.data);
      toast.success("Data added successfully");
      fetchDomains(); // Refresh the list of domains
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
        renewableAmount: "",
      });
    } catch (error) {
      console.error("Error adding domain:", error);
    }
  };

  const fetchDomains = async () => {
    try {
      const response = await api.get("/api/domain/get");
      console.log(response.data);

      // setDomains(response.data.domains);
      // console.log(domains);
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const inputFields = [
    { name: "domainName", label: "Domain Name", type: "text", icon: FiGlobe },
    {
      name: "purchaseDate",
      label: "Domain Purchase Date",
      type: "date",
      icon: FiCalendar,
    },
    {
      name: "expiryDate",
      label: "Domain Expiry Date",
      type: "date",
      icon: FiCalendar,
    },
    {
      name: "hosting",
      label: "Hosting",
      type: "select",
      icon: FiServer,
      options: ["Yes", "No"],
    },
    {
      name: "ssl",
      label: "SSL",
      type: "select",
      icon: FiShield,
      options: ["Yes", "No"],
    },
    {
      name: "customerName",
      label: "Customer Name",
      type: "text",
      icon: FiUser,
    },
    {
      name: "customerMobile",
      label: "Customer Mobile",
      type: "tel",
      icon: FiPhone,
    },
    {
      name: "whatsappNumber",
      label: "WhatsApp Number",
      type: "tel",
      icon: FiPhone,
    },
    { name: "email", label: "Email", type: "email", icon: FiMail },
    { name: "address", label: "Address", type: "text", icon: FiMapPin },
    {
      name: "renewableAmount",
      label: "Renewable Amount",
      type: "number",
      icon: FiDollarSign,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br flex-1 from-blue-50 to-indigo-100 lg:p-4 p-2 font-sans">
      <div className=" mx-auto">
        <div className="flex justify-center mb-6">
          <h1
            id="header"
            className="p-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700 text-2xl"
          >
            Domain Management
          </h1>
        </div>
        <form
          className="bg-white rounded border overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="lg:p-8 p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <field.icon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    {field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 p-3 text-base border-gray-300 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                        className="block w-full pl-10 pr-3 p-3 text-base border-gray-300 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Domain;
