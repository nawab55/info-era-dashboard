const Certificate = require("../../models/training_model/certificate_model");

// Create Certificate
const createCertificate = async (req, res) => {
  try {
    const certificateData = req.body;
    const newCertificate = new Certificate(certificateData);
    await newCertificate.save();
    res
      .status(201)
      .json({
        message: "Certificate added successfully",
        certificate: newCertificate,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error adding the certificate", error });
  }
};

// Get All Certificates
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error retrieving certificates", error });
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
    res
      .status(500)
      .json({
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
    if(!certificate){
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({message: "There was an error retrieving the certificate", error: error.message});
  }
}

module.exports = {
  createCertificate,
  getCertificates,
  getCertificateById,
  getCertificateByRegNo,
};
