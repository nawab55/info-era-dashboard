import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../../config/api";
import { toast } from "react-toastify";

const StudentResponseDetails = () => {
  const { mobile } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentResponseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/assessment-test/student-answers/${mobile}`);
        // console.log(response.data.data);
        if (response.data.success) {
          setStudentData(response.data.data);
          // toast.success("Student data loaded successfully!");
        } else {
          toast.error("No data found for the given student.");
        }
      } catch (error) {
        toast.error("Failed to fetch student details.");
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentResponseDetails();
  }, [mobile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-700">No Data Found</h2>
        <p className="text-gray-500">No responses found for this student.</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { student, responses } = studentData;

  const totalQuestions = responses.length;
  const correctAnswersCount = responses.filter((resp) => resp.isCorrect).length;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        {student.name}&apos;s Assessment Responses
      </h1>

      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Student Details</h2>
        <p className="text-gray-600">
          <strong>Name:</strong> {student.name}
        </p>
        <p className="text-gray-600">
          <strong>Mobile:</strong> {student.mobile}
        </p>
        
      </div>

      <div className="mt-8">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">Options</th>
              <th className="px-4 py-2">Selected Option</th>
              <th className="px-4 py-2">Correct Answer</th>
              <th className="px-4 py-2">Background</th>
              <th className="px-4 py-2">Question Type</th>
              <th className="px-4 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr
                key={response.questionId}
                className={`border-b ${response.isCorrect ? "bg-green-100" : "bg-red-100"}`}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{response.questionDetails?.question || "N/A"}</td>
                <td className="px-4 py-2">
                  <ul>
                    {response.questionDetails?.options &&
                      Object.entries(response.questionDetails.options).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                  </ul>
                </td>
                <td className="px-4 py-2">{response.selectedOption || "N/A"}</td>
                <td className="px-4 py-2">{response.correctAnswer || "N/A"}</td>
                <td className="px-4 py-2">{response.background || "N/A"}</td>
                <td className="px-4 py-2">{response.questionType || "N/A"}</td>
                <td className="px-4 py-2 text-center">
                  {response.isCorrect ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-4xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Summary</h2>
        <p className="text-gray-600">
          <strong>Total Questions Submitted:</strong> {totalQuestions}
        </p>
        <p className="text-gray-600">
          <strong>Correct Answers:</strong> {correctAnswersCount}
        </p>
      </div>
    </div>
  );
};

export default StudentResponseDetails;
