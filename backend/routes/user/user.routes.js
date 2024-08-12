const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const upload = require('../../middleware/upload');
const userController = require('../../controllers/user/user.controller');

// User registration and login
// router.post('/register', userController.registerEmployee);
router.post('/login', userController.loginUser);

// Get user by ID
router.get('/:userId', userController.getUserById);

// Employee-specific routes
router.post('/register', upload, userController.registerEmployee); // Register a new employee
router.get('/employee', userController.getAllEmployees); // Get all employees
// router.get('/employee/:employeeId', userController.getEmployeeDetails); // Get employee details by ID
router.put('/employee/:employeeId', upload, userController.updateEmployeeDetails); // Update employee details by ID
router.delete('/employee/:employeeId', userController.deleteEmployeeDetails); // Delete employee details by ID

module.exports = router;
