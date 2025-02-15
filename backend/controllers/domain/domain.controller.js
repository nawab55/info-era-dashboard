const Domain = require('../../models/domain_model/domain.model');

// Create a new domain entry
const createDomain = async (req, res) => {
  try {
    const domain = new Domain(req.body);
    await domain.save();
    res.status(201).json({ success: true, message: "Domain added successfully", data: domain });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add domain", error: error.message });
  }
};

// Get all domain entries
const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Domains fetched successfully", data: domains });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch domains", error: error.message });
  }
};

// Update domain entry
const updateDomain = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDomain = await Domain.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedDomain) {
      return res.status(404).json({ success: false, message: "Domain not found" });
    }

    res.status(200).json({ success: true, message: "Domain updated successfully", data: updatedDomain });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update domain", error: error.message });
  }
};

// Delete domain entry
const deleteDomain = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDomain = await Domain.findByIdAndDelete(id);

    if (!deletedDomain) {
      return res.status(404).json({ success: false, message: "Domain not found" });
    }

    res.status(200).json({ success: true, message: "Domain deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete domain", error: error.message });
  }
};

module.exports = {
    createDomain,
    getDomains,
    updateDomain,
    deleteDomain
}
