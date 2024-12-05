import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Trash2,
  FileSpreadsheet,
} from "lucide-react";
import api from "../../../config/api";

const IbcTable = () => {
  const [ibcList, setIbcList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch IBC data (replace with your actual API call)
  useEffect(() => {
    const fetchIbcData = async () => {
      try {
        // Placeholder for actual API call
        const response = await api.get("/api/co-partners/ibc/all");
        setIbcList(response.data);
        setFilteredList(response.data);
      } catch (error) {
        console.error("Error fetching IBC data:", error);
      }
    };

    fetchIbcData();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const results = ibcList.filter(
      (ibc) =>
        ibc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ibc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ibc.mobile.includes(searchTerm)
    );
    setFilteredList(results);
    setCurrentPage(1);
  }, [searchTerm, ibcList]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Delete handler
  const handleDelete = (id) => {
    // Implement your delete logic here
    const updatedList = ibcList.filter((ibc) => ibc._id !== id);
    setIbcList(updatedList);
  };

  return (
    <div className="flex-1 max-w-full lg:p-10 p-2">
      <div className="max-w-6xl mx-auto bg-white rounded border overflow-hidden">
        {/* Header with Search and Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
            IBC Management
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search IBCs..."
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
          <table className="w-full min-w-[800px] table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                {[
                  "S.No",
                  "Name",
                  "Gender",
                  "Aadhaar",
                  "PAN",
                  "GST",
                  "Email",
                  "Mobile",
                  "State",
                  "District",
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
                currentItems.map((ibc, index) => (
                  <tr
                    key={ibc._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 border">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 border">{ibc.name}</td>
                    <td className="px-6 py-4 border">{ibc.gender}</td>
                    <td className="px-6 py-4 border">{ibc.aadhaar}</td>
                    <td className="px-6 py-4 border">{ibc.pan}</td>
                    <td className="px-6 py-4 border">{ibc.gst}</td>
                    <td className="px-6 py-4 border">{ibc.email}</td>
                    <td className="px-6 py-4 border">{ibc.mobile}</td>
                    <td className="px-6 py-4 border">{ibc.state}</td>
                    <td className="px-6 py-4 border">{ibc.district}</td>
                    <td className="px-6 py-4 border">
                      <button
                        onClick={() => handleDelete(ibc._id)}
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
                      <p className="text-gray-500 text-lg">No IBCs found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IbcTable;
