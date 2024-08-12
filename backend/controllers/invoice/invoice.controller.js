const Invoice = require('../../models/invoice_model/invoice.model');

// Function to create a new invoice
const createInvoice = async (req, res) => {
    try {
        const invoiceData = req.body;

        // Fetch the latest invoice to get the highest invoice number
        const latestInvoice = await Invoice.findOne().sort({ invoiceNo: -1}).exec();

        //Determine the next invoice number
        let count;
        if(latestInvoice) {
            const latestInvoiceNo = latestInvoice.invoiceNo;
            const lastCount = parseInt(latestInvoiceNo.split('/')[1]);
            count = lastCount + 1;
        } else {
            count = 1;   // Initialize count to 1 if no invoices exist
        }
        invoiceData.invoiceNo = `IE/${count}`;

        // create new invoice with the incremented invoice number
        const newInvoice = await Invoice.create(invoiceData);
        res.status(201).json({invoiceData: newInvoice, message: "Invoice data added in db successfully", success: "true"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating a invoice', error, success: "false"});
    }
}

// Function to get all Invoices
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().exec();
        const latestInvoice = await Invoice.findOne().sort({ invoiceNo: -1 }).exec();
        let count;
        if(latestInvoice) {
            const latestInvoiceNo = latestInvoice.invoiceNo;
            const lastCount = parseInt(latestInvoiceNo.split('/')[1]);
            count = lastCount + 1;
        } else {
            count = 1;
        }
        const latestInvoiceNo = `IE/${count}`;
        res.status(200).json({invoices, latestInvoiceNo, success: "true", message: "Getting all Invoices"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error Fetching invoices and latest invoice number', error })
    }
};

// function to get Single invoice by id
const getInvoiceById = async (req, res) => {
    try {
        const invoiceId = req.params.id;
        const invoice = await Invoice.findById(invoiceId);
        if(!invoice){
            return res.status(404).json({message: 'Invoice not Found'});
        }
        res.status(200).json({invoice, message: 'Fetched single invoice'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching Single Invoice', error});
    }
};

// function to update an invoice by id
const updateInvoice = async (req, res) => {
    try {
        const invoiceId = req.params.id;
        const invoiceData = req.body;
        const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, invoiceData, { new: true });

        if(!updatedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json({updatedInvoice, message: 'Invoice updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating invoice', error});
    }
};

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice 
}