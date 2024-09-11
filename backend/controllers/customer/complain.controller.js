const Complain = require('../../models/customer_model/complain.model');
const path = require('path');

// Create a new complain
const createComplain = async (req, res) => {
  try {
    const { tokenId, complainTitle, description } = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const complainFile = req.file ? `${baseUrl}${req.file.filename}` : null;

    // Create a new complain with the provided data
    const newComplain = new Complain({
      tokenId,
      complainTitle,
      description,
      complainFile,
    });

    await newComplain.save();
    res.status(201).json({ success: true, message: 'Complain created successfully', complain: newComplain });
  } catch (error) {
    console.error('Error creating complain', error);
    res.status(500).json({ message: 'Failed to create complain', error });
  }
};

// Get all complains
const getAllComplains = async (req, res) => {
  try {
    const complains = await Complain.find({});
    res.status(200).json({ success: true, complains });
  } catch (error) {
    console.error('Error fetching complains', error);
    res.status(500).json({ message: 'Failed to fetch complains', error });
  }
};

// Export controller functions
module.exports = {
  createComplain,
  getAllComplains,
};
