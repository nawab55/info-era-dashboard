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

  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted customer data

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({
        ...formData,
        [name]: files[0], // handle file input
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateMobileNumber = (mobile) => {
    // Regular expression to check if the mobile number is 10 digits, with an optional country code
    const mobileWithCountryCodePattern = /^(\+\d{1,3})?\d{10}$/;
    return mobileWithCountryCodePattern.test(mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the mobile number before submitting the form
    if (!validateMobileNumber(formData.mobile)) {
      toast.error(
        "Please enter a valid mobile number. It should be 10 digits long, with an optional country code."
      );
      return;
    }

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

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-200 p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl md:ml-48">
          <h2 className="text-2xl font-bold mb-6 text-center uppercase">
            Customer Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email Id
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="mobile">
                  Mobile No.
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="gstNo">
                  GST No.
                </label>
                <input
                  type="text"
                  name="gstNo"
                  id="gstNo"
                  value={formData.gstNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="gstName">
                  GST Name
                </label>
                <input
                  type="text"
                  name="gstName"
                  id="gstName"
                  value={formData.gstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="dob">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="gstName">
                  Aadhar No:
                </label>
                <input
                  type="text"
                  name="aadharNo"
                  id="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="profileImage"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md file:bg-blue-500 file:text-white file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:hover:bg-blue-600 file:transition-all"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-custom-blue text-white py-3 px-8 rounded-md hover:bg-custom-hover-blue transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Modal for showing submitted data */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white mt-8 p-8 rounded-lg shadow-md max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Customer Details
              </h2>
              {submittedData && (
                <div className="space-y-2">
                  <p>
                    <strong className="text-blue-500 mr-2">Name:</strong>{" "}
                    <span className="text-gray-600">{submittedData.name}</span>
                  </p>
                  <p>
                    <strong className="text-blue-500 mr-2">Email:</strong>{" "}
                    <span className="text-gray-600">{submittedData.email}</span>
                  </p>
                  <p>
                    <strong className="text-blue-500 mr-2">Mobile:</strong>{" "}
                    <span className="text-gray-600">
                      {submittedData.mobile}
                    </span>
                  </p>
                  <p>
                    <strong className="text-blue-500 mr-2">Address:</strong>{" "}
                    <span className="text-gray-600">
                      {submittedData.address}
                    </span>
                  </p>
                  <p>
                    <strong className="text-blue-500 mr-2">GST No.:</strong>{" "}
                    <span className="text-gray-600">{submittedData.gstNo}</span>
                  </p>
                  <p>
                    <strong className="text-blue-500 mr-2">GST Name:</strong>{" "}
                    <span className="text-gray-600">
                      {submittedData.gstName}
                    </span>
                  </p>
                  <p>
                    <strong className="text-blue-500 mr-2">
                      Date of Birth:
                    </strong>{" "}
                    <span className="text-gray-600">{submittedData.dob}</span>
                  </p>
                  <p>
                    <strong className="text-blue-500 mr-2">Aadhar No:</strong>{" "}
                    <span className="text-gray-600">
                      {submittedData.aadharNo}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <strong className="text-blue-500 mr-2">
                      Profile Image:
                    </strong>
                    <img
                      src={submittedData.profileImage}
                      alt="Profile"
                      className="ml-2 max-h-20 object-cover rounded"
                    />
                  </div>
                </div>
              )}

              <button
                className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 w-full"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerForm;
