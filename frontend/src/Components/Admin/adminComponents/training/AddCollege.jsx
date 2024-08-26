import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/api";

const AddCollege = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeCode: "",
    address: "",
    website: "",
    mobileNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        
      const response = await api.post("/api/college/create-colleges", formData);
      console.log("College added successfully:", response.data);
      toast.success("College Details added successfully..")
      // Handle success (e.g., show a success message, reset form)
    } catch (error) {
      console.error("There was an error adding the college:", error);
    }
  };

  return (
    <section className=" md:ml-60 bg-inherit p-4 pb-24">
      <div className="max-w-full bg-white p-8 mx-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">Add College</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center mb-4">
            <label className="w-1/6 text-gray-700 text-lg">College Name</label>
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              className="block w-2/5 px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 focus:placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/6 text-gray-700 text-lg">College Code</label>
            <input
              type="text"
              name="collegeCode"
              placeholder="College Code"
              value={formData.collegeCode}
              onChange={handleChange}
              className="block w-2/5 px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 focus:placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/6 text-gray-700 text-lg">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="block w-2/5 px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 focus:placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/6 text-gray-700 text-lg">Website</label>
            <input
              type="text"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              className="block w-2/5 px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 focus:placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/6 text-gray-700 text-lg">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile No"
              value={formData.mobileNo}
              onChange={handleChange}
              className="block w-2/5 px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 focus:placeholder:translate-x-1 transition-all focus:duration-150 ease-in-out"
            />
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition-transform duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCollege;
