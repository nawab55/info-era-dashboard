const BBC = require("../../models/co-partners/bbc.model");

// Create BBC entry
exports.registerBBC = async (req, res) => {
  try {
    const { name, company, gender, aadhaar, pan, gst, email, mobile, state, district } = req.body;

    if (
      !name ||
      !company ||
      !gender ||
      !aadhaar ||
      !pan ||
      !gst ||
      !email ||
      !mobile ||
      !state ||
      !district
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Using the create method to directly create and save the document
    await BBC.create({
      name,
      company,
      gender,
      aadhaar,
      pan,
      gst,
      email,
      mobile,
      state,
      district,
    });
    res
      .status(201)
      .json({ message: "BBC registration successful", success: true });
  } catch (error) {
    res.status(400).json({
      message: "Error creating BBC registration",
      success: false,
      error,
    });
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
