const Student = require('../../models/training_model/student_model');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    console.log(req.body);
    
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({
      success: true,
      data: newStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
