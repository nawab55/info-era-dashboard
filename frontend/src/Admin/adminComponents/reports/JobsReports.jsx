import { useState, useEffect } from "react";
import api, { API_BASE_URL } from "../../../config/api";
import {
  Download,
  Filter,
  Search,
  FileSpreadsheet,
  Loader,
  Trash2,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensures accessibility

const JobsReports = () => {
  const [jobReports, setJobReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filteredReports = jobReports.filter((job) =>
    Object.values(job).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "fatherName", label: "Father's Name" },
    { key: "country", label: "Country" },
    { key: "gender", label: "Gender" },
    { key: "mobile", label: "Mobile" },
    { key: "state", label: "State" },
    { key: "district", label: "District" },
    { key: "address", label: "Address" },
    { key: "pinCode", label: "Pin Code" },
    { key: "qualification", label: "Qualification" },
    { key: "resume", label: "Resume" },
  ];

  useEffect(() => {
    const fetchJobReports = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/jobform/get-allJobForm");
        setJobReports(response.data.data);
      } catch (error) {
        console.error("Error fetching job reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobReports();
  }, []);

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
      const response = await api.delete(
        `/api/jobform/delete-jobForm/${deleteId}`
      );
      if (response.status === 200) {
        setJobReports((prevReports) =>
          prevReports.filter((report) => report._id !== deleteId)
        );
        toast.success("Job report deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting job report:", error);
      toast.error("Failed to delete job report. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      closeModal();
    }
  };

  return (
    <section className="min-h-screen lg:p-6 p-2">
      <div className="rounded border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white text-2xl font-bold shadow-lg flex items-center justify-between lg:flex-row flex-col gap-4">
          <h2 className="lg:text-2xl text-xl lg:font-extrabold font-bold">
            View All Job-Apply Reports
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search job reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded font-normal text-base outline-none text-gray-800 w-64 shadow-sm"
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
                title="Filter"
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
            // Data Table
            <div className="overflow-x-auto pb-10">
              <table className="w-full bg-white rounded border">
                <thead className="bg-gray-600">
                  <tr className="text-white text-nowrap font-semibold text-base">
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
                  {filteredReports.length > 0 ? (
                    filteredReports.map((job, index) => (
                      <tr
                        key={job._id}
                        className={`text-gray-700 text-sm ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition-colors duration-200`}
                      >
                        <td className="text-nowrap px-4 py-3 border">
                          {index + 1}
                        </td>
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="text-nowrap px-4 py-3 border"
                          >
                            {column.key === "resume" && job[column.key] ? (
                              <a
                                href={API_BASE_URL + job[column.key].src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline flex items-center gap-1"
                              >
                                <Eye size={16} />
                                View Resume
                              </a>
                            ) : (
                              job[column.key]
                            )}
                          </td>
                        ))}
                        <td className="text-nowrap px-4 py-3 border">
                          <button
                            onClick={() => openModal(job._id)}
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
                          No job reports found.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
        <p>Are you sure you want to delete this job report?</p>
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

export default JobsReports;
