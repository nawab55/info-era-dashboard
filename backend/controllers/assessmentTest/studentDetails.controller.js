const StudentDetails = require("../../models/assessmentTest_model/studentDetails.model");
const AssessmentResponse = require("../../models/assessmentTest_model/AssessmentResponse.model"); // Import AssessmentResponse model
// const Question = require("../../models/assessmentTest_model/question.model"); // Import Question model

// Add a new student and set cookies
exports.addStudent = async (req, res) => {
  try {
    const { name, email, mobile, course } = req.body;
    // Validate that all fields are provided
    if (!name || !email || !mobile || !course) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
     // Check if the student is already registered (by email or mobile)
    const existingStudent = await StudentDetails.findOne({
      $or: [{ email }, { mobile }] // Check if either email or mobile already exists
    });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Student is already registered with this email or mobile number." });
    }
    // Save new student to the database
    const savedStudent = await StudentDetails.create({ name, email, mobile, course });

    // Set cookies securely
    res
      .cookie("student_name", name, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .cookie("student_mobile", mobile, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .cookie("course", course, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(201)
      .json({
        success: true,
        message: "Student profile details added successfully",
        data: savedStudent,
      });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get student details from cookies
exports.getStudentCookies = (req, res) => {
  try {
    const { student_name, student_mobile, course } = req.cookies;

    if (!student_name || !student_mobile || !course) {
      return res.status(400).json({ success: false, message: "No student details found in cookies." });
    }

    res.status(200).json({
      success: true,
      data: { name: student_name, mobile: student_mobile, course},
    });
  } catch (error) {
    console.error("Error retrieving student cookies:", error);
    res.status(500).json({ success: false, message: "something went wrong.", error: error.message });
  }
};

// Fetch all students with their assessment responses
exports.getAllStudentsWithAssessment = async (req, res) => {
  try {
    // Fetch all students
    const students = await StudentDetails.find();

    if (!students || students.length === 0) {
      return res.status(404).json({ success: false, message: "No students found." });
    }

    // Process each student and their assessments
    const studentsWithAssessment = await Promise.all(
      students.map(async (student) => {
        // Fetch assessment response for the student and populate questionTypeId
        const response = await AssessmentResponse.findOne({ "student.mobile": student.mobile })
          .populate("responses.questionTypeId");

        if (!response) {
          return {
            ...student.toObject(),
            totalQuestions: 0,
            attemptedQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            overallScore: 0, // Percentage score
            responses: [],
          };
        }

        // Process the responses
        const processedResponses = response.responses.map((resp) => {
          // Find the matched question in the `questionTypeId`'s `questions` array
          const matchedQuestion = resp.questionTypeId.questions.find(
            (q) => q._id.toString() === resp.questionId.toString()
          );

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
            questionDetails: matchedQuestion
              ? {
                  question: matchedQuestion.question,
                  options: matchedQuestion.options,
                }
              : null,
          };
        });

        // Calculate assessment summary
        const totalQuestions = processedResponses.length;
        const attemptedQuestions = processedResponses.filter((resp) => resp.selectedOption).length;
        const correctAnswers = processedResponses.filter((resp) => resp.isCorrect).length;
        // const incorrectAnswers = totalQuestions - correctAnswers;
        const incorrectAnswers = processedResponses.filter((resp) => resp.selectedOption && !resp.isCorrect).length;

        // Calculate the overall score as a percentage
        const overallScore =
          totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;

        return {
          ...student.toObject(),
          totalQuestions,
          attemptedQuestions,
          correctAnswers,
          incorrectAnswers,
          overallScore, // Percentage score
          responses: processedResponses,
        };
      })
    );

    // Send the final data
    res.status(200).json({
      success: true,
      data: studentsWithAssessment,
      message: "Students with assessment data found.",
    });
  } catch (error) {
    console.error("Error fetching students with assessments:", error);
    res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
  }
};



// Fetch all students and join with assessment responses based on mobile number
// exports.getAllStudentsData = async (req, res) => {
//   try {
//     // Aggregation query to join students, assessment responses, and question details
//     const studentsWithResponses = await StudentDetails.aggregate([
//       {
//         $lookup: {
//           from: 'assessmentresponses', // The collection to join
//           localField: 'mobile', // Field from the students collection
//           foreignField: 'student.mobile', // Field from the assessmentresponses collection
//           as: 'responses' // The alias for the joined data
//         }
//       },
//       {
//         $unwind: {
//           path: '$responses',
//           preserveNullAndEmptyArrays: true // Allow students without responses to be included
//         }
//       },
//       {
//         $lookup: {
//           from: 'questions', // The collection to join for the question details
//           localField: 'responses.responses.questionTypeId', // Field from the responses to match questionTypeId
//           foreignField: '_id', // Field from the questions collection
//           as: 'responses.responses.questionDetails' // The alias for the populated question details
//         }
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           email: 1,
//           mobile: 1,
//           course: 1,
//           "responses.responses.selectedOption": 1, // Include selectedOption of the response
//           "responses.responses.questionDetails": { questionText: 1, options: 1 }, // Include question text and options
//         }
//       }
//     ]);

//     if (!studentsWithResponses || studentsWithResponses.length === 0) {
//       return res.status(404).json({ success: false, message: "No students found." });
//     }
    
//     res.status(200).json({ success: true, data: studentsWithResponses, message: "All students found." });
//   } catch (error) {
//     console.error("Error fetching students with responses:", error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };