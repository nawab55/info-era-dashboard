import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlineFilter, AiOutlineSortAscending } from "react-icons/ai"; // Importing icons for filter and sort
import api from "../../config/api";
import CustomModal from "../../Components/Modal/CustomModal"; // Import your custom modal
import LeaveCard from "../../Components/Card/LeaveCard";
import { toast } from "react-toastify";

const LeaveApplication = () => {
  const [openModal, setOpenModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]); // State for Leave Request
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const userId = sessionStorage.getItem("userId");

  // Fetch leave requests from the backend
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await api.get(
          `/api/employeeLeaves/get/leave/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setLeaveRequests(
          response.data.sort(
            (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
          )
        ); // Sort in reverse order
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };
    fetchLeaveRequests();
  }, [userId]); // Fetch leave requests when the component mounts or userId changes

  // Function to handle modal open/close
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  // Function to handle leave request form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newLeaveRequest = {
      type: event.target.leaveType.value,
      fromDate: event.target.fromDate.value,
      toDate: event.target.toDate.value,
      reason: event.target.reason.value,
    };

    try {
      const response = await api.post(
        `/api/employeeLeaves/create/leave/${userId}`,
        newLeaveRequest
      );
      // Add the new leave request to the state and close the modal
      setLeaveRequests([response.data.leave, ...leaveRequests]); // Add the latest leave request at the front
      handleModal();
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request");
    }
  };

  // Pagination Logic
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

  return (
    <section className="md:ml-56 mt-16 bg-gray-50 p-4">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
        <div className="flex items-center my-auto">
          <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Leaves</h1>
        </div>
        <button
          onClick={handleModal}
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          <FaPencilAlt className="mr-2" />
          Leave Request
        </button>
      </div>

      {/* Leave History Section */}
      <div className="mt-8 bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {/* Vertical Line */}
            <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
            <h2 className="text-lg font-semibold text-blue-900">
              Leave History
            </h2>
          </div>
          {/* Filter and Sort Icons */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-purple-900 font-semibold bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
              <AiOutlineFilter className="mr-2" />
              Filter
            </button>
            <button className="flex items-center text-purple-900 font-semibold bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
              <AiOutlineSortAscending className="mr-2" />
              Sort
            </button>
          </div>
        </div>

        {/* Leave History Cards (Max 9 per page) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentRequests.map((request, index) => (
            <LeaveCard key={index} request={request} />
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
          <span className="px-4 py-2 bg-purple-600 text-white rounded-lg">
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

      {/* //       {/* Custom Modal Section */}
      <CustomModal isOpen={openModal} onClose={handleModal}>
        <div className="bg-blue-50 w-full p-6 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Leave Request</h2>
            <button onClick={handleModal} className="text-2xl">
              <MdClose />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {/* Leave Type Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Leave Type</label>
              <select
                name="leaveType"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Choose Leave Type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Paid Leave</option>
                <option>Monthly Leave</option>
                <option>Other</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-gray-700">From</label>
                <input
                  type="date"
                  name="fromDate"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">To</label>
                <input
                  type="date"
                  name="toDate"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Reason Textarea */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Reason</label>
              <textarea
                rows="4"
                name="reason"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your reason here"
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModal}
                className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg bg-gray-100 hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Request Now
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </section>
  );
};

export default LeaveApplication;
