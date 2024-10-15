import { useEffect, useState } from "react"
import { CiCalendar } from "react-icons/ci"
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
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
  }

  return (
    <section className="md:ml-52 mt-16 bg-gray-50 p-4">
        {/* Top Section */}
        <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
            <div className="flex items-center my-auto">
                <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
                <h1 className="text-2xl font-bold text-gray-900">Complain</h1>
            </div>
            <div className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                <CiCalendar className="mr-2" />
                {todayDate}
            </div>
        </div>
        {/* Complains List */}
        <div className="shadow-md p-2 mt-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-500 ml-4">Complains List</h2>
        <table className="table-auto w-full mt-4 bg-gray-100">
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
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{complain.tokenId}</td>
                <td className="border px-4 py-2">{complain.complainTitle}</td>
                <td className="border px-4 py-2 overflow-x-auto">{complain.description}</td>
                <td className="border px-4 py-2">{complain.status}</td>
                <td className="border px-4 py-2">
                  {complain.complainFile ? (
                    <button
                      onClick={() => openImagePopup(complain.complainFile)}
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <FaEye />
                    </button>
                  ) : (
                    "No File"
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openComplainModal(complain)}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
        <ComplainReplyModal complain={selectedComplain} onClose={closeComplainModal} />
      )}
      {/* Image Popup */}
      {imagePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full h-4/5 overflow-y-auto m-6 relative shadow-lg">
            <div className="flex justify-center items-center">
              <img src={imagePopup} alt="Complain File" className="max-w-full max-h-full object-cover my-8 flex items-center p-4 bg-green-100" />
            </div>
            <button
              onClick={() => setImagePopup(null)}
              className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  )
}

export default ClientComplain