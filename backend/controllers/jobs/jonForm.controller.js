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

  console.log({
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

const getAllJobsForm = (req, res) => {};

const updateJobForm = (req, res) => {};

const deleteJobForm = (req, res) => {};

module.exports = {
  createJobForm,
  getAllJobsForm,
  updateJobForm,
  deleteJobForm,
};
