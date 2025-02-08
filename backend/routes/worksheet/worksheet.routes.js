const express = require("express");
const {
    createWorksheet,
    getEmployees,
    getWorksheetByDate,
    updateWorksheet,
    getWorksheetData,
    getAllWorksheets,
    deleteWorksheet
} = require("../../controllers/worksheet/worksheet.controller.js");
const { uploadSingleExcel } = require('../../middleware/upload.js'); // Update path to your multer config
const { authenticate } = require("../../middleware/auth.js");
const router = express.Router();

// Route to get all employees
router.get("/employees", getEmployees);

// Route to create a new worksheet
router.post("/creatework", uploadSingleExcel, createWorksheet);

// Route to get all worksheet data
router.get("/allData/:empId", authenticate, getWorksheetData);

// Route to get worksheet by employee ID and date
router.get("/view/:empId", getWorksheetByDate);

// Route to update a worksheet
router.put("/update/:empId", uploadSingleExcel, updateWorksheet);

// Route to get all worksheet reports
router.get("/reports", getAllWorksheets);

// Route to delete a worksheet by ID
router.delete("/delete/:id", deleteWorksheet);

module.exports = router;
