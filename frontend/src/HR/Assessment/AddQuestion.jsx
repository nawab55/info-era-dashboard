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
              <textarea
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





// import { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { toast } from "react-toastify";

// const AssessmentTest = () => {
//   // State to manage the form
//   const [questionType, setQuestionType] = useState("");
//   const [questions, setQuestions] = useState([
//     {
//       question: "",
//       options: ["", "", "", ""],
//       answer: "",
//       type: "",
//       paperType: "",
//     },
//   ]);

//   // Dropdown options
//   const questionTypeOptions = ["G.K", "AP", "Maths", "Science"];
//   const paperTypeOptions = ["Technical", "Non-Technical"];

//   // Handle changes for a specific question
//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   // Add a new question
//   const addNewQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         question: "",
//         options: ["", "", "", ""],
//         answer: "",
//         type: "",
//         paperType: "",
//       },
//     ]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       questionType,
//       questions,
//     };

//     try {
//       const response = await fetch("http://localhost:5454/api/assessment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!");
//         setQuestionType("");
//         setQuestions([
//           {
//             question: "",
//             options: ["", "", "", ""],
//             answer: "",
//             type: "",
//             paperType: "",
//           },
//         ]);
//       } else {
//         throw new Error("Submission failed.");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="flex-1 min-h-screen p-6 bg-gray-100">
//       <h1 className="mb-6 text-2xl font-bold text-center">Assessment Test</h1>
//       <form onSubmit={handleSubmit} className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
//         {/* Add Question Type */}
//         <div className="mb-6">
//           <label className="block mb-2 text-sm font-medium" htmlFor="questionType">
//             Question Type
//           </label>
//           <select
//             id="questionType"
//             className="block w-full p-2 border rounded-md"
//             value={questionType}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             <option value="">Select Question Type</option>
//             {questionTypeOptions.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Questions Section */}
//         {questions.map((q, index) => (
//           <div key={index} className="pt-4 mb-6 border-t">
//             <h2 className="mb-4 text-lg font-semibold">
//               Question {index + 1}
//             </h2>

//             {/* Question Type */}
//             <div className="mb-4">
//               <label
//                 className="block mb-2 text-sm font-medium"
//                 htmlFor={`type-${index}`}
//               >
//                 Question Type
//               </label>
//               <select
//                 id={`type-${index}`}
//                 className="block w-full p-2 border rounded-md"
//                 value={q.type}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "type", e.target.value)
//                 }
//               >
//                 <option value="">Select Question Type</option>
//                 {questionTypeOptions.map((type, i) => (
//                   <option key={i} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Paper Type */}
//             <div className="mb-4">
//               <label
//                 className="block mb-2 text-sm font-medium"
//                 htmlFor={`paperType-${index}`}
//               >
//                 Paper Type
//               </label>
//               <select
//                 id={`paperType-${index}`}
//                 className="block w-full p-2 border rounded-md"
//                 value={q.paperType}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "paperType", e.target.value)
//                 }
//               >
//                 <option value="">Select Paper Type</option>
//                 {paperTypeOptions.map((type, i) => (
//                   <option key={i} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Question Text */}
//             <div className="mb-4">
//               <label
//                 className="block mb-2 text-sm font-medium"
//                 htmlFor={`question-${index}`}
//               >
//                 Question
//               </label>
//               <input
//                 type="text"
//                 id={`question-${index}`}
//                 className="block w-full p-2 border rounded-md"
//                 value={q.question}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "question", e.target.value)
//                 }
//               />
//             </div>

//             {/* Options */}
//             {q.options.map((option, optIndex) => (
//               <div className="mb-4" key={optIndex}>
//                 <label
//                   className="block mb-2 text-sm font-medium"
//                   htmlFor={`option-${index}-${optIndex}`}
//                 >
//                   Option {optIndex + 1}
//                 </label>
//                 <input
//                   type="text"
//                   id={`option-${index}-${optIndex}`}
//                   className="block w-full p-2 border rounded-md"
//                   value={option}
//                   onChange={(e) => {
//                     const updatedOptions = [...q.options];
//                     updatedOptions[optIndex] = e.target.value;
//                     handleQuestionChange(index, "options", updatedOptions);
//                   }}
//                 />
//               </div>
//             ))}

//             {/* Answer */}
//             <div>
//               <label
//                 className="block mb-2 text-sm font-medium"
//                 htmlFor={`answer-${index}`}
//               >
//                 Answer
//               </label>
//               <input
//                 type="text"
//                 id={`answer-${index}`}
//                 className="block w-full p-2 border rounded-md"
//                 value={q.answer}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "answer", e.target.value)
//                 }
//               />
//             </div>
//           </div>
//         ))}

//         {/* Add New Question */}
//         <button
//           type="button"
//           onClick={addNewQuestion}
//           className="flex items-center justify-center w-full p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//         >
//           <FaPlus className="mr-2" />
//           Add Question
//         </button>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="block w-full p-2 mt-6 text-white bg-green-600 rounded-md hover:bg-green-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssessmentTest;
