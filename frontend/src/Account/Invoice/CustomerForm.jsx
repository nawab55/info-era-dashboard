import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    gstNo: "",
    gstName: "",
    dob: "",
    aadharNo: "",
    profileImage: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Validate the mobile number before submitting the form
    // if (!validateMobileNumber(formData.mobile)) {
    //   toast.error(
    //     "Please enter a valid mobile number. It should be 10 digits long, with an optional country code."
    //   );
    //   return;
    // }

    try {
      // Post customer data to API endpoint
      const response = await api.post(
        "/api/customers/createCustomer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Customer Details data submitted successfully");

      // Set submitted customer data to display in modal
      setSubmittedData(response.data.newCustomer);
      console.log(response.data.newCustomer);
      // Open modal after successful submission
      setModalOpen(true);

      // Clear form data
      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
        gstNo: "",
        gstName: "",
        dob: "",
        aadharNo: "",
        profileImage: null,
      });
    } catch (error) {
      console.error("Error posting customer data:", error);
      toast.error("Error submitting customer data");
    }
  };
  const closeModal = () => setModalOpen(false);

  const inputClasses =
    "w-full px-4 py-3 border border-gray-200 rounded bg-gray-50 focus:bg-white transition-all duration-200 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="flex-1 min-h-screen p-2 bg-gray-50 lg:p-6">
      <div className="p-4 mx-auto bg-white border border-gray-100 rounded lg:p-8">
        <div className="flex justify-center mb-6">
          <h1
            id="header"
            className="p-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700"
          >
            Customer Details
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClasses} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="mobile">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={inputClasses}
                required
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="address">
                Address
              </label>
              <textarea
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className={`${inputClasses} min-h-[100px] resize-none`}
                required
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="gstNo">
                GST Number
              </label>
              <input
                type="text"
                name="gstNo"
                id="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                className={inputClasses}
                required
                placeholder="Enter GST number"
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="gstName">
                GST Name
              </label>
              <input
                type="text"
                name="gstName"
                id="gstName"
                value={formData.gstName}
                onChange={handleChange}
                className={inputClasses}
                required
                placeholder="Enter GST name"
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses} htmlFor="aadharNo">
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadharNo"
                id="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                className={inputClasses}
                required
                placeholder="Enter Aadhar number"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses} htmlFor="profileImage">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 rounded outline-none bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer"
                accept="image/*"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 font-medium text-white transition duration-200 bg-blue-500 rounded shadow-sm hover:bg-blue-600 hover:shadow-md"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Submitted Details
            </h2>
            {submittedData && (
              <div className="space-y-4">
                {Object.entries(submittedData).map(([key, value]) =>
                  key !== "profileImage" ? (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="mt-1 text-gray-800">{value}</span>
                    </div>
                  ) : (
                    value && (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">
                          Profile Image
                        </span>
                        <img
                          src={value}
                          alt="Profile"
                          className="object-cover w-24 h-24 mt-2 rounded"
                        />
                      </div>
                    )
                  )
                )}
              </div>
            )}

            <button
              className="w-full px-4 py-3 mt-6 font-medium text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;
