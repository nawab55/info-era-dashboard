import { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi"
import { MdClose } from "react-icons/md";
import api from "../../config/api";
import { toast } from "react-toastify";
import CustomModal from "../../Components/Modal/CustomModal";

const ReportAProblem = () => {
  const [openModal, setOpenModal] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [issues, setIssues] = useState([]);

  // Fetch issues from the backend
  const fetchIssues = async () => {
    try {
      const response = await api.get("/api/message/issues", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
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
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
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
      <section className="md:ml-56 mt-16 bg-gray-50 p-4">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
        <div className="flex items-center my-auto">
          <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
        </div>
        <button
          onClick={handleModal}
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          <BiErrorCircle className="mr-2" />
          Report a Problem
        </button>
      </div>

      {/* Issues List */}
      <div className="mt-6 space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
              issue.status === "unresolved"
                ? "bg-red-100 text-gray-900"
                : "bg-green-100 text-gray-900"
            }`}
          >
            <div className="flex items-center">
              <MdClose className={`text-2xl mr-2 rounded-full text-white ${
                  issue.status === "unresolved"
                    ? "bg-red-600"
                    : "bg-green-600"
                }`} />
              <p>{issue.description}</p>
            </div>
            <div>
              <span
                className={`px-4 py-2 rounded-lg text-sm text-white ${
                  issue.status === "unresolved"
                    ? "bg-red-600"
                    : "bg-green-600"
                }`}
              >
                {issue.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      <CustomModal isOpen={openModal} onClose={handleModal}>
        <div className="bg-blue-50 w-full p-6 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center my-auto">
              <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
              <h2 className="text-xl font-semibold">Report A Problem</h2>
            </div>
            <button onClick={handleModal} className="text-2xl">
              <MdClose />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {/* Issue Description Textarea */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">
                Describe the problem:
              </label>
              <textarea
                rows="4"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your issue here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
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
    )
  }
  
  export default ReportAProblem