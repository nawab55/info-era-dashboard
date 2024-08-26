const mongoose = require('mongoose');

const employeeTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const EmployeeType = mongoose.model('EmployeeType', employeeTypeSchema);

module.exports = EmployeeType;
