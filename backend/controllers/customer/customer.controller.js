const Customer = require('../../models/customer_model/customer.model');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = await Customer.create(customerData);
    res.status(201).json({ newCustomer, message: "Customer details added in DB successfully", success: "true" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update customer details
exports.updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customerData = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, customerData, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ updatedCustomer, message: "Customer details updated successfully", success: "true" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
