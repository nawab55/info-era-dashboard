const express = require('express');
const { createDomain, getDomains, updateDomain, deleteDomain } = require('../../controllers/domain/domain.controller');

const router = express.Router();

// Route to add a new domain
router.post('/create', createDomain);

// Route to get all domains
router.get('/get', getDomains);

// Route to update a domain by ID
router.put('/update/:id', updateDomain);

// Route to delete a domain by ID
router.delete('/delete/:id', deleteDomain);

module.exports = router;
