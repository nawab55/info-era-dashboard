import { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { AiOutlineFilter, AiOutlineSortAscending } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import LeaveCard from "../../Components/Card/LeaveCard";

const ViewLeaveApplication = () => {
  const [leaveRequests, setLeaveRequests] = useState([]); // All Leave request
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get today's date in "August 25, 2024" format
  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const userId = sessionStorage.getItem("userId");

  // Fetch all leave requests from the backend
  useEffect(() => {
    const fetchAllPendingLeaveRequests = async () => {
      try {
        const response = await api.get(
          "/api/employeeLeaves/getAll/pendingLeaves",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setLeaveRequests(response.data.pendingLeavesStatus);
      } catch (error) {
        console.error("Error Fetching Leave requests:", error);
        toast.error("Failed to fetch leave requests");
      }
    };
    fetchAllPendingLeaveRequests();
  }, []); // Fetch leave requests when the component mounts

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = leaveRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => {
    if (indexOfLastItem < leaveRequests.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(
        `/api/employeeLeaves/updateStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Leave status updated to ${status}`);
      // Refresh data to update the view after status change
      const response = await api.get(
        "/api/employeeLeaves/getAll/pendingLeaves",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setLeaveRequests(response.data.pendingLeavesStatus);
    } catch (error) {
      console.error("Failed to update leave status:", error);
      toast.error("Failed to update leave status");
    }
  };

  return (
    <section className="flex-1 bg-gray-50 p-4">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
        <div className="flex items-center my-auto">
          <div className="w-2 bg-indigo-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
        </div>
        <div className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
          <CiCalendar className="mr-2" />
          {todayDate} {/* Display today's date */}
        </div>
      </div>

      {/* Leave History Section */}
      <div className="mt-8 bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {/* Vertical Line */}
            <div className="w-2 bg-indigo-600 h-8 mr-3 rounded-full"></div>
            <h2 className="text-lg font-semibold text-blue-900">
              All Leave Requests
            </h2>
          </div>
          {/* Filter and Sort Icons */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-indigo-900 font-semibold bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
              <AiOutlineFilter className="mr-2" />
              Filter
            </button>
            <button className="flex items-center text-indigo-900 font-semibold bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
              <AiOutlineSortAscending className="mr-2" />
              Sort
            </button>
          </div>
        </div>

        {/* Leave Requests Cards (Max 6 per page) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentRequests.map((request, index) => (
            <LeaveCard
              key={index}
              request={request}
              onUpdateStatus={handleUpdateStatus}
              hrId={userId}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6 space-x-2">
          <button
            className={`px-4 py-2 ${
              currentPage === 1 ? "bg-gray-300" : "bg-gray-200"
            } rounded-lg`}
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
            {currentPage}
          </span>
          <button
            className={`px-4 py-2 ${
              indexOfLastItem >= leaveRequests.length
                ? "bg-gray-300"
                : "bg-gray-200"
            } rounded-lg`}
            onClick={nextPage}
            disabled={indexOfLastItem >= leaveRequests.length}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewLeaveApplication;
