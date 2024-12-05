import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Search,
  Trash2,
  Loader,
  Download,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
} from "lucide-react";
import Modal from "react-modal";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

Modal.setAppElement("#root");

const Consultant = () => {
  const [consultants, setConsultants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchConsultants(currentPage);
  }, [currentPage]);

  const fetchConsultants = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/consulting/get-allconsulting?page=${page}`
      );
      if (response.data.success) {
        const { data, totalPages } = response.data;
        setConsultants(data);
        setTotalPages(totalPages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching consultants data.");
    } finally {
      setIsLoading(false);
    }
  };

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
      const response = await axios.delete(
        `${API_BASE_URL}/api/consulting/${deleteId}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // Update state directly to avoid unnecessary API call
        setConsultants((prev) => prev.filter((item) => item._id !== deleteId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting consultant.");
    } finally {
      closeModal();
    }
  };

  const filteredConsultants = consultants.filter((consultant) =>
    Object.values(consultant).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="min-h-screen lg:p-6 p-2">
      <div className="rounded border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center shadow-lg">
          <h1 className="text-xl lg:text-2xl font-bold">
            Consultants Management
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search consultants..."
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

        {/* Table */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader size={40} className="animate-spin text-gray-500" />
              <span className="ml-4 text-gray-500 text-lg">
                Loading data...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white border rounded">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left border-gray-300">
                      Sl. No
                    </th>
                    <th className="px-4 py-2 text-left border-gray-300">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left border-gray-300">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left border-gray-300">
                      Mobile
                    </th>
                    <th className="px-4 py-2 text-left border-gray-300">
                      Organization
                    </th>
                    <th className="px-4 py-2 text-left border-gray-300">
                      Consulting
                    </th>
                    <th className="px-4 py-2 text-left border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultants.length > 0 ? (
                    filteredConsultants.map((consultant, index) => (
                      <tr
                        key={consultant._id}
                        className={`text-gray-700 text-sm ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100 transition-colors duration-20`}
                      >
                        <td className="text-nowrap px-4 py-3 border">
                          {index + 1}
                        </td>
                        <td className="text-nowrap px-4 py-3 border">
                          {consultant.name}
                        </td>
                        <td className="text-nowrap px-4 py-3 border">
                          {consultant.email}
                        </td>
                        <td className="text-nowrap px-4 py-3 border">
                          {consultant.mobile}
                        </td>
                        <td className="text-nowrap px-4 py-3 border">
                          {consultant.organizationName}
                        </td>
                        <td className="text-nowrap px-4 py-3 border">
                          {consultant.consulting}
                        </td>
                        <td className="px-4 py-3 text-center border">
                          <button
                            onClick={() => openModal(consultant._id)}
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
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <FileSpreadsheet
                            size={48}
                            className="text-gray-400 mb-4"
                          />
                          No consultants found.
                        </div>
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
        <p>Are you sure you want to delete this consultant?</p>
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

export default Consultant;
