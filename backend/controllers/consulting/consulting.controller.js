const Consulting = require("../../models/consulting/consulting.model");

const createConsulting = async (req, res) => {
  const { name, email, mobile, address, organizationName, consulting } =
    req.body;

  if (
    !name ||
    !email ||
    !mobile ||
    !address ||
    !organizationName ||
    !consulting
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All Field Are Required!" });
  }

  try {
    await Consulting.create({
      name,
      email,
      mobile,
      address,
      organizationName,
      consulting,
    });

    return res.status(201).json({
      success: true,
      message: "Consulting form Submitted Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

const getAllConsulting = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const consultants = await Consulting.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const totalConsultants = await Consulting.countDocuments();

    return res.status(200).json({
      success: true,
      data: consultants,
      totalPages: Math.ceil(totalConsultants / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateConsulting = (req, res) => {};

const deleteConsulting = async (req, res) => {
  try {
    const { id } = req.params;
    const consultant = await Consulting.findByIdAndDelete(id);
    if (!consultant) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Consultant deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting consultant.",
    });
  }
};

module.exports = {
  createConsulting,
  getAllConsulting,
  updateConsulting,
  deleteConsulting,
};
