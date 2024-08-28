const BBC = require("../../models/co-partners/bbc.model");

// Create BBC entry
exports.registerBBC = async (req, res) => {
  try {
    const bbc = await BBC.create(req.body);
    res.status(201).json({ message: "BBC Registered Successfully", bbc });
  } catch (error) {
    res.status(400).json({ message: "Error Registering BBC", error });
  }
};

// Fetch all BBC entries
exports.getAllBBC = async (req, res) => {
  try {
    const bbcList = await BBC.find();
    res.status(200).json(bbcList);
  } catch (error) {
    res.status(400).json({ message: "Error Fetching BBC", error });
  }
};

// Delete BBC entry
exports.deleteBBC = async (req, res) => {
  try {
    const { id } = req.params;
    await BBC.findByIdAndDelete(id);
    res.status(200).json({ message: "BBC Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error Deleting BBC", error });
  }
};
