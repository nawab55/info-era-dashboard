const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const { upload } = require('../../middleware/upload');
const userController = require('../../controllers/user/user.controller');

// User registration and login
// Get user by ID
router.get('/details/:userId', userController.getUserById);
// router.post('/register', userController.registerEmployee);
router.post('/login', userController.loginUser);

// Get all Users
router.get('/all/getalluser', userController.getAllUsers);

// Employee-specific routes
router.post('/register', upload, userController.registerEmployee); // Register a new employee
router.get('/employee', userController.getAllEmployees); // Get all employees
// router.get('/employee/:employeeId', userController.getEmployeeDetails); // Get employee details by ID
router.put('/employee/:employeeId', upload, userController.updateEmployeeDetails); // Update employee details by ID
router.delete('/employee/:employeeId', userController.deleteEmployeeDetails); // Delete employee details by ID

module.exports = router;
