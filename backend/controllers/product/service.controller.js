const Service = require('../../models/product_model/service.model');

// Add a new service
exports.addService = async (req, res) => {
  try {
    // Validation - Ensure all fields are provided
    const { categoryName, hsnCode, service, amount } = req.body;
    if (!categoryName || !hsnCode || !service || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save new service
    const newService = new Service(req.body);
    const savedService = await newService.save();
    
    res.status(201).json({
      savedService,
      message: 'Service added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding service', error: error.message });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: 'No services found' });
    }
    res.status(200).json({
      services,
      message: 'Fetched services successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ 
      success: true, 
      data: service, 
      message: 'Fetched service successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};
// Update a service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, hsnCode, service, amount } = req.body;

    // Validate the input data
    if (!categoryName || !hsnCode || !service || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find service by ID and update it
    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Ensures that the update also validates the fields
    });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      updatedService,
      message: 'Service updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete service by ID
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      deletedService,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};