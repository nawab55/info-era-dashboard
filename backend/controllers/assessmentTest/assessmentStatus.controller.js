const AssessmentStatus = require("../../models/assessmentTest_model/assessmentStatus.model");

// Get the current assessment status
exports.getStatus = async (req, res) => {
  try {
    const status = await AssessmentStatus.findOne();
    if (!status) {
      return res.status(404).json({ success: false, message: "Status not found." });
    }
    res.status(200).json({ success: true, data: status });
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Update the assessment status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Active", "Inactive"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value." });
  }

  try {
    const existingStatus = await AssessmentStatus.findOne();

    if (existingStatus) {
      existingStatus.status = status;
      await existingStatus.save();
    } else {
      await AssessmentStatus.create({ status });
    }

    res.status(200).json({ success: true, message: "Status updated successfully." });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
