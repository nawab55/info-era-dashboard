const Activity = require("../../models/activity/activity.model");
const path = require("path");

// Create a new activity
const createActivity = async (req, res) => {
  try {
    const formData = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    // Process the single file upload for the image
    formData.image = req.file
      ? `${baseUrl}${req.file.filename}`
      : formData.image;

    // Create a new activity with the processed formData
    const newActivity = new Activity(formData);

    await newActivity.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Activity created successfully",
        activity: newActivity,
      });
  } catch (error) {
    console.error("Error creating activity", error);
    res.status(500).json({ message: "Failed to create activity", error });
  }
};

// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json({ success: true, activities });
  } catch (error) {
    console.error("Error fetching activities", error);
    res.status(500).json({ message: "Failed to fetch activities", error });
  }
};

// Update an activity
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    // Process the single file upload for the image if a new file is uploaded
    if (req.file) {
      formData.image = `${baseUrl}${req.file.filename}`;
    }

    const updatedActivity = await Activity.findByIdAndUpdate(id, formData, {
      new: true,
    });

    if (!updatedActivity) {
      return res
        .status(404)
        .json({ success: false, message: "Activity not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Activity updated successfully",
        activity: updatedActivity,
      });
  } catch (error) {
    console.error("Error updating activity", error);
    res.status(500).json({ message: "Failed to update activity", error });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res
        .status(404)
        .json({ success: false, message: "Activity not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity", error);
    res.status(500).json({ message: "Failed to delete activity", error });
  }
};

// Export controller functions
module.exports = {
  createActivity,
  getAllActivities,
  updateActivity,
  deleteActivity,
};
