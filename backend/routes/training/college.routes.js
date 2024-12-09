const express = require("express");
const router = express.Router();
const {
  createCollege,
  getColleges,
  deleteCollege,
  getAllColleges,
} = require("../../controllers/training/college.controller");

// Route to create a new college
router.post("/create-colleges", createCollege);

// Route to fetch all colleges with pagination
router.get("/get-colleges", getColleges);
// Route to fetch all colleges 
router.get("/get-all-colleges", getAllColleges);

// Route to delete a college by ID
router.delete("/:id", deleteCollege);

module.exports = router;
