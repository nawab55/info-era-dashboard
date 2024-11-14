const Customer = require('../../models/customer_model/customer.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');   // Import the built-in crypto module for random password generation
const jwt = require('jsonwebtoken');

// Function to generate a random password
const generateRandomPassword = (length = 10) => {
  // Generate a random password of the desired length using random bytes
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const profileImage = req.file ? `${baseUrl}${req.file.filename}`: null;
    customerData.profileImage = profileImage;
    // Generate a random password
    const randomPassword = generateRandomPassword();  // Default length is 10
    // Encrypt the generated password 
    const saltRounds = 10;  // Number of salt rounds for bcrypt
    const encryptedPassword = await bcrypt.hash(randomPassword, saltRounds);
    // Add the generated and encrypted passwords to customer data
    customerData.password = randomPassword;
    customerData.encryptedPassword = encryptedPassword;

    const newCustomer = await Customer.create(customerData);

    res.status(201).json({ newCustomer, message: "Customer details added in DB successfully", success: "true" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Customer Login
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find customer by email
    const customer = await Customer.findOne({ email });
    
    if(!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // Compare provided password with the stored encrypted password
    const isMatch = await bcrypt.compare(password, customer.encryptedPassword);
    if(!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
   // Generate JWT token for the customer
    const token = jwt.sign({ id: customer._id}, process.env.JWT_SECRET_KEY, { expiresIn: '3d'});

    res.status(200).json({ message: "Login successful", token, client: customer });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all customers (excluding encryptedPassword)
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().select('-encryptedPassword'); // Exclude encryptedPassword
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a customer by ID (excluding encryptedPassword)
exports.getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId).select('-encryptedPassword'); // Exclude encryptedPassword

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

// Update customer password
exports.resetPassword = async (req, res) => {
  try {
    const customerId = req.customer._id; // Get customer ID from the authenticated request
    const { previousPassword, newPassword } = req.body;

    // Find the customer by ID
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Compare the provided previous password with the stored encrypted password
    const isMatch = await bcrypt.compare(previousPassword, customer.encryptedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect previous password." });
    }

    // Encrypt the new password
    const saltRounds = 10;
    const encryptedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the password and encryptedPassword fields using findByIdAndUpdate
    await Customer.findByIdAndUpdate(
      customerId,
      {
        password: newPassword,
        encryptedPassword: encryptedNewPassword,
      },
      { new: true } // Option to return the updated document
    );

    res.status(200).json({ message: "Password updated successfully.", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log({message: error.message});
  }
};

