const express = require('express');
const { createDomain, getDomains } = require('../../controllers/domain/domain.controller');

const router = express.Router();

router.post('/create', createDomain);
router.get('/get', getDomains);

module.exports = router;
