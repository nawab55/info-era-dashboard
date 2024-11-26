import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import api from "../../config/api";
import ComplainReplyModal from "./ComplainReplyModal";
import { FaEye } from "react-icons/fa";

const ClientComplain = () => {
  const [complains, setComplains] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [imagePopup, setImagePopup] = useState(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fetchComplains = async () => {
    try {
      const res = await api.get("/api/complains/get-all", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setComplains(res.data.complains);
    } catch (error) {
      console.error("Error fetching complains", error);
    }
  };

  useEffect(() => {
    fetchComplains();
  }, []);

  const openComplainModal = (complain) => {
    setSelectedComplain(complain);
  };

  const closeComplainModal = () => {
    setSelectedComplain(null);
    fetchComplains();
  };

  const openImagePopup = (imageURL) => {
    setImagePopup(imageURL);
  };

  // lg:flex-1 w-full lg:w-auto
  return (
    <section className="flex-1 overflow-x-scroll bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      {/* Top Section */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 shadow-lg rounded-tl rounded-tr">
        <h1 className="text-lg md:text-2xl font-bold text-white tracking-wide w-full md:w-auto text-center md:text-left">
          Client Complain
        </h1>
        <div className="flex items-center bg-white text-blue-600 px-3 py-2 rounded shadow-lg cursor-pointer hover:text-indigo-600 transition duration-300 w-full md:w-auto justify-center md:justify-start">
          <CiCalendar className="mr-3 text-xl" />
          <span className="font-medium text-sm md:text-base">{todayDate}</span>
        </div>
      </div>

      {/* Complains List */}
      <div className="border px-4 py-4 mt-8 bg-white rounded">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 pb-2">
          Complains List
        </h2>
        <div className="overflow-x-auto">
          <table className="lg:min-w-full min-w-[100%] max-w-fit overflow-x-auto bg-gradient-to-br from-gray-50 to-white border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr className="">
                <th className="px-4 py-2 text-left whitespace-nowrap">S.No</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">
                  Complain ID
                </th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 py-2 text-left whitespace-nowrap">File</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {complains.map((complain, index) => (
                <tr
                  key={complain.tokenId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  } hover:bg-blue-100 transition duration-200`}
                >
                  <td className="border px-2 md:px-4 py-2">{index + 1}</td>
                  <td className="border px-2 md:px-4 py-2 truncate">
                    {complain.tokenId}
                  </td>
                  <td className="border px-2 md:px-4 py-2 truncate max-w-xs">
                    {complain.complainTitle}
                  </td>
                  <td className="border px-2 md:px-4 py-2 truncate max-w-xs">
                    {complain.description}
                  </td>
                  <td
                    className={`border px-2 md:px-4 py-2 ${
                      complain.status === "Resolved"
                        ? "text-green-600"
                        : "text-red-600"
                    } font-semibold`}
                  >
                    {complain.status}
                  </td>
                  <td className="border px-2 md:px-4 py-2">
                    {complain.complainFile ? (
                      <button
                        onClick={() => openImagePopup(complain.complainFile)}
                        className="px-2 py-1 md:px-4 md:py-2 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-700"
                      >
                        <FaEye />
                      </button>
                    ) : (
                      <span className="text-gray-500">No File</span>
                    )}
                  </td>
                  <td className="border px-2 md:px-4 py-2">
                    <button
                      onClick={() => openComplainModal(complain)}
                      className="px-2 py-1 md:px-4 md:py-2 text-sm bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-xs md:max-w-xl w-full h-4/5 overflow-y-auto relative shadow-2xl">
            <div className="flex justify-center items-center">
              <img
                src={imagePopup}
                alt="Complain File"
                className="max-w-full max-h-full object-cover rounded-lg border-4 border-green-500"
              />
            </div>
            <button
              onClick={() => setImagePopup(null)}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 hover:bg-red-600"
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
