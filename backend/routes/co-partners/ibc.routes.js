// routes/ibc.routes.js
const express = require('express');
const router = express.Router();
const { createIbc, getAllIbc, deleteIbc } = require('../../controllers/co-partners/ibc.controller');

// Route to create a new IBC registration
router.post('/register', createIbc);

// Route to get all IBC registrations
router.get('/all', getAllIbc);

// Route to delete Ibc by its ID
router.delete("/delete/:id", deleteIbc);


module.exports = router;
