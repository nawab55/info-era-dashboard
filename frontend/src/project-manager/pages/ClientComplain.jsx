import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import api from "../../config/api";
import ComplainReplyModal from "./ComplainReplyModal";
import { FaEye } from "react-icons/fa";

const ClientComplain = () => {
  const [complains, setComplains] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState(null); // Store selected complain for modal
  const [imagePopup, setImagePopup] = useState(null); // State for image popup

  // Get today's date in "August 25, 2024" format
  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  // Fetch all complains
  const fetchComplains = async () => {
    try {
      const res = await api.get("/api/complains/get-all", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      setComplains(res.data.complains);
    } catch (error) {
      console.error("Error fetching complains", error);
    }
  };
  // useEffect to call fetchComplains initially
  useEffect(() => {
    fetchComplains();
  }, []);

  // Open the modal with the selected complain
  const openComplainModal = (complain) => {
    setSelectedComplain(complain);
  };

  // Close the modal and refetch the complains to get updated data
  const closeComplainModal = () => {
    setSelectedComplain(null); // Close the modal
    fetchComplains(); // Refetch the complains after the modal closes
  };

  // Function to open image preview
  const openImagePopup = (imageURL) => {
    setImagePopup(imageURL);
  };

  return (
    <section className="flex-1 min-h-screen p-4 bg-gray-50">
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-blue-50">
        <div className="flex items-center my-auto">
          <div className="w-2 h-8 mr-3 bg-purple-600 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Complain</h1>
        </div>
        <div className="flex items-center px-4 py-2 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
          <CiCalendar className="mr-2" />
          {todayDate}
        </div>
      </div>
      {/* Complains List */}
      <div className="p-2 mt-6 shadow-md ">
        <h2 className="ml-4 text-2xl font-bold text-gray-500">
          Complains List
        </h2>
        <table className="w-full mt-4 bg-gray-100 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Complain ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">File</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {complains.map((complain, index) => (
              <tr key={complain.tokenId}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{complain.tokenId}</td>
                <td className="px-4 py-2 border">{complain.complainTitle}</td>
                <td className="px-4 py-2 overflow-x-auto border">
                  {complain.description}
                </td>
                <td className="px-4 py-2 border">{complain.status}</td>
                <td className="px-4 py-2 border">
                  {complain.complainFile ? (
                    <button
                      onClick={() => openImagePopup(complain.complainFile)}
                      className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      <FaEye />
                    </button>
                  ) : (
                    "No File"
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => openComplainModal(complain)}
                    className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Complain Modal */}
      {selectedComplain && (
        <ComplainReplyModal
          complain={selectedComplain}
          onClose={closeComplainModal}
        />
      )}
      {/* Image Popup */}
      {imagePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-xl p-6 m-6 overflow-y-auto bg-white rounded-lg shadow-lg h-4/5">
            <div className="flex items-center justify-center">
              <img
                src={imagePopup}
                alt="Complain File"
                className="flex items-center object-cover max-w-full max-h-full p-4 my-8 bg-green-100"
              />
            </div>
            <button
              onClick={() => setImagePopup(null)}
              className="absolute top-0 right-0 p-2 text-white bg-red-500 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientComplain;
