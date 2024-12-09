import { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader,
  FileSpreadsheet,
  Search,
  Download,
} from "lucide-react";
import api from "../../../config/api";

Modal.setAppElement("#root");

const CollegeReports = () => {
  const [colleges, setColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `/api/college/get-colleges?page=${currentPage}`
        );
        if (response.data.success) {
          const { colleges, totalPages } = response.data;
          setColleges(colleges);
          setTotalPages(totalPages);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching colleges.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, [currentPage]);

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
      const response = await api.delete(`/api/college/${deleteId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setColleges((prev) =>
          prev.filter((college) => college._id !== deleteId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting college.");
    } finally {
      closeModal();
    }
  };

  const filteredColleges = colleges.filter((college) =>
    Object.values(college).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="flex-1 max-w-full min-h-screen lg:py-6 py-4 lg:px-6 px-2">
      <div className="rounded border overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center md:flex-row flex-col shadow-lg">
          <h1 className="text-xl lg:text-2xl font-bold">
            View All College Reports
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded font-normal outline-none text-gray-800 w-64"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            <button
              className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
              title="Export Data"
            >
              <Download size={24} />
            </button>
          </div>
        </div>

        <div className="lg:p-4 p-2">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader className="animate-spin text-gray-500" size={40} />
              <span className="ml-4 text-gray-500 text-lg">
                Loading data...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto pb-10">
              <table className="min-w-full bg-white rounded border">
                <thead className="bg-gray-600">
                  <tr className="text-white font-semibold text-base text-nowrap">
                    <th className="px-4 py-3 text-left border-gray-300">
                      Sl. No
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      College Name
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      College Code
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Website
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Mobile No
                    </th>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColleges.length > 0 ? (
                    filteredColleges.map((college, index) => (
                      <tr
                        key={college._id}
                        className={`text-gray-700 text-sm ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition-colors duration-200`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {college.collegeName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {college.collegeCode}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {college.address}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          <a
                            href={`http://${college.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {college.website}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {college.mobileNo}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border text-center">
                          <button
                            onClick={() => openModal(college._id)}
                            className="text-red-600 hover:text-red-800 rounded transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-6 text-gray-500"
                      >
                        <FileSpreadsheet
                          size={48}
                          className="text-gray-400 mb-4 mx-auto"
                        />
                        No colleges found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2 disabled:opacity-50"
          >
            Next
            <ChevronRight size={18} />
          </button>
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
        <p>Are you sure you want to delete this college?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default CollegeReports;
