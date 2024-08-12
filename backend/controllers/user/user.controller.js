const bcrypt = require('bcryptjs');
const User = require('../../models/user_model/User');
const jwt = require("jsonwebtoken");

// Register a new employee
const registerEmployee = async (req, res) => {
  try {
    const formData = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Process file uploads
    formData.signature = req.files && req.files.signature ? `${baseUrl}${req.files.signature[0].filename}` : formData.signature;
    formData.aadhaarFrontImage = req.files && req.files.aadhaarFrontImage ? `${baseUrl}${req.files.aadhaarFrontImage[0].filename}` : formData.aadhaarFrontImage;
    formData.aadhaarBackImage = req.files && req.files.aadhaarBackImage ? `${baseUrl}${req.files.aadhaarBackImage[0].filename}` : formData.aadhaarBackImage;
    formData.panImage = req.files && req.files.panImage ? `${baseUrl}${req.files.panImage[0].filename}` : formData.panImage;

    // Check if user already exists
    let user = await User.findOne({ email: formData.email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    user = new User(formData);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.status(201).json({ success: true, message: 'Employee details created successfully', employee: user });
  } catch (error) {
    console.error("Error creating employee details", error);
    res.status(500).json({ message: "Failed to create employee details", error });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: "false", message: "User not Found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: "false", message: "Password not matching" });
    }

    const payload = {
      user: {
        userId: user._id,
        empType: user.empType,
        EmpId: user.EmpId
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    const { password: pwd, mobile: mob, ...userWithoutSensitiveData } = user.toObject();

    res.status(200).json({ success: "true", message: "Login successful", token, role: user.role, user: userWithoutSensitiveData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');  // Exclude password from the response

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error or User detail retrieval failed');
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' });
    res.status(200).json({ employees, success: true, message: "All employees fetched" });
  } catch (error) {
    console.error("Error fetching employee details", error);
    res.status(500).json({ message: "Failed to fetch employee details", error });
  }
};

// Get employee details by ID
// const getEmployeeDetails = async (req, res) => {
//   try {
//     const employeeId = req.params.employeeId;
//     const employee = await User.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     return res.status(200).json({ employee, success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error or employee detail retrieval failed" });
//   }
// };

// Update employee details by ID
const updateEmployeeDetails = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const formData = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // Process file uploads
    formData.signature = req.files && req.files.signature ? `${baseUrl}${req.files.signature[0].filename}` : formData.signature;
    formData.aadhaarFrontImage = req.files && req.files.aadhaarFrontImage ? `${baseUrl}${req.files.aadhaarFrontImage[0].filename}` : formData.aadhaarFrontImage;
    formData.aadhaarBackImage = req.files && req.files.aadhaarBackImage ? `${baseUrl}${req.files.aadhaarBackImage[0].filename}` : formData.aadhaarBackImage;
    formData.panImage = req.files && req.files.panImage ? `${baseUrl}${req.files.panImage[0].filename}` : formData.panImage;

    const updatedEmployee = await User.findByIdAndUpdate(employeeId, formData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee details updated successfully", success: true, employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee details", error);
    res.status(500).json({ message: "Failed to update employee details", error });
  }
};

// Delete employee details by ID
const deleteEmployeeDetails = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const deletedEmployee = await User.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee details deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting employee details", error);
    res.status(500).json({ message: "Failed to delete employee details", error });
  }
};

module.exports = {
  registerEmployee,
  loginUser,
  getUserById,
  getAllEmployees,
  // getEmployeeDetails,
  updateEmployeeDetails,
  deleteEmployeeDetails,
};
