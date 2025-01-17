const AssessmentResponse = require("../../models/assessmentTest_model/AssessmentResponse.model");

// Add a new assessment response
exports.submitTest = async (req, res) => {
  try {
    const { studentDetails, answers } = req.body;

    // Map answers into the required format
    const responses = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    const newResponse = new AssessmentResponse({
      student: studentDetails,
      responses,
    });

    await newResponse.save();

    res.status(201).json({
      success: true,
      message: "Test submitted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit test.",
      error: error.message,
    });
  }
};

// Get saved answers for a specific student
exports.getStudentAnswers = async (req, res) => {
  try {
    const { mobile } = req.params;
    console.log (mobile);

    // Fetch the student response by mobile number
    const response = await AssessmentResponse.findOne({ "student.mobile": mobile })
      .populate("responses.questionId", "question options correctAnswer")
      .lean();

      if (!response) {
        return res.status(404).json({
          success: false,
          message: "No answers found for the given student.",
        });
      }

      // Calculate stats
    const totalQuestions = response.responses.length;
    let correctAnswers = 0;

    response.responses.forEach((resp) => {
      if (resp.answer === resp.questionId.correctAnswer) {
        correctAnswers++;
      }
    });
    res.status(200).json({
      success: true,
      student: response.student,
      answers: response.responses,
      stats: {
        totalQuestions,
        correctAnswers,
        incorrectAnswers: totalQuestions - correctAnswers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student answers.",
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
