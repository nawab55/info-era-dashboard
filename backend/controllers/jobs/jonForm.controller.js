const jobForm = require("../../models/jobs_model/jobForm.model");

const createJobForm = async (req, res) => {
  const {
    name,
    email,
    fatherName,
    country,
    gender,
    mobile,
    state,
    district,
    address,
    pinCode,
    qualification,
    resume,
  } = req.body;

  if (
    !name ||
    !email ||
    !fatherName ||
    !country ||
    !gender ||
    !mobile ||
    !state ||
    !district ||
    !address ||
    !pinCode ||
    !qualification ||
    !resume
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All Field Are Required!" });
  }

  try {
    await jobForm.create({
      name,
      email,
      fatherName,
      country,
      gender,
      mobile,
      state,
      district,
      address,
      pinCode,
      qualification,
      resume,
    });

    return res.status(201).json({
      success: true,
      message: "Job form data Submitted Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

// Get all job forms
const getAllJobsForm = async (req, res) => {
  try {
    let forms = await jobForm.find(); // Fetch Mongoose models

    forms = forms.map((form) => {
      // Convert the Mongoose model to a plain object
      const plainForm = form.toObject();
      return {
        ...plainForm,
        resume: {
          ...plainForm.resume,
          src: "/api/file/" + plainForm.resume.src,
        },
      };
    });

    return res.status(200).json({
      success: true,
      message: "Job forms retrieved successfully.",
      data: forms,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// Update a job form by ID
const updateJobForm = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedForm = await jobForm.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return res
        .status(404)
        .json({ success: false, message: "Job form not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Job form updated successfully.",
      data: updatedForm,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// Delete a job form by ID
const deleteJobForm = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForm = await jobForm.findByIdAndDelete(id);

    if (!deletedForm) {
      return res
        .status(404)
        .json({ success: false, message: "Job form not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Job form deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

module.exports = {
  createJobForm,
  getAllJobsForm,
  updateJobForm,
  deleteJobForm,
};
