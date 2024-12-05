import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Loader,
} from "lucide-react";
import api from "../../../config/api";

const CertificateReports = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const columns = [
    { key: "year", label: "Year" },
    { key: "collegeName", label: "College Name" },
    { key: "regNo", label: "Registration No" },
    { key: "studentName", label: "Student Name" },
    { key: "projectName", label: "Project Name" },
    { key: "language", label: "Language" },
    { key: "toDate", label: "To Date" },
    { key: "fromDate", label: "From Date" },
    { key: "payment", label: "Payment" },
    { key: "mobileNo", label: "Mobile No" },
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/certificate/get-all");
        setCertificates(response.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

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
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.year}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.collegeName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.regNo}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.studentName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.projectName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.language}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {format(new Date(cert.toDate), "MM/dd/yyyy")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {format(new Date(cert.fromDate), "MM/dd/yyyy")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.payment}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 border">
                          {cert.mobileNo}
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
      </div>
    </section>
  );
};

export default CertificateReports;
