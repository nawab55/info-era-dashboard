const StudentTraining = require("../../models/training_model/studentTraining.model");

// Create a new student
exports.studentSubmissionForm = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      gender,
      fatherName,
      perCountry,
      perState,
      perDistrict,
      perPinCode,
      perAddress,
      corCountry,
      corState,
      corDistrict,
      corPinCode,
      corAddress,
      qualification,
      collegeName,
      passingYear,
      universityName,
      collegeRollNo,
      streamName,
      universityRegNo,
      interestedFor,
      profilePhoto,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !gender ||
      !fatherName ||
      !perCountry ||
      !perState ||
      !perDistrict ||
      !perPinCode ||
      !perAddress ||
      !corCountry ||
      !corState ||
      !corDistrict ||
      !corPinCode ||
      !corAddress ||
      !qualification ||
      !collegeName ||
      !passingYear ||
      !universityName ||
      !collegeRollNo ||
      !streamName ||
      !interestedFor ||
      !profilePhoto
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required!" });
    }

    await StudentTraining.create({
      name,
      email,
      mobile,
      gender,
      fatherName,
      perCountry,
      perState,
      perDistrict,
      perPinCode,
      perAddress,
      corCountry,
      corState,
      corDistrict,
      corPinCode,
      corAddress,
      qualification,
      collegeName,
      passingYear,
      universityName,
      collegeRollNo,
      streamName,
      universityRegNo,
      interestedFor,
      profilePhoto,
    });

    res.status(201).json({
      success: true,
      message: "Form Submitted Successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all students
exports.getStudentsSubmissionForm = async (req, res) => {
  try {
    const students = await StudentTraining.find();
    res.status(200).json({
      success: true,
      submission: students,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
