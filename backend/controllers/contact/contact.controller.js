const Contact = require("../../models/contact/contact.model");

const createContact = async (req, res) => {
  const { name, email, subject, mobile, message } = req.body;

  if (!name || !email || !subject || !mobile || !message) {
    return res.status(400).json({
      success: false,
      message: "All Fields Are Required!",
    });
  }

  try {
    await Contact.create({ name, email, subject, mobile, message });

    return res
      .status(201)
      .json({ success: true, message: "Message Sent Successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

const getAllContact = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is specified
    const limit = 10; // Set limit to 10 documents per page
    const skip = (page - 1) * limit;

    // Fetch data with pagination
    const data = await Contact.find().skip(skip).limit(limit);

    // Get total document count for calculating total pages
    const totalDocuments = await Contact.countDocuments();
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
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;

  try {
    await Contact.findByIdAndDelete(id);
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

module.exports = { createContact, getAllContact, deleteContact };
