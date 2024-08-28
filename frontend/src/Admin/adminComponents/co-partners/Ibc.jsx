import { useEffect, useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const Ibc = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    aadhaar: "",
    pan: "",
    gst: "",
    email: "",
    mobile: "",
    state: "",
    district: "",
  });
  const [ibcList, setIbcList] = useState([]);

  // List of Indian states in alphabetical order
  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/co-partners/ibc/register",
        formData
      );
      console.log("Form submitted", response.data);
      toast.success("Form Submitted");
      setFormData({
        name: "",
        gender: "male",
        aadhaar: "",
        pan: "",
        gst: "",
        email: "",
        mobile: "",
        state: "",
        district: "",
      });
      fetchIbcList();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // Fetch all IBC registrations
  const fetchIbcList = async () => {
    try {
      const response = await api.get("/api/co-partners/ibc/all");
      setIbcList(response.data);
    } catch (error) {
      console.error("Error fetching IBC data", error);
    }
  };

  useEffect(() => {
    fetchIbcList();
  }, []);

  const handleDelete = () => {

  }

  return (
    <section className="md:ml-60 bg-inherit p-4 -mt-4">
      <div
        className="max-w-full overflow-y-auto bg-white p-8 mx-4 rounded-lg shadow-md"
        style={{ height: "600px", border: "1px solid white" }}
      >
        <h2 className="text-center text-xl font-semibold text-blue-700 mb-4 uppercase">
          Become an IBC (Individual Business Consultant)
        </h2>
        <h3 className="text-center text-5xl font-bold text-custom-blue mb-6">
          IBC Registration Form
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter Mobile"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Aadhaar No.</label>
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter Aadhaar No."
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">PAN</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter PAN"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">
                GST (If available)
              </label>
              <input
                type="text"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md  font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter GST (If available)"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Select State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-semibold leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                required
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter District"
                required
              />
            </div>
          </div>

          <div className="col-span-full flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition-transform duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Table to display IBC data */}
        <div className="mt-8 overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4">Applied IBC</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-slate-300">
              <tr>
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Aadhaar</th>
                <th className="px-4 py-2 border">PAN</th>
                <th className="px-4 py-2 border">GST</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">State</th>
                <th className="px-4 py-2 border">District</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {ibcList.length > 0 ? (
                ibcList.map((ibc, index) => (
                  <tr
                    key={ibc._id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border text-start text-nowrap">{ibc.name}</td>
                    <td className="px-4 py-2 border">{ibc.gender}</td>
                    <td className="px-4 py-2 border">{ibc.aadhaar}</td>
                    <td className="px-4 py-2 border">{ibc.pan}</td>
                    <td className="px-4 py-2 border">{ibc.gst}</td>
                    <td className="px-4 py-2 border">{ibc.email}</td>
                    <td className="px-4 py-2 border">{ibc.mobile}</td>
                    <td className="px-4 py-2 border">{ibc.state}</td>
                    <td className="px-4 py-2 border">{ibc.district}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleDelete(ibc._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transform hover:-translate-y-1 transition-transform duration-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No IBCs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Ibc;
