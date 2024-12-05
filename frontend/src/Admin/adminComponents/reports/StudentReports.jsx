import { useState, useEffect } from "react";
import api from "../../../config/api";
import { Download, Filter, Search, FileSpreadsheet } from "lucide-react";

const StudentReports = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { key: "studentName", label: "Student Name" },
    { key: "collegeName", label: "College Name" },
    { key: "course", label: "Course" },
    { key: "registrationNo", label: "Registration No" },
    { key: "emailId", label: "Email ID" },
    { key: "language", label: "Language" },
  ];
  // Fetch student data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/api/student/get-students");
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <section className="flex-1 max-w-full min-h-screen lg:p-6 p-2">
      <div className=" rounded border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white text-2xl font-bold shadow-lg lg:gap-0 gap-2 flex items-center justify-between lg:flex-row flex-col">
          <h2 className="lg:text-2xl text-xl lg:font-extrabold font-bold text-white text-center flex items-center justify-center">
            View All Student Reports
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

        {/* Table */}
        <div className="lg:p-4 p-2">
          <div className="overflow-x-auto pb-10">
            <table className="min-w-full bg-white rounded border">
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
                      <td className="text-nowrap px-4 py-3 border">
                        {index + 1}
                      </td>
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="text-nowrap px-4 py-3 border"
                        >
                          {student[column.key] || "N/A"}
                        </td>
                      ))}
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
                        No students found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentReports;
