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



const AssessmentTest = () => {
  return (
    <div>
      <h1>heelloo</h1>
    </div>
  )
}

export default AssessmentTest

