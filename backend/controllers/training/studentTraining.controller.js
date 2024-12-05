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

// Get all student training submissions
exports.getStudentsSubmissionForm = async (req, res) => {
  try {
    let students = await StudentTraining.find();

    students = students.map((form) => {
      // Convert the Mongoose model to a plain object
      const plainForm = form.toObject();
      return {
        ...plainForm,
        profilePhoto: {
          ...plainForm.profilePhoto,
          src: "/api/file/" + plainForm.profilePhoto.src,
        },
      };
    });

    return res.status(200).json({
      success: true,
      message: "Training submissions retrieved successfully.",
      submission: students,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// Update a student training form by ID
exports.updateStudentSubmissionForm = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedForm = await StudentTraining.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return res
        .status(404)
        .json({ success: false, message: "Training form not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Training form updated successfully.",
      data: updatedForm,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// Delete a student training form by ID
exports.deleteStudentSubmissionForm = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForm = await StudentTraining.findByIdAndDelete(id);

    if (!deletedForm) {
      return res
        .status(404)
        .json({ success: false, message: "Training form not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Training form deleted successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
