/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';

const QuestionListReports = () => {
  const [questions, setQuestions] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState('');
  const [background, setBackground] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const token = sessionStorage.getItem('token');

  // Fetch question types
  const fetchQuestionTypes = async () => {
    try {
      const response = await api.get('/api/assessment/question-type/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestionTypes(response.data);
    } catch (error) {
      toast.error('Error fetching question types.');
    }
  };

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await api.get('/api/assessment/question/question-list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(response.data);
      setFilteredQuestions(response.data); // Initialize filtered questions
    } catch (error) {
      toast.error('Error fetching questions.');
    }
  };

  // Handle filter change
  const handleFilterChange = () => {
    const filtered = questions.filter((q) => {
      const matchesType = selectedQuestionType
        ? q.questionType === selectedQuestionType
        : true;
      const matchesBackground = background ? q.background === background : true;
      return matchesType && matchesBackground;
    });
    setFilteredQuestions(filtered);
  };

  // Delete question
  const handleDeleteQuestion = async (questionSetId, questionId) => {
    try {
      const response = await api.delete(
        `/api/assessment/question/delete/${questionSetId}/${questionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data.message);

      // Remove the question from the frontend
      setFilteredQuestions((prev) =>
        prev.map((qSet) =>
          qSet._id === questionSetId
            ? {
                ...qSet,
                questions: qSet.questions.filter((q) => q._id !== questionId),
              }
            : qSet
        )
      );
    } catch (error) {
      toast.error('Error deleting question.');
    }
  };

  useEffect(() => {
    fetchQuestionTypes();
    fetchQuestions();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [selectedQuestionType, background]);

  return (
    <div className="flex-1 max-h-screen p-6 overflow-y-auto bg-gray-100">
    <div className="p-8 mx-auto bg-white rounded-lg shadow max-w-7xl">
      <h1 className="mb-6 text-2xl font-bold">Question List Reports</h1>

      {/* Filters */}
      <div className="flex gap-6 mb-6">
        <select
          value={selectedQuestionType}
          onChange={(e) => setSelectedQuestionType(e.target.value)}
          className="p-3 border rounded focus:outline-none focus:ring"
        >
          <option value="">Filter by Question Type</option>
          {questionTypes.map((type) => (
            <option key={type._id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className="p-3 border rounded focus:outline-none focus:ring"
        >
          <option value="">Filter by Background</option>
          <option value="Technical">Technical</option>
          <option value="Non-Technical">Non-Technical</option>
        </select>
      </div>

      {/* Question Table */}
      <div className="max-h-[70vh] overflow-y-auto overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              <th className="p-4 border border-gray-300">Question</th>
              <th className="p-4 border border-gray-300">Option A</th>
              <th className="p-4 border border-gray-300">Option B</th>
              <th className="p-4 border border-gray-300">Option C</th>
              <th className="p-4 border border-gray-300">Option D</th>
              <th className="p-4 border border-gray-300">Answer</th>
              <th className="p-4 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((qSet) =>
                qSet.questions.map((q) => (
                  <tr key={q._id} className="hover:bg-gray-100">
                    <td className="p-4 border border-gray-300">{q.question}</td>
                    <td className="p-4 border border-gray-300">{q.options.A}</td>
                    <td className="p-4 border border-gray-300">{q.options.B}</td>
                    <td className="p-4 border border-gray-300">{q.options.C}</td>
                    <td className="p-4 border border-gray-300">{q.options.D}</td>
                    <td className="p-4 border border-gray-300">{q.correctAnswer}</td>
                    <td className="p-4 border border-gray-300">
                      <button
                        onClick={() =>
                          handleDeleteQuestion(qSet._id, q._id)
                        }
                        className="flex items-center gap-2 text-red-600"
                      >
                        <AiOutlineDelete /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-4 text-center border border-gray-300"
                >
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default QuestionListReports;
