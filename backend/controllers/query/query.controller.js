const ClientQuery = require("../../models/Query/query.model");

const createQuery = async (req, res) => {
  const {
    name,
    gender,
    country,
    businessType,
    mobile,
    state,
    requirementFor,
    email,
    district,
    address,
    pinCode,
  } = req.body;

  if (
    !name ||
    !gender ||
    !country ||
    !businessType ||
    !mobile ||
    !state ||
    !requirementFor ||
    !email ||
    !district ||
    !address ||
    !pinCode
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All Field Are Required!" });
  }

  try {
    await ClientQuery.create({
      name,
      gender: gender.toLowerCase(),
      country,
      businessType,
      mobile,
      state,
      requirementFor,
      email,
      district,
      address,
      pinCode,
    });

    return res
      .status(201)
      .json({ success: true, message: "Query Submitted Successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error!" });
  }
};

const getQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is specified
    const limit = 10; // Set limit to 10 documents per page
    const skip = (page - 1) * limit;

    // Fetch data with pagination
    const data = await ClientQuery.find().skip(skip).limit(limit);

    // Get total document count for calculating total pages
    const totalDocuments = await ClientQuery.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      data,
      pagination: {
        currentPage: page,
        totalPages,
        limit,
        totalDocuments,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteQuery = async (req, res) => {
  const id = req.params.id;

  try {
    await ClientQuery.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Query Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { createQuery, getQuery, deleteQuery };
