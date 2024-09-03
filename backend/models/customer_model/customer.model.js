const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  gstNo: {
    type: String,
    required: true
  },
  gstName: {
    type: String,
    required: true
  },
  password: {
    type: String, // Store the plain generated password
    required: true
  },
  encryptedPassword: {
    type: String, // Store the encrypted version of the password
    required: true
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
