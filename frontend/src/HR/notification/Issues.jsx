import { useEffect, useState } from "react";
import api from "../../config/api";
import { BiErrorCircle } from "react-icons/bi";
import { MdCheck, MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch issues with pagination
  const fetchIssues = async (page = 1) => {
    try {
      const response = await api.get(
        `/api/message/issues/get-all?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setIssues(response.data.issues);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error Fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues(currentPage);
  }, [currentPage]);

  // Handle status update
  const updatteIssueStatus = async (id, status) => {
    try {
      await api.patch(
        `/api/message/issues/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Issue marked as ${status}!`);
      fetchIssues(currentPage); // Refetch issues to update UI
    } catch (error) {
      toast.error("Error updating issue status!");
      console.error("Error", error);
    }
  };

  // Pagination navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex-1 bg-gray-50 p-6">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-800 px-5 py-2 rounded-tl rounded-tr">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-white">Issues</h1>
        </div>
        <button className="flex items-center bg-white text-indigo-800 px-3 py-2 rounded hover:bg-indigo-100 transition duration-300 shadow-lg">
          <BiErrorCircle className="mr-2 text-xl" />
          Report Issue
        </button>
      </div>

      {/* Issues list */}
      <div className="mt-6 space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`relative px-4 py-1 rounded-lg group border flex justify-between items-center ${
              issue.status === "Unresolved"
                ? "border-red-600 bg-red-50"
                : "border-green-600 bg-green-50"
            } transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50`}
          >
            <div className="flex items-center space-x-4">
              {issue.status === "Unresolved" ? (
                <MdClose className="text-3xl p-2 mr-3 rounded-full bg-red-600 text-white" />
              ) : (
                <MdCheck className="text-3xl p-2 mr-3 rounded-full bg-green-600 text-white" />
              )}
              <div className="flex flex-col">
                <p className="font-semibold text-lg">{issue.empname}:</p>
                <p
                  className={`${
                    issue.status === "Unresolved"
                      ? "text-red-700"
                      : "text-green-700"
                  }`}
                >
                  {issue.description}
                </p>
              </div>
            </div>

            <div
              className={`group-hover:block hidden p-2 rounded-lg shadow-md bg-opacity-80 transition-all duration-300 ${
                issue.status === "Unresolved" ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {issue.status === "Unresolved" ? (
                <button
                  className="text-white  "
                  onClick={() => updatteIssueStatus(issue._id, "Resolved")}
                >
                  Mark Resolved
                </button>
              ) : (
                <button
                  className="text-white  "
                  onClick={() => updatteIssueStatus(issue._id, "Unresolved")}
                >
                  Mark Unresolved
                </button>
              )}
            </div>

            <div>
              <span
                className={`px-4 py-2 text-sm font-medium rounded text-white ${
                  issue.status === "Unresolved" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {issue.status}
              </span>
            </div>

            {/* Hover Mark Resolved/Unresolved Options */}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-2 rounded-lg text-lg font-medium transition-all duration-300 ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Issues;
