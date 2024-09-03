const Worksheet = require("../../models/worksheet_model/worksheet.model");
const User = require("../../models/user_model/User"); // Assuming employees are part of User model
const XLSX = require("xlsx")

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({}, "EmpId name designation"); // Fetch only necessary fields
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// Create a new worksheet entry
const createWorksheet = async (req, res) => {
  try {
    const { empId, empName, designation, date, projectName, work } = req.body;
    const { file } = req;
    
    const newWorksheet = new Worksheet({
      empId,
      empName,
      designation,
      date,
    });

    // If projectName and work exist, it means the type is Developer
    if (projectName && work) {
      newWorksheet.projectName = projectName;
      newWorksheet.work = work;
    }

    // If file exists, it means the type is Telecaller
    if (file) {
      const buffer = file.buffer;
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert the worksheet to JSON and store it in the excelData field
      const excelData = XLSX.utils.sheet_to_json(worksheet);
      // Map excelData to schema format
      const formattedData = excelData.slice(0).map((row, index) => {
        console.log('Row:', row); // Log each row for inspection
        return {
          sNo: index + 1,
          firstName: row['First Name'], // Access properties by their correct keys
          lastName: row['Last Name'],
          gender: row['Gender'],
          country: row['Country'],
          age: row['Age'],
          date: row['Date'],
          id: row['Id'],
        };
      });
      newWorksheet.excelData = formattedData; // Store the actual data, not just the object IDs
    }

    // Save the new worksheet to the database
    const savedWorksheet = await newWorksheet.save();

    res.status(201).json(savedWorksheet);
  } catch (error) {
    res.status(500).json({ message: "Error creating worksheet", error: error.message });
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
// get worksheet data for employee
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

// Get all worksheet reports
const getAllWorksheets = async (req, res) => {
  try {
    const { date } = req.query;
    let worksheets;

    if (date) {
      worksheets = await Worksheet.find({ date: date });
    } else {
      worksheets = await Worksheet.find({});
    }

    res.status(200).json(worksheets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching worksheets", error });
  }
};

module.exports = {
  getEmployees,
  createWorksheet,
  getWorksheetByDate,
  getWorksheetData,
  updateWorksheet,
  getAllWorksheets,
};
