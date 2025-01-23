import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";

const StudentResultsDetails = () => {
  const { mobile } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchStudentResultsDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/assessment-test/student-answers/${mobile}`);
        console.log(response.data.data);
        if (response.data?.success && response.data?.data) {
          setStudentData(response.data.data);
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

    fetchStudentResultsDetails();
  }, [mobile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-xl animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-700">No Data Found</h2>
          <p className="mt-2 text-gray-500">No results found for this student.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 mt-6 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { student, responses } = studentData;

  // Calculate topic-wise scores
  const topicScores = {};
  responses.forEach((response) => {
    const { questionType, isCorrect } = response;
    if (!topicScores[questionType]) {
      topicScores[questionType] = { total: 0, correct: 0 };
    }
    topicScores[questionType].total += 1;
    if (isCorrect) {
      topicScores[questionType].correct += 1;
    }
  });

  const totalCorrect = responses.filter((resp) => resp.isCorrect).length;
  const overallPercentage = ((totalCorrect / responses.length) * 100).toFixed(1);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="p-6 text-center bg-white shadow-lg rounded-2xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl">
            Assessment Results
          </h1>
          <p className="text-xl text-gray-600">
            {student?.name || "Student"}
          </p>
        </div>

        {/* Student Details Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="text-sm text-gray-500">Student Name</div>
            <div className="text-lg font-semibold text-gray-800">{student?.name || "N/A"}</div>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="text-sm text-gray-500">Mobile Number</div>
            <div className="text-lg font-semibold text-gray-800">{student?.mobile || "N/A"}</div>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="text-sm text-gray-500">Total Questions</div>
            <div className="text-lg font-semibold text-gray-800">{responses?.length || 0}</div>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="text-sm text-gray-500">Overall Score</div>
            <div className="text-lg font-semibold text-gray-800">{overallPercentage}%</div>
          </div>
        </div>

        {/* Topic-wise Performance Table */}
        <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Topic-wise Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-600">Topic</th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-gray-600">Correct</th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-gray-600">Total</th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-gray-600">Score</th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(topicScores).map(([topic, { total, correct }]) => {
                  const percentage = ((correct / total) * 100).toFixed(1);
                  let performanceColor;
                  let performanceText;
                  
                  if (percentage >= 80) {
                    performanceColor = "bg-green-100 text-green-800";
                    performanceText = "Excellent";
                  } else if (percentage >= 60) {
                    performanceColor = "bg-blue-100 text-blue-800";
                    performanceText = "Good";
                  } else if (percentage >= 40) {
                    performanceColor = "bg-yellow-100 text-yellow-800";
                    performanceText = "Average";
                  } else {
                    performanceColor = "bg-red-100 text-red-800";
                    performanceText = "Needs Improvement";
                  }

                  return (
                    <tr key={topic} className="transition-colors duration-150 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{topic}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">{correct}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">{total}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="16" fill="none" className="text-gray-200 stroke-current" strokeWidth="2"/>
                              <circle cx="18" cy="18" r="16" fill="none" className="text-blue-500 stroke-current" 
                                strokeWidth="2" strokeDasharray={`${percentage} 100`}/>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${performanceColor}`}>
                          {performanceText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Overall Summary</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500">Total Topics</div>
              <div className="text-2xl font-bold text-gray-800">{Object.keys(topicScores).length}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500">Questions Attempted</div>
              <div className="text-2xl font-bold text-gray-800">{responses.length}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500">Correct Answers</div>
              <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500">Incorrect Answers</div>
              <div className="text-2xl font-bold text-red-600">{responses.length - totalCorrect}</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4 pb-8">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="px-6 py-3 text-white transition-colors duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none hover:shadow-xl"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentResultsDetails;