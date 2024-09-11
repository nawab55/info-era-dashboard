const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    loginCustomer,
    resetPassword,
} = require('../../controllers/customer/customer.controller');
const { authenticate } = require('../../middleware/auth');
const { uploadImage } = require('../../middleware/upload');

router.post('/createCustomer', uploadImage.single('profileImage'), createCustomer);
router.post('/login', loginCustomer);
router.get('/get/allCustomer', getAllCustomers);
router.get('/details/:id', authenticate, getCustomerById);
router.put('/update/reset-password', authenticate, resetPassword);
router.put('/details/update/:id', updateCustomer);

module.exports = router;
