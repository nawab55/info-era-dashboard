import { useEffect, useState } from "react";
import { FaSpinner, FaEye } from "react-icons/fa";
import api from "../../../config/api";
import { uid } from "uid";
import ComplainModal from "./ComplainModal";
import { toast } from "react-toastify";

const Complain = () => {
  const [tokenId] = useState(uid(12)); // Generating a unique 12-digit Token ID
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [formData, setFormData] = useState({
    complainTitle: "",
    description: "",
    complainFile: null,
  });

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const response = await api.get("/api/complains/get-all/cuctomer-complain", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("customerToken")}`,
          },
        });
        setComplains(response.data.complains || []);
      } catch (error) {
        console.error("Error fetching complains", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplains();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerToken = sessionStorage.getItem("customerToken");

    const formDataToSend = new FormData();
    formDataToSend.append("tokenId", tokenId);
    formDataToSend.append("complainTitle", formData.complainTitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("complainFile", formData.complainFile);

    try {
      await api.post("/api/complains/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${customerToken}`,
        },
      });
      toast.success("Complain submitted successfully!");
      setFormData({
        complainTitle: "",
        description: "",
        complainFile: null,
      });
      setComplains((prev) => [...prev, { tokenId, ...formData }]);
    } catch (error) {
      toast.error("Failed to submit complain. Please try again.");
    }
  };

  const openComplainModal = (complain) => {
    setSelectedComplain(complain);
  };

  const closeComplainModal = () => {
    setSelectedComplain(null);
  };

  return (
    <section className="flex-1 bg-gradient-to-br from-gray-50 to-gray-200 p-4 rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 shadow-lg rounded-tl rounded-tr text-white flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Submit a Complain</h1>
        <div className="text-sm md:text-base">
          Token ID: <span className="font-semibold">{tokenId}</span>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 mt-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Complain Title
            </label>
            <input
              type="text"
              name="complainTitle"
              value={formData.complainTitle}
              onChange={handleChange}
              placeholder="Enter complain title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Attach Photo
            </label>
            <input
              type="file"
              name="complainFile"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your issue"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </form>

      {/* Complains List */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Your Complains</h2>
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <FaSpinner className="animate-spin text-blue-500" size={24} />
          </div>
        ) : complains.length > 0 ? (
          <table className="w-full table-auto bg-white rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Complain ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {complains.map((comp, index) => (
                <tr
                  key={comp.tokenId}
                  className={`hover:bg-blue-100 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-6 py-3 text-gray-700">{comp.tokenId}</td>
                  <td className="px-6 py-3 text-gray-700">{comp.complainTitle}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => openComplainModal(comp)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">No complains found.</p>
        )}
      </div>

      {/* Complain Modal */}
      {selectedComplain && (
        <ComplainModal complain={selectedComplain} onClose={closeComplainModal} />
      )}
    </section>
  );
};

export default Complain;
