import { useState, useRef, useEffect } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import CertificatePage from "./CertificatePage";
import { Search, Printer, X, FileText } from "lucide-react";

const PrintCertificate = () => {
  const [regNo, setRegNo] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const certificateRef = useRef();

  const handleInputChange = (e) => {
    setRegNo(e.target.value);
  };

  const handleViewClick = async () => {
    try {
      const response = await api.get(`/api/certificate/get-by-regno/${regNo}`);
      setCertificateData(response.data);
      toast.success("Certificate found successfully!");
    } catch (error) {
      toast.error("Certificate not Found for this Registration Number.");
      console.error("Error fetching certificate", error);
      setCertificateData(null);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handlekeydown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handlekeydown);

    return () => {
      window.removeEventListener("keydown", handlekeydown);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-full flex-1 bg-gray-50 lg:p-6 p-2">
      <div className="max-w-5xl mx-auto bg-white border rounded overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h1 className="text-2xl font-bold text-white">Certificate Lookup</h1>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={regNo}
                  onChange={handleInputChange}
                  placeholder="Enter Registration Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-l outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
                <button
                  onClick={handleViewClick}
                  className="bg-blue-600 text-white px-6 py-3 rounded-r hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Search className="mr-2" size={20} />
                  Search
                </button>
              </div>
            </div>
          </div>

          {certificateData && (
            <div className="bg-white rounded overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="border text-nowrap">
                      {[
                        "Student Name",
                        "College Name",
                        "Registration No",
                        "Project Name",
                        "Year",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="
                       px-6 py-4 
                       text-left 
                       text-xs 
                       font-semibold 
                       text-gray-600 
                       uppercase 
                       tracking-wider
                       sticky 
                       top-0 
                       bg-gray-50
                     "
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-100">
                    <tr
                      className="
                   hover:bg-gray-50 border
                   transition-colors 
                   duration-200 
                   group
                   cursor-default
                 "
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText
                            className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors"
                            size={20}
                          />
                          <span className="font-medium text-gray-800">
                            {certificateData.studentName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {certificateData.collegeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="
                     bg-blue-50 
                     text-blue-600 
                     px-3 py-1 
                     rounded-full 
                     text-xs 
                     font-medium
                   "
                        >
                          {certificateData.regNo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {certificateData.projectName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="
                     bg-green-50 
                     text-green-600 
                     px-3 py-1 
                     rounded-full 
                     text-xs 
                     font-medium
                   "
                        >
                          {certificateData.year}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={openModal}
                          className="
                       flex items-center 
                       bg-blue-500 
                       text-white 
                       px-4 py-2 
                       rounded-lg 
                       hover:bg-blue-600 
                       transition-colors 
                       shadow-md 
                       hover:shadow-lg 
                       group
                     "
                        >
                          <Printer
                            className="mr-2 group-hover:rotate-12 transition-transform"
                            size={16}
                          />
                          Print Certificate
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 transition-opacity bg-black backdrop-blur-sm ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-opacity-50 flex justify-center items-center z-50 p-4`}
      >
        <div
          className={`bg-white w-full max-w-4xl h-[90%] rounded overflow-hidden ${
            isModalOpen ? "scale-100" : "scale-95"
          } transition-transform flex flex-col`}
        >
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Certificate Preview
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            <CertificatePage
              ref={certificateRef}
              certificateData={certificateData}
            />
          </div>

          <div className="bg-gray-100 p-4 flex justify-end">
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors flex items-center"
            >
              <Printer className="mr-2" size={20} /> Print Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintCertificate;
