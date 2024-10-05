const Alert = require("../../models/notification_model/alert.model");

// Add a new alert
exports.createAlert = async (req, res) => {
  try {
    const { alertType, title, message } = req.body;
    const newAlert = new Alert({
      alertType,
      title,
      message,
    });
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: "Error creating alert", error });
  }
};

// Fetch all alerts (sorted by newest first)
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }); // Sort by date (newest first)
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alerts", error });
  }
};
