const Ibc = require('../../models/co-partners/ibc.model');

// Create a new IBC registration
exports.createIbc = async (req, res) => {
  try {
    // Using the create method to directly create and save the document
    const ibc = await Ibc.create(req.body);
    res.status(201).json({ message: 'IBC registration successful', data: ibc });
  } catch (error) {
    res.status(400).json({ message: 'Error creating IBC registration', error });
  }
};


// Get all IBC registrations
exports.getAllIbc = async (req, res) => {
  try {
    const ibcs = await Ibc.find();
    res.status(200).json(ibcs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching IBC registrations', error });
  }
};
