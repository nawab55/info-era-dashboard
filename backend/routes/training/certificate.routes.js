// routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createCertificate, 
    getCertificates, 
    getCertificateById,
    getCertificateByRegNo, 
} = require('../../controllers/training/certificate.controller');

// POST route to create a certificate
router.post('/create-certificate', createCertificate);

// GET route to retrieve all certificates
router.get('/get-all', getCertificates);

// GET route to retrieve a specific certificate by Registration Number
router.get('/get-by-regno/:regNo', getCertificateByRegNo);

// GET route to retrieve a specific certificate by ID
router.get('/:id', getCertificateById);

module.exports = router;
