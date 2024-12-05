import React from "react";
import { toast } from "react-toastify";
import api from "../../config/api";

const CustomerForm = () => {
  const [formData, setFormData] = React.useState({
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
  const [modalOpen, setModalOpen] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState(null);

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
    <div className="flex-1 bg-gray-50 lg:p-6 p-2 min-h-screen">
      <div className="mx-auto bg-white rounded border border-gray-100 lg:p-8 p-4">
        <div className="flex justify-center mb-6">
          <h1
            id="header"
            className="p-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700 text-2xl"
          >
            Customer Details
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-4 py-3 border border-gray-200 rounded bg-gray-50 focus:bg-white transition-all duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer"
                accept="image/*"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded hover:bg-blue-600 transition duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
                      <span className="text-gray-800 mt-1">{value}</span>
                    </div>
                  ) : (
                    value && (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">
                          Profile Image
                        </span>
                        <img
                          src={URL.createObjectURL(value)}
                          alt="Profile"
                          className="mt-2 h-24 w-24 object-cover rounded"
                        />
                      </div>
                    )
                  )
                )}
              </div>
            )}

            <button
              className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-200 font-medium"
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
