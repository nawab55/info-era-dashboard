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
      toast.success(`Issues marked as ${status}!`);
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
    <section className="flex-1 min-h-screen p-4 bg-gray-50">
      {/* Top Card Section */}
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-blue-50">
        <div className="flex items-center my-auto">
          <div className="w-2 h-8 mr-3 bg-purple-600 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
        </div>
        <div className="flex items-center px-4 py-2 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
          <BiErrorCircle className="mr-2" />
          Issues
        </div>
      </div>

      {/* Issues list */}
      <div className="mt-6 space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md flex justify-between items-center relative ${
              issue.status === "Unresolved"
                ? "bg-red-100 text-gray-900"
                : "bg-green-100 text-gray-900"
            }`}
            onMouseEnter={() =>
              document
                .getElementById(`hover-${index}`)
                .classList.remove("hidden")
            }
            onMouseLeave={() =>
              document.getElementById(`hover-${index}`).classList.add("hidden")
            }
          >
            <div className="flex items-center">
              {issue.status === "Unresolved" ? (
                <MdClose className="text-3xl p-1.5 mr-2 rounded-full bg-red-600 text-white" />
              ) : (
                <MdCheck className="text-3xl p-1.5 mr-2 rounded-full bg-green-600 text-white" />
              )}
              <p className="mr-2 text-sm font-bold">{issue.empname}:</p>
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

            <div>
              <span
                className={`p-2 rounded-md text-sm text-white ${
                  issue.status === "Unresolved" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {issue.status}
              </span>
            </div>
            {/* Hover Mark Resolved/Unresolved Options */}
            <div
              id={`hover-${index}`}
              className={`absolute  left-0 top-0 ${
                issue.status === "Unresolved" ? "bg-red-600" : "bg-green-600"
              } p-3 ml-2  rounded-md shadow-sm hidden`}
            >
              {issue.status === "Unresolved" ? (
                <button
                  className="text-white hover:underline"
                  onClick={() => updatteIssueStatus(issue._id, "Resolved")}
                >
                  Mark Resolved
                </button>
              ) : (
                <button
                  className="text-white hover:underline"
                  onClick={() => updatteIssueStatus(issue._id, "Unresolved")}
                >
                  Mark Unresolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            } rounded-lg`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Issues;
