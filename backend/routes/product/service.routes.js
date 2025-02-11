const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/product/service.controller');

// Add a new service
router.post('/services', serviceController.addService);

// Get all services
router.get('/services', serviceController.getServices);

// Get a single service by ID
router.get('/services/:id', serviceController.getServiceById);

// Update a service
router.put('/services/:id', serviceController.updateService);

// Delete a service
router.delete('/services/:id', serviceController.deleteService);

module.exports = router;
