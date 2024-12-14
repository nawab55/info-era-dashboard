const Certificate = require("../../models/training_model/certificate_model");

// Create Certificate
const createCertificate = async (req, res) => {
  try {
    const certificateData = req.body;
    const newCertificate = new Certificate(certificateData);
    await newCertificate.save();
    res.status(201).json({
      message: "Certificate added successfully",
      certificate: newCertificate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error adding the certificate", error });
  }
};

// Get All Certificates with Pagination
const getAllCertificates = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const certificates = await Certificate.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalCertificates = await Certificate.countDocuments();
    const totalPages = Math.ceil(totalCertificates / limit);

    res.status(200).json({
      success: true,
      certificates,
      totalPages,
      message: "certificates are found successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get Certificate by ID
const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the certificate",
      error,
    });
  }
};

// Get Certificate by Registration Number
const getCertificateByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;
    const certificate = await Certificate.findOne({ regNo });
    if (!certificate) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }
    res.status(200).json({
      success: true,
      data: certificate,
      message: "Certificate has been found seccesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error retrieving the certificate",
      error: error.message,
    });
  }
};

// Delete Certificate by ID
const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Certificate.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Certificate deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificateByRegNo,
  deleteCertificate,
};
