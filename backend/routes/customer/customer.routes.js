const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer
} = require('../../controllers/customer/customer.controller');

router.post('/createCustomer', createCustomer);
router.get('/getCustomer', getCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);

module.exports = router;
