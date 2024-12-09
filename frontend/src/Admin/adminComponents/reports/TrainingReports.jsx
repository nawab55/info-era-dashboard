import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../../../config/api";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Search, Trash2, FileSpreadsheet, Loader, Eye, ChevronLeft, ChevronRight } from "lucide-react";

Modal.setAppElement("#root"); // Ensure accessibility for the modal

function TrainingReports() {
  const [trainingReports, setTrainingReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTrainingReports = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/training/get-all-training?page=${page}&limit=10`);
      const { data } = response.data;

      setTrainingReports(data.submissions);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching training reports:", error);
      toast.error("Failed to fetch training reports.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingReports(currentPage);
  }, [currentPage]);

  const filteredReports = trainingReports.filter((report) =>
    Object.values(report).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const openModal = (id) => {
    setDeleteId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/training/delete/${deleteId}`);

      if (response.status === 200) {
        setTrainingReports((prev) =>
          prev.filter((report) => report._id !== deleteId)
        );
        toast.success("Training record deleted successfully.");
      } else {
        toast.error("Failed to delete the training record.");
      }
    } catch (error) {
      console.error("Error deleting training record:", error);
      toast.error("Failed to delete the training record.");
    } finally {
      closeModal();
    }
  };

  const Pagination = () => (
    <div className="flex items-center justify-center mt-4 space-x-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className={`px-3 py-2 rounded-lg ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-2 rounded-lg ${
            currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-indigo-400 text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className={`px-3 py-2 rounded-lg ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );


  return (
    <section className="min-h-screen lg:p-6 p-2">
      <div className="rounded border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white text-2xl font-bold flex items-center justify-between lg:flex-row flex-col gap-4">
          <h2 className="lg:text-2xl text-xl lg:font-extrabold font-bold">
            Training Reports
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded font-normal text-base outline-none text-gray-800 w-64 shadow-sm"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="lg:p-4 p-2">
          {isLoading ? (
            // Loading State
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader size={48} className="animate-spin text-gray-500" />
              <span className="ml-4 text-gray-500 text-lg">
                Loading data...
              </span>
            </div>
          ) : (
            <>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded border">
                <thead className="bg-gray-700">
                  <tr className="text-white text-base text-nowrap border-gray-300 font-semibold">
                    <th className="px-4 py-3 text-left border-gray-300">
                      Sl. No
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Mobile
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Father&apos;s Name
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Permanent Address
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      State
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      District
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Pin Code
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Correspondence Address
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      State
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      District
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Pin Code
                    </th>

                    <th className="px-4 py-3 text-left border-gray-300">
                      Qualification
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      College Name
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Passing Year
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      University Name
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      College Roll No.
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Stream Name
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      University Reg No.
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Interested
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Profile Photo
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report, index) => (
                      <tr
                        key={report._id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100 transition-colors duration-200`}
                      >
                        <td className="px-4 py-3  text-nowrap border">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.name}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.email}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.mobile}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.gender}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.fatherName}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.perAddress}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.perCountry}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.perState}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.perDistrict}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.perPinCode}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.corAddress}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.corCountry}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.corState}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.corDistrict}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.corPinCode}
                        </td>

                        <td className="px-4 py-3 text-nowrap border">
                          {report.qualification}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.collegeName}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.passingYear}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.universityName}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.collegeRollNo}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.streamName}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.universityRegNo}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.interestedFor}
                        </td>
                        <td className="px-4 py-3 text-nowrap border">
                          {report.profilePhoto?.src ? (
                            <a
                              href={API_BASE_URL + report.profilePhoto.src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline flex items-center gap-1"
                            >
                              <Eye size={16} />
                              View Photo
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => openModal(report._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={26}
                        className="text-center py-6 text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <FileSpreadsheet
                            size={48}
                            className="text-gray-400 mb-4"
                          />
                          No training records found.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination />
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this training record?</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </Modal>
    </section>
  );
}

export default TrainingReports;
