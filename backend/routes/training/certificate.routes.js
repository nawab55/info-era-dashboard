const express = require("express");
const router = express.Router();
const {
  createCertificate,
  getCertificateById,
  getCertificateByRegNo,
  getAllCertificates,
  deleteCertificate,
} = require("../../controllers/training/certificate.controller");

// Middleware to validate registration number before query
// const validateRegNo = (req, res, next) => {
//   const regNo = decodeURIComponent(req.params.regNo);
//   // const regNoPattern = /^[A-Z]{2}\/[A-Z]{3}\/\d{3}$/;
//   // Updated pattern allowing any number of digits after the last "/"
//   const regNoPattern = /^[A-Z]{2}\/[A-Z]{3}\/\d+$/;

//   if (!regNoPattern.test(regNo)) {
//     return res.status(400).json({
//       message: "Invalid registration number format",
//     });
//   }

//   next();
// };

// POST route to create a certificate
router.post("/create-certificate", createCertificate);

// GET route to retrieve all certificates
router.get("/get-all", getAllCertificates);

// GET route to retrieve a specific certificate by Registration Number
router.get("/get-by-regno/:regNo", getCertificateByRegNo);

// GET route to retrieve a specific certificate by ID
router.get("/:id", getCertificateById);

// GET route to delete a specific certificate by ID
router.delete("/:id", deleteCertificate);

module.exports = router;
