const College = require("../../models/training_model/college.model");

// Create a new college
const createCollege = async (req, res) => {
  try {
    const { collegeName, collegeCode, address, website, mobileNo } = req.body;

    if (!collegeName || !collegeCode || !address || !mobileNo) {
      return res.status(400).json({
        success: false,
        message: "All fields except website are required.",
      });
    }
    const newCollege = new College(req.body);
    await newCollege.save();

    res.status(201).json({
      success: true,
      message: "College created successfully!",
      data: newCollege,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get paginated colleges
const getColleges = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Allow limit customization
    const skip = (page - 1) * limit;

    const [colleges, totalCount] = await Promise.all([
      College.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      College.countDocuments(),
    ]);
    // const colleges = await College.find()
    //   .skip(skip)
    //   .limit(limit)
    //   .sort({ createdAt: -1 });
    // const totalCount = await College.countDocuments();
    // console.log(colleges);

    res.status(200).json({
      success: true,
      colleges,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get all colleges
const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json({
      success: true,
      colleges: colleges,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a college by ID
const deleteCollege = async (req, res) => {
  try {
    const collegeId = req.params.id;
    const college = await College.findByIdAndDelete(collegeId);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "College deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCollege,
  getColleges,
  getAllColleges,
  deleteCollege,
};
