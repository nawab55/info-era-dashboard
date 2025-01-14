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

// Get report for a specific student
exports.getStudentReport = async (req, res) => {
  try {
    const { mobile } = req.params;

    const report = await AssessmentResponse.find({ "student.mobile": mobile })
      .populate("responses.questionId", "question options")
      .lean();

    if (!report.length) {
      return res.status(404).json({
        success: false,
        message: "No reports found for the given student.",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student report.",
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
