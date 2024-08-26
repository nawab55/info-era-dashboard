const express = require('express');
const router = express.Router();
const employeeTypeController = require('../../controllers/user/employeeType.controller');

// Add employee type
router.post('/employee-types', employeeTypeController.addEmployeeType);

// Get all employee types
router.get('/employee-types', employeeTypeController.getEmployeeTypes);

// Delete employee type
router.delete('/employee-types/:id', employeeTypeController.deleteEmployeeType);

module.exports = router;
