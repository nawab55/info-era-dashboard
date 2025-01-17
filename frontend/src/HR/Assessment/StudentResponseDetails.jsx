import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../../config/api";

const StudentResponseDetails = () => {
    const { mobile } = useParams();
    const [studentData, setStudentData] = useState(null);
  
    useEffect(() => {
      const fetchStudentResponseDetails = async () => {
        try {
          const response = await api.get(
            `/api/assessment-test/student-answers/${mobile}`
          );
          setStudentData(response.data);
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      };
  
      fetchStudentResponseDetails();
    }, [mobile]);
  
    if (!studentData) {
      return <div>Loading...</div>;
    }
  
    const { student, answers, stats } = studentData;
  
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
              Total Questions Attempted:{" "}
              <span className="font-bold">{stats.totalQuestions}</span>
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
          <table className="w-full border border-collapse border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Question</th>
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
                    answer.answer === answer.questionId.correctAnswer
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{answer.questionId.question}</td>
                  <td className="px-4 py-2 border">{answer.answer}</td>
                  <td className="px-4 py-2 border">
                    {answer.questionId.correctAnswer}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {answer.answer === answer.questionId.correctAnswer ? (
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

export default StudentResponseDetails
