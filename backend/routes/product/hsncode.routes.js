const express = require('express');
const router = express.Router();
const hsnCodeController = require('../../controllers/product/hsncode.controller');

// Add a new HSN code
router.post('/hsncode', hsnCodeController.addHsnCode);

// Get all HSN codes
router.get('/hsncodes', hsnCodeController.getHsnCodes);

module.exports = router;
