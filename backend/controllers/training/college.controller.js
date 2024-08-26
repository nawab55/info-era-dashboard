const College = require("../../models/training_model/college.model");

// Create a new college
const createCollege = async (req, res) => {
  try {
    console.log(req.body);
    const newCollege = new College(req.body);
    await newCollege.save();
    res.status(201).json({
      success: true,
      data: newCollege,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, });
    console.log(error.message)
  }
};

// Get all colleges
const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json({
      success: true,
      colleges: colleges,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCollege,
  getColleges,
};
