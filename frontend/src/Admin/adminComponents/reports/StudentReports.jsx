import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader,
  FileSpreadsheet,
  Search,
  Download,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../../config/api";

Modal.setAppElement("#root");

const StudentReports = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "studentName", label: "Student Name" },
    { key: "collegeName", label: "College Name" },
    { key: "course", label: "Course" },
    { key: "mobileNo", label: "Mobile" },
    { key: "trainingTopic", label: "Topic" },
    { key: "registrationNo", label: "Registration No" },
    { key: "emailId", label: "Email ID" },
    { key: "language", label: "Language" },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `/api/student/get-students?page=${currentPage}`
        );
        if (response.data.success) {
          const { students, totalPages } = response.data;
          setStudents(students);
          setTotalPages(totalPages);
        } else {
          toast.error(response.data.message || "Error fetching students");
        }
      } catch (error) {
        toast.error("Error fetching students.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage]);

  // useEffect(() => {
  //   fetchStudents(currentPage, searchTerm);
  // }, [currentPage, searchTerm]);

  // const fetchStudents = async (page = 1, search = "") => {
  //   setIsLoading(true);
  //   try {
  //     const response = await api.get(
  //       `/api/student/get-students?page=${page}&search=${search}`
  //     );
  //     if (response.data.success) {
  //       const { students, totalPages } = response.data;
  //       setStudents(students);
  //       setTotalPages(totalPages);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Error fetching students.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
      const response = await api.delete(`/api/student/${deleteId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setStudents((prev) =>
          prev.filter((student) => student._id !== deleteId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting student.");
    } finally {
      closeModal();
    }
  };

  const filteredStudents = students.filter((student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex-1 max-w-full min-h-screen lg:p-6 p-2">
      <div className="rounded border overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center shadow-lg">
          <h1 className="text-xl lg:text-2xl font-bold">
            View All Student Reports
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded outline-none text-gray-800 w-64"
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
        <div className="lg:p-4 p-2">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader className="animate-spin text-gray-500" size={40} />
              <span className="ml-4 text-gray-500 text-lg">
                Loading data...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto max-w-full pb-10">
              <table className="min-w-full bg-white rounded border">
                <thead className="bg-gray-600">
                  <tr className="text-white text-nowrap font-semibold text-base">
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
                    <th className="px-4 py-3 text-center border-gray-300 text-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr
                        key={student._id}
                        className={`text-gray-700 text-sm ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition-colors duration-200`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="whitespace-nowrap px-4 py-3 border"
                          >
                            {student[column.key] || "N/A"}
                          </td>
                        ))}
                        <td className="text-center whitespace-nowrap px-4 py-3 border">
                          <button
                            onClick={() => openModal(student._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length + 2}
                        className="text-center py-6 text-gray-500 text-lg"
                      >
                        <FileSpreadsheet
                          size={48}
                          className="text-gray-400 mb-4 mx-auto"
                        />
                        No students found.
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
            <ChevronLeft size={18} /> Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded flex items-center gap-2 disabled:opacity-50"
          >
            Next <ChevronRight size={18} />
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
        <p>Are you sure you want to delete this student?</p>
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

export default StudentReports;
