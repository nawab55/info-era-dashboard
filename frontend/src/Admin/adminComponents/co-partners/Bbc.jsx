import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Trash2,
  FileSpreadsheet,
} from "lucide-react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const Bbc = () => {
  const [bbcList, setBbcList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all BBC registrations
  const fetchBbcList = async () => {
    try {
      const response = await api.get("/api/co-partners/bbc/all");
      setBbcList(response.data);
      setFilteredList(response.data);
    } catch (error) {
      console.error("Error fetching BBC data", error);
    }
  };

  useEffect(() => {
    fetchBbcList();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const results = bbcList.filter(
      (bbc) =>
        bbc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bbc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bbc.mobile.includes(searchTerm)
    );
    setFilteredList(results);
    setCurrentPage(1);
  }, [searchTerm, bbcList]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/co-partners/bbc/delete/${id}`);
      toast.success("Deleted Successfully");
      fetchBbcList();
    } catch (error) {
      console.error("Error deleting BBC data", error);
      toast.error("Error Deleting");
    }
  };

  return (
    <div className="flex-1 max-w-full min-h-screen lg:p-10 p-2">
      <div className="max-w-6xl mx-auto bg-white rounded border overflow-hidden">
        {/* Header with Search and Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
            BBC Management
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search BBCs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
                title="Filter"
              >
                <Filter size={24} className="text-white" />
              </button>
              <button
                className="bg-white/20 hover:bg-white/30 p-2 rounded transition-colors"
                title="Export"
              >
                <Download size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full  table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                {[
                  "S.No",
                  "Name",
                  "Company/Organization",
                  "Aadhaar",
                  "PAN",
                  "GST",
                  "Mobile",
                  "State",
                  "District",
                  "Email",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((bbc, index) => (
                  <tr
                    key={bbc._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 border">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 border">{bbc.name}</td>
                    <td className="px-6 py-4 border">{bbc.company}</td>
                    <td className="px-6 py-4 border">{bbc.aadhaar}</td>
                    <td className="px-6 py-4 border">{bbc.pan}</td>
                    <td className="px-6 py-4 border">{bbc.gst}</td>
                    <td className="px-6 py-4 border">{bbc.mobile}</td>
                    <td className="px-6 py-4 border">{bbc.state}</td>
                    <td className="px-6 py-4 border">{bbc.district}</td>
                    <td className="px-6 py-4 border">{bbc.email}</td>
                    <td className="px-6 py-4 border">
                      <button
                        onClick={() => handleDelete(bbc._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <FileSpreadsheet
                        size={48}
                        className="text-gray-400 mb-4"
                      />
                      <p className="text-gray-500 text-lg">No BBCs found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center p-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bbc;
