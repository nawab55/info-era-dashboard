const express = require('express');
const router = express.Router();
const { createComplain, getAllComplains } = require('../../controllers/customer/complain.controller');
const { uploadComplainFile } = require('../../middleware/upload');

// Route to create a new complain
router.post('/create', uploadComplainFile, createComplain);

// Route to get all complains
router.get('/get-all', getAllComplains);

module.exports = router;
