import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi'; // Delete icon
import { AiOutlinePlus } from 'react-icons/ai'; // Add icon
import api from '../../config/api';

const AddQuestionType = () => {
  const [questionType, setQuestionType] = useState('');
  const [questionTypesList, setQuestionTypesList] = useState([]);
  const token = sessionStorage.getItem('token'); // Get token from session storage

  // Fetch existing question types
  const fetchQuestionTypes = async () => {
    try {
      const response = await api.get('/api/assessment/question-type/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestionTypesList(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching question types');
    }
  };

  // Fetch question types on component mount
  useEffect(() => {
    fetchQuestionTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle add question type
  const handleAddQuestionType = async (e) => {
    e.preventDefault();
    if (questionType.trim()) {
      try {
        await api.post(
          '/api/assessment/question-type/add',
          { name: questionType },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success('Question type added successfully');
        setQuestionType(''); // Clear input
        fetchQuestionTypes(); // Fetch updated list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error adding question type');
      }
    } else {
      toast.error('Question type cannot be empty');
    }
  };

  // Handle delete question type
  const handleDeleteQuestionType = async (id) => {
    try {
      await api.delete(`/api/assessment/question-type/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Question type deleted successfully');
      fetchQuestionTypes(); // Fetch updated list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting question type');
    }
  };

  return (
    <div className="flex-1 min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl p-6 mx-auto bg-white border rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Add Question Type</h2>

        <form onSubmit={handleAddQuestionType} className="flex flex-col gap-4">
          <label htmlFor="questionTypeInput" className="text-sm text-gray-600">
            Enter Question Type
          </label>
          <div className="flex items-center gap-2">
            <input
              id="questionTypeInput"
              type="text"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="flex-1 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter a question type..."
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              <AiOutlinePlus size={18} /> Add
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Added Question Types</h3>
          <ul className="mt-4 space-y-2">
            {questionTypesList.map((item) => (
              <li
                key={item._id} // Unique key from the backend
                className="flex items-center justify-between p-4 rounded-lg shadow bg-gray-50 hover:bg-gray-100"
              >
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <button
                  onClick={() => handleDeleteQuestionType(item._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  <FiTrash2 size={18} /> Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionType;
