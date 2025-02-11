/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { Calendar, Search, FileSpreadsheet, Trash2 } from "lucide-react";
import { debounce } from "lodash";
import api from "../../config/api";
import DeleteModal from "../../Components/Modal/DeleteModal";
import { toast } from "react-toastify";

const WorksheetReports = () => {
  const [reports, setReports] = useState([]);
  const [fromDate, setFromDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async (searchValue = searchQuery) => {
    try {
      setLoading(true);
      const response = await api.get("/api/worksheet/reports", {
        params: {
          fromDate,
          toDate,
          searchQuery: searchValue
        }
      });
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching worksheet reports:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      fetchReports(value);
    }, 500),
    [fromDate, toDate]
  );

  useEffect(() => {
    fetchReports();
  }, [fromDate, toDate]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleDelete = async () => {
    if (!selectedReport) return;

    try {
      await api.delete(`/api/worksheet/delete/${selectedReport._id}`);
      toast.success("Worksheet deleted successfully");
      setReports(reports.filter((report) => report._id !== selectedReport._id));
      setIsDeleteModalOpen(false);
      setSelectedReport(null);
    } catch (error) {
      console.error("Error deleting worksheet:", error);
    }
  };

  const openDeleteModal = (report) => {
    setSelectedReport(report);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen rounded bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <FileSpreadsheet className="w-8 h-8 text-blue-600" />
            Worksheet Reports
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage employee worksheets across different time periods
          </p>
        </div>

        {/* Filters Section */}
        <div className="p-6 mb-8 bg-white shadow-sm rounded-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by employee name..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden bg-white shadow-sm rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-blue-500">
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-100 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-100 uppercase">
                    Project
                  </th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-100 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-100 uppercase">
                    Remarks
                  </th>
                  <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-100 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : reports.length > 0 ? (
                  reports.map((report) => (
                    <tr
                      key={report._id}
                      className="transition-colors duration-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                              <span className="font-medium text-blue-600">
                                {report.empName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {report.empName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {report.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {report.projectName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {report.work}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {report.workDone || "No remarks"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openDeleteModal(report)}
                          className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No worksheets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this worksheet? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default WorksheetReports;