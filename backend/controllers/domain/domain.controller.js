const Domain = require('../../models/domain_model/domain.model');

// Create a new domain entry
const createDomain = async (req, res) => {
  try {
    const domain = new Domain(req.body);
    await domain.save();
    res.status(201).json(domain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all domain entries
const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.status(200).json({domains, message: "domains data fetched successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createDomain,
    getDomains
}
