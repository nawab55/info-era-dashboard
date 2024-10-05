import { useEffect, useState } from "react";
import { uid } from "uid"; 
import api from "../../../config/api";
import { toast } from "react-toastify";
import ComplainModal from "./ComplainModal";

const Complain = () => {
  const [tokenId] = useState(uid(12)); // Generating a unique 12-digit Token ID
  const [complain, setComplain] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState(null);  // Store selected complain for modal
  const [formData, setFormData] = useState({
    complainTitle: "",
    description: "",
    complainFile: null,
  });

  useEffect(() => {
    // Fetch all complains from the backend
    const fetchComplains = async () => {
      try {
        const res = await api.get("/api/complains/get-all/cuctomer-complain", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('customerToken')}`
          }
        });
        setComplain(res.data.complains);
      } catch (error) {
        console.error("Error fetching complains", error);
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
  // alternative another way to write handle change method
  // const handleChange = (e) => {
  //   const fieldName = e.target.name;
  //   const newValue = e.target.type === 'file' ? e.target.files[0] : e.target.value;
  //   setFormData({
  //     ...formData,
  //     [fieldName]: newValue,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Retrieve customerToken and clientId from session storage
  const customerToken = sessionStorage.getItem('customerToken');
  // const clientId = sessionStorage.getItem('clientId'); 
    
    const formDataToSend = new FormData();
    formDataToSend.append("tokenId", tokenId);
    formDataToSend.append("complainTitle", formData.complainTitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("complainFile", formData.complainFile);

    try {
        await api.post("/api/complains/create", formDataToSend, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${customerToken}`,
          // "Client-Id": clientId // Send clientId as a custom header
        },
      });
      toast.success("Complain submitted successfully!");
      setFormData({
        complainTitle: "",
        description: "",
        complainFile: null,
      });
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
    <section className="md:ml-60 bg-inherit px-4 pb-8">
      <div
        className="max-w-full overflow-x-auto bg-white p-6 mx-4 rounded-lg shadow-md"
        style={{ height: "500px", border: "1px solid white" }}
      >
        <h2 className="text-2xl font-bold text-gray-500 mb-6">Request a Complain</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Token Id */}
            <div>
              <label className="block text-gray-500 font-semibold mb-2">Token ID</label>
              <input
                type="text"
                value={tokenId}
                readOnly
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            {/* Complain Title */}
            <div>
              <label className="block text-gray-500 font-semibold mb-2">Complain Title</label>
              <input
                type="text"
                name="complainTitle"
                placeholder="Enter your complain title"
                value={formData.complainTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-gray-500 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your issue"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            ></textarea>
          </div>
          {/* Attach Photo */}
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-semibold mb-2">Attach Photo</label>
            <input
              type="file"
              name="complainFile"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md file:bg-blue-500 file:text-white file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:hover:bg-blue-600 file:transition-all"
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
         {/* Complain List */}
        <div className="shadow-md p-2 mt-6">
        <h2 className="text-2xl font-bold text-gray-500  ml-4">Complains List</h2>
        <table className="table-auto w-full mt-4  bg-gray-100">
          <thead>
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Complain ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {complain.map((comp, index) => (
              <tr key={comp.tokenId}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{comp.tokenId}</td>
                <td className="border px-4 py-2">{comp.complainTitle}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center justify-center">
                  <button
                    onClick={() => openComplainModal(comp)}
                    className="px-4 py-1 bg-blue-500 text-white  rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>
      {/* Complain Modal */}
      {selectedComplain && <ComplainModal complain={selectedComplain} onClose={closeComplainModal} />}
    </section>
  );
};

export default Complain;
