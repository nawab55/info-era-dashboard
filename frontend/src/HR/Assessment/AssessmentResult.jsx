import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify"; // Import react-toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import api from "../../config/api"; // Axios instance

const AssessmentResult = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch student data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/api/assessment/student-details/all-students");

        // Validate the response and handle cases where the data may be malformed
        if (response.status === 200 && response.data?.success && Array.isArray(response.data.data)) {
          setStudents(response.data.data);
        } else {
          throw new Error("Unexpected response structure or no students found.");
        }
      } catch (error) {
        // Log the error to the console and show a toast notification
        console.error("Error fetching student data:", error);
        toast.error(error.response?.data?.message || "Failed to fetch student data. Please try again later.");
      }
    };

    fetchStudents();
  }, []);

  // Handle redirection to student response page
  const handleViewDetails = (student) => {
    console.log(student);
    
    navigate(`/hr/student-details/${student.mobile}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
        Student Reports
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-200">
          <thead>
            <tr className="text-gray-700 bg-gray-100">
              <th className="px-4 py-2 text-left border border-gray-200">#</th>
              <th className="px-4 py-2 text-left border border-gray-200">Name</th>
              <th className="px-4 py-2 text-left border border-gray-200">Mobile</th>
              <th className="px-4 py-2 text-left border border-gray-200">Course</th>
              <th className="px-4 py-2 text-center border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="transition-colors odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-200">{student.name}</td>
                  <td className="px-4 py-2 border border-gray-200">{student.mobile}</td>
                  <td className="px-4 py-2 border border-gray-200">{student.course}</td>
                  <td className="flex justify-center px-4 py-1 border border-gray-200">
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
                      onClick={() => handleViewDetails(student)}
                    >
                      <FaEye />
                      View Details
                    </button>
                    {/* <h1>View</h1> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-2 text-center text-gray-500 border border-gray-200"
                >
                  No student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentResult;
