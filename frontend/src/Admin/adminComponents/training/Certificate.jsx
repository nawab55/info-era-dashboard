import { useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const Certificate = () => {
  const [formData, setFormData] = useState({
    year: "",
    collegeName: "",
    regNo: "",
    studentName: "",
    projectName: "",
    language: "",
    toDate: "",
    fromDate: "",
    payment: "",
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
      const response = await api.post("/api/certificate/create-certificate", formData);
      toast.success("Certificate data Generated successfully")
      console.log("Certificate added successfully:", response.data);
      // Handle success (e.g., show a success message, reset form)
    } catch (error) {
      console.error("There was an error adding the certificate:", error);
    }
  };

  const styles = {
    height: "600px",
    color: 'green',
    border: '1px solid white',
};

  return (
    <section className="md:ml-60 bg-inherit p-4">
      <div className="max-w-full overflow-y-auto bg-white p-8 mx-4 rounded-lg shadow-md" style={styles}>
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">Add Certificate</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Year</label>
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">College Name</label>
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Reg No</label>
            <input
              type="text"
              name="regNo"
              placeholder="Registration No"
              value={formData.regNo}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Student Name</label>
            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Language</label>
            <input
              type="text"
              name="language"
              placeholder="Language"
              value={formData.language}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Payment</label>
            <input
              type="text"
              name="payment"
              placeholder="Payment"
              value={formData.payment}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile No"
              value={formData.mobileNo}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
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
      </div>
    </section>
  );
};

export default Certificate;
