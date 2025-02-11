const HsnCode = require('../../models/product_model/hsncode.model');

// // Add a new HSN code
// exports.addHsnCode = async (req, res) => {
//   try {
//     const newHsnCode = new HsnCode(req.body);
//     const savedHsnCode = await newHsnCode.save();
//     res.status(201).json({ savedHsnCode, message: "HSN code added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding HSN code', error });
//   }
// };

// Add a new HSN code
exports.addHsnCode = async (req, res) => {
  const { categoryName, hsnCode } = req.body;
  if (!categoryName || !hsnCode) {
    return res.status(400).json({ message: "Category Name and HSN Code are required." });
  }
  
  try {
    const newHsnCode = new HsnCode({ categoryName, hsnCode });
    const savedHsnCode = await newHsnCode.save();
    res.status(201).json({ savedHsnCode, message: "HSN code added successfully" });
  } catch (error) {
    console.error("Error adding HSN code:", error);
    res.status(500).json({ message: 'Error adding HSN code', error });
  }
};

// Update an existing HSN code
exports.updateHsnCode = async (req, res) => {
  const { id } = req.params;
  const { categoryName, hsnCode } = req.body;

  if (!categoryName || !hsnCode) {
    return res.status(400).json({ message: "Category Name and HSN Code are required." });
  }

  try {
    const updatedHsnCode = await HsnCode.findByIdAndUpdate(
      id,
      { categoryName, hsnCode },
      { new: true, runValidators: true }
    );
    if (!updatedHsnCode) {
      return res.status(404).json({ message: "HSN code not found." });
    }
    res.status(200).json({ updatedHsnCode, message: "HSN code updated successfully" });
  } catch (error) {
    console.error("Error updating HSN code:", error);
    res.status(500).json({ message: 'Error updating HSN code', error });
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

// Delete a specific HSN code
exports.deleteHsnCode = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCode = await HsnCode.findByIdAndDelete(id);

    if (!deletedCode) {
      return res.status(404).json({
        success: false,
        message: "HSN code not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "HSN code deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};