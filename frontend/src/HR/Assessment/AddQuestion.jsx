import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import api from '../../config/api';

const AddQuestion = () => {
  const [questionTypes, setQuestionTypes] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, question: '', options: { A: '', B: '', C: '', D: '' }, correctAnswer: '' },
  ]);
  const [background, setBackground] = useState('');
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

  useEffect(() => {
    fetchQuestionTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add new question to the form
  const handleAddQuestion = () => {
    const newQuestionId = questions.length + 1;
    setQuestions([
      ...questions,
      { id: newQuestionId, question: '', options: { A: '', B: '', C: '', D: '' }, correctAnswer: '' },
    ]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/api/assessment/question/create',
        { questions, background, questionType: selectedQuestionType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Questions added successfully');
      setQuestions([
        { id: 1, question: '', options: { A: '', B: '', C: '', D: '' }, correctAnswer: '' },
      ]);
      setBackground('');
      setSelectedQuestionType('');
    } catch (error) {
      toast.error('Error adding questions.');
    }
  };

  // Update question details
  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'question') {
      updatedQuestions[index].question = value;
    } else if (field.startsWith('option')) {
      const optionKey = field.split('.')[1];
      updatedQuestions[index].options[optionKey] = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    }
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex-1 min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow">
        <h1 className="mb-6 text-2xl font-bold">Add Questions</h1>
        <form onSubmit={handleSubmit}>
          {/* Question Type Dropdown */}
          <div className="mb-4">
            <label htmlFor="questionType" className="block mb-2 text-gray-600">
              Question Type
            </label>
            <select
              id="questionType"
              value={selectedQuestionType}
              onChange={(e) => setSelectedQuestionType(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring"
            >
              <option value="">Select Question Type</option>
              {questionTypes.map((type) => (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Background Dropdown */}
          <div className="mb-4">
            <label htmlFor="background" className="block mb-2 text-gray-600">
              Background
            </label>
            <select
              id="background"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring"
            >
              <option value="">Select Background</option>
              <option value="Technical">Technical</option>
              <option value="Non-Technical">Non-Technical</option>
            </select>
          </div>

          {/* Questions Section */}
          {questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              <h3 className="mb-2 text-lg font-semibold">Question {q.id}</h3>
              <input
                type="text"
                placeholder={`Enter Question ${q.id}`}
                value={q.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring"
              />
              <div className="grid grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <input
                    key={option}
                    type="text"
                    placeholder={`Option ${option}`}
                    value={q.options[option]}
                    onChange={(e) => updateQuestion(index, `option.${option}`, e.target.value)}
                    className="p-3 border rounded focus:outline-none focus:ring"
                  />
                ))}
              </div>
              <div className="mt-4">
                <label htmlFor={`correctAnswer-${q.id}`} className="block mb-2 text-gray-600">
                  Correct Answer
                </label>
                <select
                  id={`correctAnswer-${q.id}`}
                  value={q.correctAnswer}
                  onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                  className="w-full p-3 border rounded focus:outline-none focus:ring"
                >
                  <option value="">Select Correct Answer</option>
                  {['A', 'B', 'C', 'D'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center gap-2 mt-4 text-blue-500 hover:text-blue-600"
          >
            <AiOutlinePlus size={20} />
            Add Question
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit Questions
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
