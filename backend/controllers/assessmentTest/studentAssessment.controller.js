const AssessmentResponse = require("../../models/assessmentTest_model/AssessmentResponse.model");
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
    const response = await AssessmentResponse.findOne({ "student.mobile": mobile }).populate("responses.questionId");
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "No answers found for the given student.",
      });
    }
    console.log("response data with populate question with questionId ",response);

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

    res.status(200).json({
      data: data, 
      message: "Student answers have been retrieved successfully.",
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

// Get dashboard summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const summary = await AssessmentResponse.aggregate([
      {
        $group: {
          _id: "$student.mobile",
          name: { $first: "$student.name" },
          totalQuestionsAnswered: { $sum: { $size: "$responses" } },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary.",
      error: error.message,
    });
  }
};



// exports.submitAssessment = async (req, res) => {
//   try {
//     const { studentDetails, questionTypeId, answers } = req.body;
//     console.log(studentDetails + ": " + answers + ":" + questionTypeId);

//     const responses = Object.entries(answers).map(([questionId, selectedOption]) => ({
//       questionId,
//       selectedOption, // Directly store "A", "B", "C", "D"
//     }));
//     const assessmentResponse = new AssessmentResponse({
//       student: studentDetails,
//       questionTypeId,
//       responses,
//     });

//     await assessmentResponse.save();
//     res.status(201).json({ success: true, message: "Assessment submitted successfully!" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to submit assessment." });
//   }
// };

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
