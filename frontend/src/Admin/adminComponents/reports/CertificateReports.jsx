import { useState, useEffect } from "react";
import Modal from "react-modal";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Loader,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../../../config/api";
import { toast } from "react-toastify";

Modal.setAppElement("#root");
const CertificateReports = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    { key: "studentName", label: "Student Name" },
    { key: "collegeName", label: "College Name" },
    { key: "regNo", label: "Registration No" },
    { key: "year", label: "Year" },
    { key: "projectName", label: "Project Name" },
    { key: "language", label: "Language" },
    { key: "fromDate", label: "From Date" },
    { key: "toDate", label: "To Date" },
    { key: "payment", label: "Payment" },
    { key: "mobileNo", label: "Mobile No" },
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `/api/certificate/get-all?page=${currentPage}`
        );
        if (response.data.success) {
          setCertificates(response.data.certificates);
          setTotalPages(response.data.totalPages);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
        toast.error("Error fetching certificates.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [currentPage]);

  const openModal = (id) => {
    // console.log("Opening modal for ID:", id);
    setDeleteId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/certificate/${deleteId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setCertificates((prev) => prev.filter((cert) => cert._id !== deleteId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting certificate.");
    } finally {
      closeModal();
    }
  };

  const filteredCertificates = certificates.filter((cert) =>
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex-1 max-w-full min-h-screen p-2 lg:p-6">
      <div className="overflow-hidden border rounded lg:max-w-6xl md:max-w-4xl sm:max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 p-6 text-2xl font-bold text-center text-white shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 md:flex-row">
          <h2 className="flex items-center justify-center text-xl font-bold text-center text-white md:text-2xl md:font-extrabold">
            Certificate Reports
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-3 py-2 text-base font-normal text-gray-800 rounded outline-none"
              />
              <Search
                className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
                size={20}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-2 transition-colors rounded bg-white/20 hover:bg-white/30"
              >
                <Filter size={24} />
              </button>
              <button
                className="p-2 transition-colors rounded bg-white/20 hover:bg-white/30"
                title="Export to Excel"
              >
                <Download size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Table or Loading */}
        <div className="p-2 md:p-4">
          {isLoading ? (
            // Loading State
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader size={48} className="text-gray-500 animate-spin" />
              <span className="ml-4 text-lg text-gray-500">
                Loading data...
              </span>
            </div>
          ) : (
            // Data Table
            <div className="max-w-full pb-10 overflow-x-auto">
              <table className="min-w-full bg-white border rounded">
                <thead className="bg-gray-600">
                  <tr className="text-base font-semibold text-white">
                    <th className="px-4 py-3 text-left border-gray-300 text-nowrap">
                      Sl. No
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-4 py-3 text-left border-gray-300 text-nowrap"
                      >
                        {column.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left border-gray-300 text-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert, index) => (
                      <tr
                        key={cert.id || index}
                        className={`text-gray-700 text-sm ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition-colors duration-200`}
                      >
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className="px-4 py-3 border whitespace-nowrap"
                          >
                            {col.key === "fromDate" || col.key === "toDate"
                              ? format(new Date(cert[col.key]), "dd/MM/yyyy")
                              : cert[col.key]}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center border whitespace-nowrap">
                          <button
                            onClick={() => openModal(cert._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                        {/* <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.studentName}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.collegeName}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.regNo}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.year}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.projectName}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.language}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {format(new Date(cert.fromDate), "dd/MM/yyyy")}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {format(new Date(cert.toDate), "dd/MM/yyyy")}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.payment}
                        </td>
                        <td className="px-4 py-3 border whitespace-nowrap">
                          {cert.mobileNo}
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="py-6 text-lg text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <FileSpreadsheet
                            size={48}
                            className="mb-4 text-gray-400"
                          />
                          No certificates found.
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
        <div className="flex items-center justify-between p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
            Prev
          </button>
          <span className="font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="max-w-md p-6 mx-auto bg-white rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
      >
        <div className="p-6">
          <h2 className="text-lg font-bold">Confirm Deletion</h2>
          <p className="mt-4 text-gray-700">
            Are you sure you want to delete this certificate?
          </p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-red-600 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default CertificateReports;
