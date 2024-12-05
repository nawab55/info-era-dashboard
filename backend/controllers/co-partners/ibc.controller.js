const Ibc = require("../../models/co-partners/ibc.model");

// Create a new IBC registration
exports.createIbc = async (req, res) => {
  try {
    const { name, gender, aadhaar, pan, gst, email, mobile, state, district } =
      req.body;

    if (
      !name ||
      !gender ||
      !aadhaar ||
      !pan ||
      !email ||
      !mobile ||
      !state ||
      !district
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Using the create method to directly create and save the document
    await Ibc.create({
      name,
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
      .json({ message: "IBC registration successful", success: true });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error creating IBC registration",
        success: false,
        error,
      });
  }
};

// Get all IBC registrations
exports.getAllIbc = async (req, res) => {
  try {
    const ibcs = await Ibc.find();
    res.status(200).json(ibcs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching IBC registrations", error });
  }
};
