const express = require('express');
const router = express.Router();
const invoiceController = require('../../controllers/invoice/invoice.controller');

// Route to add a new invoice inn db
router.post('/invoices', invoiceController.createInvoice);

// Route to get all Invoices
router.get('/invoices', invoiceController.getInvoices);

// Route to get single invoice by ID
router.get('/invoices/:id', invoiceController.getInvoiceById);

// Route to update an invioce
router.put('/invoices/:id', invoiceController.updateInvoice);

module.exports = router;