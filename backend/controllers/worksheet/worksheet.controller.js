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

    // Create a new worksheet object
    const newWorksheet = new Worksheet({
      empId,
      empName,
      designation,
      date,
      projectName,
      work,
    });

    // If file exists, parse it
    if (file) {
      const buffer = file.buffer;
      const workbook = XLSX.read(buffer, { type: "buffer" });

      // Initialize an empty array to store all sheet data
      let allSheetsData = [];

      // Iterate through all sheet names and store data
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet); // Parse sheet data into JSON

        // Format the sheet data into the correct schema format
        const formattedData = excelData.map((row, index) => ({
          sNo: index + 1,
          domainName: row['domain_name'] || "", 
          creationDate: row['create_date'] || "",
          expiryDate: row['expiry_date'] || "",
          domainRegistrarName: row['domain_registrar_name'] || "",
          registrantName: row['registrant_name'] || "",
          registrantCompany: row['registrant_company'] || "",
          registrantCity: row['registrant_city'] || "",
          registrantState: row['registrant_state'] || "",
          registrantZip: row['registrant_zip'] || "",
          registrantCountry: row['registrant_country'] || "",
          registrantEmail: row['registrant_email'] || "",
          registrantPhone: row['registrant_phone'] || "",
          response: row['Response'] || "",
          remark: row['remark'] || "",
          action: row['action'] || "",
        }));

        // Push formatted data to the allSheetsData array
        allSheetsData.push({ sheetName, data: formattedData });
      });
      // Now assign the formatted data to the excelData field in the worksheet
      newWorksheet.excelData = allSheetsData.flatMap(sheet => sheet.data);
    }

    // Save the new worksheet to the database
    const savedWorksheet = await newWorksheet.save();

    res.status(201).json(savedWorksheet);
  } catch (error) {
    console.error(error);
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
    if (!worksheetData || worksheetData.length === 0) {
      return res.status(404).json({ message: "No worksheet data found" });
    }

    res.status(200).json({
        worksheetData,
        message: "data getting for worksheet is successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching worksheet", error: error.message });
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
    // worksheet.projectName = projectName;
    // worksheet.work = work;
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
