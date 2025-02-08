const express = require('express');
const router = express.Router();
const invoiceController = require('../../controllers/invoice/invoice.controller');
const { authenticate } = require('../../middleware/auth');

// Route to add a new invoice inn db
router.post('/create-invoice', invoiceController.createInvoice);

// Route to update an invioce
router.put('/update-invoice/:id', invoiceController.updateInvoice);

// Route to get all Invoices
router.get('/get-invoices', invoiceController.getInvoices);

// Route to get invoices for a specific customer
router.get('/customer/:customerId', authenticate, invoiceController.getInvoicesByCustomerId);

// Route to get single invoice by ID
router.get('/invoices/:id', invoiceController.getInvoiceById);



module.exports = router;