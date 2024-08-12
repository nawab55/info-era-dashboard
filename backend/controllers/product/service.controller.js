const Service = require('../../models/product_model/service.model');

// Add a new service
exports.addService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json({ savedService, message: "Service added successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error adding service', error });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services, message: 'Fetched services successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};
