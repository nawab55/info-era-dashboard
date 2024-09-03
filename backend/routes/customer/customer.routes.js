const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    loginCustomer,
    resetPassword
} = require('../../controllers/customer/customer.controller');
const { authenticate } = require('../../middleware/auth');

router.post('/createCustomer', createCustomer);
router.post('/login', loginCustomer);
router.get('/getCustomer', getCustomers);
router.get('/:id', authenticate, getCustomerById);
router.put('/update/reset-password', authenticate, resetPassword);
router.put('/:id', updateCustomer);

module.exports = router;
