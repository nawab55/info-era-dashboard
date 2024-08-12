const express = require("express");
const {
    createWorksheet,
    getEmployees,
    getWorksheetByDate,
    updateWorksheet,
    getWorksheetData
} = require("../../controllers/worksheet/worksheet.controller.js");
const { authenticate } = require("../../middleware/auth.js");
const router = express.Router();

// Route to get all employees
router.get("/employees", getEmployees);

// Route to create a new worksheet
router.post("/creatework", createWorksheet);

// Route to get all worksheet data
router.get("/allData/:empId", authenticate, getWorksheetData);

// Route to get worksheet by employee ID and date
router.get("/view/:empId", getWorksheetByDate);

// Route to update a worksheet
router.put("/update/:empId", updateWorksheet);

module.exports = router;
