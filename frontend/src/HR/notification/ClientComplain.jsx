import { useEffect, useState } from "react"
import { CiCalendar } from "react-icons/ci"
import api from "../../config/api";
import ComplainReplyModal from "./ComplainReplyModal";

const ClientComplain = () => {
    const [complains, setComplains] = useState([]);
    const [selectedComplain, setSelectedComplain] = useState(null); // Store selected complain for modal
    // Get today's date in "August 25, 2024" format
    const todayDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    // Fetch all complains
  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const res = await api.get("/api/complains/get-all", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('customerToken')}`,
          }
        });
        setComplains(res.data.complains);
      } catch (error) {
        console.error("Error fetching complains", error);
      }
    };
    fetchComplains();
  }, []);

  // Open the modal with the selected complain
  const openComplainModal = (complain) => {
    setSelectedComplain(complain);
  };

  // Close the modal
  const closeComplainModal = () => {
    setSelectedComplain(null);
  };

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
        <div className="shadow-md p-2 mt-6">
        <h2 className="text-2xl font-bold text-gray-500 ml-4">Complains List</h2>
        <table className="table-auto w-full mt-4 bg-gray-100">
          <thead>
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Complain ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {complains.map((complain, index) => (
              <tr key={complain.tokenId}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{complain.tokenId}</td>
                <td className="border px-4 py-2">{complain.complainTitle}</td>
                <td className="border px-4 py-2">{complain.status}</td>
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

    </section>
  )
}

export default ClientComplain