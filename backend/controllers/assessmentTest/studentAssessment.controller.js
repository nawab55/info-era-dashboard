const AssessmentResponse = require("../../models/assessmentTest_model/AssessmentResponse.model");
const StudentDetails = require("../../models/assessmentTest_model/studentDetails.model");
// Add a new assessment response
exports.submitAssessment = async (req, res) => {
  try {
    const { studentDetails, responses } = req.body;

    // Construct the assessment response
    const assessmentResponse = new AssessmentResponse({
      student: studentDetails,
      responses, // Directly store the responses array with questionTypeId, questionId, and selectedOption
    });

    await assessmentResponse.save();
    res.status(201).json({ success: true, message: "Assessment submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to submit assessment." });
  }
};

// Get student answers by studetn mobile number with question
exports.getStudentAnswers = async (req, res) => { 
  try {
    const { mobile } = req.params;
    // Fetch the student's responses
    // const response = await AssessmentResponse.findOne({ "student.mobile": mobile }).populate("responses.questionId");
    const response = await AssessmentResponse.findOne({ "student.mobile": mobile }).populate("responses.questionTypeId");
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "No answers found for the given student.",
      });
    }
    // console.log("response data with populate question with questionId ",response);
    const processedResponses = response.responses.map((resp) => {
      // console.log("responses array data ",resp.questionTypeId);
      // console.log("responses array questionId ",resp.questionId);
      // Find the question in the `questions` array of the `questionTypeId`
      const matchedQuestion = resp.questionTypeId.questions.find(
        (q) => q._id.toString() === resp.questionId.toString()
      );
      // console.log("question which is match in questions array ",matchedQuestion);

      // Extract the correctAnswer if a match is found
      const correctAnswer = matchedQuestion ? matchedQuestion.correctAnswer : null;

      // Check if the selectedOption matches the correctAnswer
      const isCorrect = correctAnswer === resp.selectedOption;

      // Return the enhanced response object
      return {
        questionId: resp.questionId,
        questionTypeId: resp.questionTypeId._id,
        background: resp.questionTypeId.background,
        questionType: resp.questionTypeId.questionType,
        selectedOption: resp.selectedOption,
        correctAnswer,
        isCorrect,
        questionDetails: matchedQuestion ? {
          question: matchedQuestion.question,
          options: matchedQuestion.options,
        } : null,
      };
    });

    // Prepare the result with additional calculation for attempted and incorrect answers
    const attemptedQuestions = processedResponses.filter((resp) => resp.selectedOption).length;
    const incorrectAnswers = processedResponses.filter((resp) => resp.selectedOption && !resp.isCorrect).length;
    const totalCorrectAnswers = processedResponses.filter((resp) => resp.isCorrect).length;

    const result = {
      student: response.student,
      responses: processedResponses,
      attemptedQuestions,
      incorrectAnswers,
      totalCorrectAnswers,
      totalQuestions: processedResponses.length,
      createdAt: response.createdAt,
      submittedAt: response.submittedAt,
    };

    // Prepare the final response
    // const result = {
    //   student: response.student,
    //   responses: processedResponses,
    //   createdAt: response.createdAt,
    //   submittedAt: response.submittedAt,
    // };

    // Send the processed data to the frontend
    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Error fetching student answers:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching student answers.",
      error: error.message,
    });
  }
};

// delete student answers and studentDetails
 exports.deleteStudentAnswers = async (req, res) => {
  try {
    const { mobile } = req.params;

    // Delete the assessment response
    const assessmentDeletion = await AssessmentResponse.deleteOne({ "student.mobile": mobile });

    // Delete the student details
    const studentDeletion = await StudentDetails.deleteOne({ mobile });
    if (assessmentDeletion.deletedCount === 0 && studentDeletion.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No assessment response or student details found for the given student or mobile.",
      });
    }

    res.status(200).json({ success: true, message: "Student assessment response and details deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete student data.", 
      error: error.message 
    });
  }
};


// // Get saved answers for a specific student
// exports.getStudentAnswers = async (req, res) => {
//   try {
//     const { mobile } = req.params;
//     console.log (mobile);

//     // Fetch the student response by mobile number
//     const response = await AssessmentResponse.findOne({ "student.mobile": mobile })
//       .populate("responses.questionId", "question options correctAnswer")
//       .lean();

//       if (!response) {
//         return res.status(404).json({
//           success: false,
//           message: "No answers found for the given student.",
//         });
//       }

//       // Calculate stats
//     const totalQuestions = response.responses.length;
//     let correctAnswers = 0;

//     response.responses.forEach((resp) => {
//       if (resp.answer === resp.questionId.correctAnswer) {
//         correctAnswers++;
//       }
//     });
//     res.status(200).json({
//       success: true,
//       student: response.student,
//       answers: response.responses,
//       stats: {
//         totalQuestions,
//         correctAnswers,
//         incorrectAnswers: totalQuestions - correctAnswers,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch student answers.",
//       error: error.message,
//     });
//   }
// };


// Structure the data for easier frontend rendering
    // const data = {
    //   student: response.student,
    //   stats: {
    //     totalQuestions: response.responses.length,
    //     correctAnswers: response.responses.filter(
    //       (r) => r.selectedOption === r.questionId.correctAnswer
    //     ).length,
    //     incorrectAnswers: response.responses.filter(
    //       (r) => r.selectedOption !== r.questionId.correctAnswer
    //     ).length,
    //   },
    //   answers: response.responses.map((r) => ({
    //     questionType: r.questionId.questionType,
    //     question: r.questionId.question,
    //     options: r.questionId.options,
    //     correctAnswer: r.questionId.correctAnswer,
    //     selectedAnswer: r.selectedOption,
    //     status: r.selectedOption === r.questionId.correctAnswer ? "correct" : "incorrect",
    //   })),
    // };

    // res.status(200).json({
    //   data: data, 
    //   message: "Student answers have been retrieved successfully.",
    // });
