import { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdClose, MdCheck } from "react-icons/md";
import api from "../../config/api";
import { toast } from "react-toastify";

const ReportAProblem = () => {
  const [openModal, setOpenModal] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [issues, setIssues] = useState([]);

  // Fetch issues from the backend
  const fetchIssues = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await api.get(`/api/message/issues/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setIssues(response.data); // Fetch issues and store them in state
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newIssue = {
        description: issueDescription,
      };
      await api.post("/api/message/issues", newIssue, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      toast.success("Issue reported successfully!");
      fetchIssues(); // Refetch issues after submission
      setIssueDescription(""); // Clear the input
      handleModal(); // Close the modal
    } catch (error) {
      toast.error("Error reporting issue!");
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex-1 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen lg:p-6 p-2">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 border rounded">
        <div className="flex items-center my-auto">
          <div className="w-2 bg-blue-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
        </div>
        <button
          onClick={handleModal}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <BiErrorCircle className="mr-3" />
          Report a Problem
        </button>
      </div>

      {/* Issues List */}
      <div className=" mt-10 space-y-6">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`p-5 rounded-lg shadow-md flex justify-between items-center transition-transform duration-300 ${
              issue.status === "Unresolved"
                ? "bg-red-100 hover:bg-red-200"
                : "bg-green-100 hover:bg-green-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              {issue.status === "Unresolved" ? (
                <MdClose className="text-4xl p-2 text-white bg-red-600 rounded-full shadow-lg" />
              ) : (
                <MdCheck className="text-4xl p-2 text-white bg-green-600 rounded-full shadow-lg" />
              )}
              <p
                className={`text-lg font-medium ${
                  issue.status === "Unresolved"
                    ? "text-red-800"
                    : "text-green-800"
                }`}
              >
                {issue.description}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md ${
                issue.status === "Unresolved" ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {issue.status}
            </span>
          </div>
        ))}
      </div>

      <ReportModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        issueDescription={issueDescription}
        setIssueDescription={setIssueDescription}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default ReportAProblem;

const ReportModal = ({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  onClose,
  // eslint-disable-next-line react/prop-types
  onSubmit,
  // eslint-disable-next-line react/prop-types
  issueDescription,
  // eslint-disable-next-line react/prop-types
  setIssueDescription,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lg:w-1/2 w-[95%] bg-white p-8 rounded-lg shadow-xl"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-8 bg-blue-600 mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Report A Problem
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-red-600 transition duration-300"
          >
            <MdClose className="text-3xl" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={onSubmit}>
          {/* Issue Description Textarea */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Describe the problem:
            </label>
            <textarea
              rows={4}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your issue here"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
            >
              Request Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
