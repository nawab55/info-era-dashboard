const HsnCode = require('../../models/product_model/hsncode.model');

// Add a new HSN code
exports.addHsnCode = async (req, res) => {
  try {
    const newHsnCode = new HsnCode(req.body);
    const savedHsnCode = await newHsnCode.save();
    res.status(201).json({ savedHsnCode, message: "HSN code added successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error adding HSN code', error });
  }
};

// Get all HSN codes
exports.getHsnCodes = async (req, res) => {
  try {
    const hsnCodes = await HsnCode.find();
    res.status(200).json({ hsnCodes, message: 'Fetched HSN codes successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching HSN codes', error });
  }
};
