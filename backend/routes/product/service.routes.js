const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/product/service.controller');

// Add a new service
router.post('/services', serviceController.addService);

// Get all services
router.get('/services', serviceController.getServices);

module.exports = router;
