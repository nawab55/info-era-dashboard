const express = require('express');
const router = express.Router();
const hsnCodeController = require('../../controllers/product/hsncode.controller');

// Add a new HSN code
router.post('/hsncode', hsnCodeController.addHsnCode);

// Get all HSN codes
router.get('/hsncodes', hsnCodeController.getHsnCodes);

// Update an existing HSN code
router.put('/hsncode/:id', hsnCodeController.updateHsnCode);

// Delete a HSN code by ID
router.delete('/hsncode/:id', hsnCodeController.deleteHsnCode);

module.exports = router;
