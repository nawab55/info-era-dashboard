import { useState, useEffect } from "react";
import api from "../../../config/api";
import {
  Search,
  Loader,
  Trash2,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Accessibility requirement

const ClientQueryReports = () => {
  const [clientQueries, setClientQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filteredQueries = clientQueries.filter((query) =>
    Object.values(query).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    { key: "country", label: "Country" },
    { key: "state", label: "State" },
    { key: "district", label: "District" },
    { key: "address", label: "Address" },
    { key: "pinCode", label: "Pin Code" },
    { key: "requirementFor", label: "Requirement" },
  ];

  const fetchClientQueries = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/query/get-all?page=${page}`);
      const { data, pagination } = response.data;

      setClientQueries(data);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pagination.currentPage);
    } catch (error) {
      console.error("Error fetching client queries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientQueries(currentPage);
  }, [currentPage]);

  //   useEffect(() => {
  //     const fetchClientQueries = async () => {
  //       try {
  //         setIsLoading(true);
  //         const response = await api.get("/api/query/get-all");
  //         setClientQueries(response.data.data);
  //       } catch (error) {
  //         console.error("Error fetching client queries:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchClientQueries();
  //   }, []);

  const openModal = (id) => {
    setDeleteId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/api/query/delete/${deleteId}`);
      if (response.status === 200) {
        setClientQueries((prevQueries) =>
          prevQueries.filter((query) => query._id !== deleteId)
        );
        toast.success("Client query deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting client query:", error);
      toast.error("Failed to delete client query. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      closeModal();
    }
  };

  return (
    <section className="min-h-screen lg:p-6 p-2">
      <div className="rounded border overflow-hidden bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-center text-white text-2xl font-bold shadow-lg flex items-center justify-between lg:flex-row flex-col gap-4">
          <h2 className="lg:text-2xl text-xl lg:font-extrabold font-bold">
            Client Query Reports
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search queries..."
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

        {/* Table */}
        <div className="lg:p-4 p-2">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader size={48} className="animate-spin text-gray-500" />
              <span className="ml-4 text-gray-500 text-lg">
                Loading data...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto pb-10">
              <table className="w-full bg-white rounded border">
                <thead className="bg-teal-500">
                  <tr className="text-white font-semibold text-base text-nowrap">
                    <th className="px-4 py-3 text-left border-gray-300">
                      Sl. No
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-4 py-3 text-left border-gray-300"
                      >
                        {column.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientQueries.length > 0 ? (
                    filteredQueries.map((query, index) => (
                      <tr
                        key={query._id}
                        className={`text-gray-700 text-sm ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-teal-50 transition-colors duration-200`}
                      >
                        <td className="px-4 py-3 border">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        {columns.map((column) => (
                          <td key={column.key} className="px-4 py-3 border">
                            {query[column.key] || "N/A"}
                          </td>
                        ))}
                        <td className="px-4 py-3 border">
                          <button
                            onClick={() => openModal(query._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="text-center py-6 text-gray-500 text-lg"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <FileSpreadsheet
                            size={48}
                            className="text-gray-400 mb-4"
                          />
                          No client queries found.
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
        <div className="flex justify-between items-center py-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this client query?</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default ClientQueryReports;
