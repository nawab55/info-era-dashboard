import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../../config/api";
import { toast } from 'react-toastify';

const StudentResponseDetails = () => {
  const { mobile } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentResponseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/assessment-test/student-answers/${mobile}`);
        if (response.data) {
          console.log(response.data);
          setStudentData(response.data);
          toast.success("Student data loaded successfully!");
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

  const { student, stats, answers } = studentData;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        {student.name}&apos;s Assessment Details
      </h1>
      <div className="mb-6 text-center">
        <p className="text-lg text-gray-600">
          Mobile: <span className="font-semibold">{student.mobile}</span>
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Summary</h2>
        <ul className="p-4 bg-white rounded-md shadow-md">
          <li className="mb-2 text-gray-700">
            Total Questions Attempted: <span className="font-bold">{stats.totalQuestions}</span>
          </li>
          <li className="mb-2 text-gray-700">
            Correct Answers:{" "}
            <span className="font-bold text-green-600">{stats.correctAnswers}</span>
          </li>
          <li className="text-gray-700">
            Incorrect Answers:{" "}
            <span className="font-bold text-red-600">{stats.incorrectAnswers}</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Answers</h2>
        <table className="w-full text-sm border border-collapse border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Question Type</th>
              <th className="px-4 py-2 border">Question</th>
              <th className="px-4 py-2 border">Options</th>
              <th className="px-4 py-2 border">Your Answer</th>
              <th className="px-4 py-2 border">Correct Answer</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr
                key={index}
                className={`${
                  answer.status === "correct" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{answer.questionType}</td>
                <td className="px-4 py-2 border">{answer.question}</td>
                <td className="px-4 py-2 border">
                  <ul className="list-disc">
                    {Object.entries(answer.options).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-bold">{key}: </span>
                        {value}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border">{answer.selectedAnswer}</td>
                <td className="px-4 py-2 border">{answer.correctAnswer}</td>
                <td className="px-4 py-2 text-center border">
                  {answer.status === "correct" ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-600" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentResponseDetails;
