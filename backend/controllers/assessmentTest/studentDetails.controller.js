const StudentDetails = require("../../models/assessmentTest_model/studentDetails.model");

// Add a new student and set cookies
exports.addStudent = async (req, res) => {
  try {
    const { name, email, mobile, course } = req.body;

    if (!name || !email || !mobile || !course) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

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
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
