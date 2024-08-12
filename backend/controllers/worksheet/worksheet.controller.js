const Worksheet = require("../../models/worksheet_model/worksheet.model");
const User = require("../../models/user_model/User"); // Assuming employees are part of User model

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({}, "EmpId name designation"); // Fetch only necessary fields
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// Create a new worksheet entry
const createWorksheet = async (req, res) => {
  try {
    const { empId, empName, designation, date, projectName, work } = req.body;
    const newWorksheet = new Worksheet({
      empId,
      empName,
      designation,
      date,
      projectName,
      work,
    });
    const savedWorksheet = await newWorksheet.save();
    res.status(201).json(savedWorksheet);
  } catch (error) {
    res.status(500).json({ message: "Error saving worksheet", error });
    console.log({ error: error.message });
  }
};

// Get worksheet by employee ID and date
const getWorksheetByDate = async (req, res) => {
  try {
    const { empId } = req.params;
    const { date } = req.query;

    // Find worksheet by employee ID and date
    const worksheet = await Worksheet.find({ empId: empId, date: date });

    if (worksheet) {
      res.status(200).json(worksheet);
    } else {
      res.status(404).json({ message: "No worksheet found for this date" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching worksheet", error: error.message });
  }
};

const getWorksheetData = async (req, res) => {
  try {
    const { empId } = req.params;
    const worksheetData = await Worksheet.find({ empId });
    if (!worksheetData) {
      return res.status(404).json({ message: "worksheet not found " });
    }
    res
      .status(200)
      .json({
        worksheetData,
        message: "data getting for worksheet is successfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching worksheet", error: error.message });
  }
};

const updateWorksheet = async (req, res) => {
  try {
    const { empId } = req.params;
    const { date, projectName, work, workDone } = req.body;

    // Find the worksheet by employee ID and date
    const worksheet = await Worksheet.findOne({ empId, date });

    if (!worksheet) {
      return res.status(404).json({ message: "Worksheet not found" });
    }

    // Update the worksheet fields
    worksheet.projectName = projectName;
    worksheet.work = work;
    worksheet.workDone = workDone;

    // Save the updated worksheet
    const updatedWorksheet = await worksheet.save();
    res.status(200).json(updatedWorksheet);
  } catch (error) {
    res.status(500).json({ message: "Error updating worksheet", error });
  }
};

module.exports = {
  getEmployees,
  createWorksheet,
  getWorksheetByDate,
  getWorksheetData,
  updateWorksheet,
};
