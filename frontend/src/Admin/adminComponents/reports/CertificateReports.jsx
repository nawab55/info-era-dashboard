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
    console.log("Opening modal for ID:", id);
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
    <section className="flex-1 max-w-full min-h-screen lg:p-6 p-2">
      <div className="border lg:max-w-6xl md:max-w-4xl sm:max-w-2xl rounded overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white text-2xl font-bold shadow-lg gap-4 flex items-center justify-between md:flex-row flex-col">
          <h2 className="md:text-2xl text-xl md:font-extrabold font-bold text-white text-center flex items-center justify-center">
            Certificate Reports
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded font-normal text-base outline-none text-gray-800 w-64"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
              >
                <Filter size={24} />
              </button>
              <button
                className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
                title="Export to Excel"
              >
                <Download size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Table or Loading */}
        <div className="md:p-4 p-2">
          {isLoading ? (
            // Loading State
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader size={48} className="animate-spin text-gray-500" />
              <span className="ml-4 text-gray-500 text-lg">
                Loading data...
              </span>
            </div>
          ) : (
            // Data Table
            <div className="overflow-x-auto max-w-full pb-10">
              <table className="min-w-full  bg-white rounded border">
                <thead className="bg-gray-600">
                  <tr className="text-white  font-semibold text-base">
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
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className="whitespace-nowrap border px-4 py-3"
                          >
                            {col.key === "fromDate" || col.key === "toDate"
                              ? format(new Date(cert[col.key]), "dd/MM/yyyy")
                              : cert[col.key]}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center whitespace-nowrap border">
                          <button
                            onClick={() => openModal(cert._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                        {/* <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.studentName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.collegeName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.regNo}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.year}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.projectName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.language}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {format(new Date(cert.fromDate), "dd/MM/yyyy")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {format(new Date(cert.toDate), "dd/MM/yyyy")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.payment}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.mobileNo}
                        </td> */}
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
        <div className="flex justify-between items-center p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2 disabled:opacity-50"
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
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2 disabled:opacity-50"
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
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
      >
        <div className="p-6">
          <h2 className="text-lg font-bold">Confirm Deletion</h2>
          <p className="text-gray-700 mt-4">
            Are you sure you want to delete this certificate?
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
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
