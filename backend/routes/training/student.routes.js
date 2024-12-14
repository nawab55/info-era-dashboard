const express = require("express");
const router = express.Router();
const studentController = require("../../controllers/training/student.controller");

// Middleware to validate registration number before query
const validateRegNo = (req, res, next) => {
  const regNo = decodeURIComponent(req.params.regNo);
  //   const regNoPattern = /^[A-Z]{2}\/[A-Z]{3}\/\d{3}$/;

  // Updated pattern allowing any number of digits after the last "/"
  const regNoPattern = /^[A-Z]{2}\/[A-Z]{3}\/\d+$/;

  if (!regNoPattern.test(regNo)) {
    return res.status(400).json({
      message: "Invalid registration number format",
    });
  }

  next();
};

// Route to create a new student
router.post("/create-students", studentController.createStudent);

// Route to get the latest registration number
router.get("/latest-registration", studentController.getLatestRegistration);

// Route to get all students
router.get("/get-students", studentController.getStudents);

// Route to get student by registration number  "/get-by-regno/:regNo", validateRegNo,
router.get(
  "/get-student/:regNo",
  validateRegNo,
  studentController.getStudentByRegistrationNo
);

// Route to delete a student by ID
router.delete("/:id", studentController.deleteStudent);
module.exports = router;
