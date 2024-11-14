const Consulting = require("../../models/consulting/consulting.model");

const createConsulting = async (req, res) => {
  const { name, email, mobile, address, organizationName, consulting } =
    req.body;

  console.log({
    name,
    email,
    mobile,
    address,
    organizationName,
    consulting,
  });

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

const getAllConsulting = (req, res) => {};

const updateConsulting = (req, res) => {};

const deleteConsulting = (req, res) => {};

module.exports = {
  createConsulting,
  getAllConsulting,
  updateConsulting,
  deleteConsulting,
};
