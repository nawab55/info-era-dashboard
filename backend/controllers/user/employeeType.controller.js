const EmployeeType = require('../../models/user_model/employeeType.model');

// Add new employee type
exports.addEmployeeType = async (req, res) => {
  try {
    const { type } = req.body;
    const newEmployeeType = new EmployeeType({ type });
    await newEmployeeType.save();
    res.status(201).json({ employeeType: newEmployeeType, message: "Employee Type is submitted"});
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: 'Error adding employee type', error: error.message });
  }
};

// Get all employee types
exports.getEmployeeTypes = async (req, res) => {
  try {
    const employeeTypes = await EmployeeType.find();
    res.status(200).json(employeeTypes);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching employee types', error });
  }
};

// Delete employee type
exports.deleteEmployeeType = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeType.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee type deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting employee type', error });
  }
};
