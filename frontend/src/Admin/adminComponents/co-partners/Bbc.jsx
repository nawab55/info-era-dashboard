import { useEffect, useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const Bbc = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    gender: "male",
    aadhaar: "",
    pan: "",
    gst: "",
    email: "",
    mobile: "",
    state: "",
    district: "",
  });
  const [bbcList, setBbcList] = useState([]);

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
      const response = await api.post("/api/co-partners/bbc/register", formData);
      console.log("Form submitted", response.data);
      toast.success("Form Submitted");
      setFormData({
        name: "",
        company: "",
        gender: "male",
        aadhaar: "",
        pan: "",
        gst: "",
        email: "",
        mobile: "",
        state: "",
        district: "",
      });
      fetchBbcList();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // Fetch all BBC registrations
  const fetchBbcList = async () => {
    try {
      const response = await api.get("/api/co-partners/bbc/all");
      setBbcList(response.data);
    } catch (error) {
      console.error("Error fetching BBC data", error);
    }
  };

  useEffect(() => {
    fetchBbcList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/co-partners/bbc/delete/${id}`);
      toast.success("Deleted Successfully");
      fetchBbcList();
    } catch (error) {
      console.error("Error deleting BBC data", error);
      toast.error("Error Deleting");
    }
  };

  return (
    <section className="md:ml-60 bg-inherit p-4 -mt-4">
      <div
        className="max-w-full overflow-y-auto bg-white p-8 mx-4 rounded-lg shadow-md"
        style={{ height: "600px", border: "1px solid white" }}
      >
        <h2 className="text-center text-xl font-semibold text-blue-700 mb-4 uppercase">
          Become a BBC (Business Business Consultant)
        </h2>
        <h3 className="text-center text-5xl font-bold text-custom-blue mb-6">
          BBC Registration Form
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
              <label className="text-gray-700 text-lg mb-2">
                Company/Organization Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                placeholder="Enter Company/Organization Name"
                required
              />
            </div>

            {/* Other input fields similar to the IBC component */}

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
                <option value="">-- Select State --</option>
                {states.map((state) => (
                  <option key={state} value={state}>
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

            <div className="flex flex-col">
              <label className="text-gray-700 text-lg mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md font-semibold leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200">S.No</th>
                <th className="px-4 py-2 border border-gray-200">Name</th>
                <th className="px-4 py-2 border border-gray-200">
                  Company/Organization
                </th>
                <th className="px-4 py-2 border border-gray-200">Aadhaar</th>
                <th className="px-4 py-2 border border-gray-200">PAN</th>
                <th className="px-4 py-2 border border-gray-200">GST</th>
                <th className="px-4 py-2 border border-gray-200">Mobile</th>
                <th className="px-4 py-2 border border-gray-200">State</th>
                <th className="px-4 py-2 border border-gray-200">District</th>
                <th className="px-4 py-2 border border-gray-200">Email</th>
                <th className="px-4 py-2 border border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bbcList.map((bbc, index) => (
                <tr key={bbc._id} className="text-start hover:bg-blue-200 text-nowrap">
                  <td className="border border-gray-200 px-4 py-2">{index+1}</td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.name}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.company}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.aadhaar}</td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.pan}</td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.gst}</td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.mobile}</td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.state}</td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.district}</td>
                  <td className="border border-gray-200 px-4 py-2">{bbc.email}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleDelete(bbc._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-150 ease-in-out"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Bbc;
