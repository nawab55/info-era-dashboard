const mongoose = require("mongoose");

// Schema for individual items in the invoice
const itemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    hsn: {
      type: String,
    },
    qty: {
      type: Number,
      default: 1,
    },
    price: {
      type: String,
      default: "1.00",
    },
  },
  { _id: false }
);

// Schema for company information
const companyInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    address: {
      type: String,
    },
    gstin: {
      type: String,
    },
    cin: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { _id: false }
);

// Schema for buyer details
const buyerDetailsSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { _id: false }
);

// Main invoice schema
const invoiceSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
    unique: true,
  },
  date: {
    type: String,
  },
  cashierName: {
    type: String,
  },
  buyerDetails: buyerDetailsSchema,
  items: [itemSchema],
  discount: {
    type: String,
  },
  cgst: {
    type: String,
  },
  sgst: {
    type: String,
  },
  deliveryNote: {
    type: String,
  },
  modeOfPayment: {
    type: String,
  },
  referenceNo: {
    type: String,
  },
  buyersOrderNo: {
    type: String,
  },
  dispatchedDocNo: {
    type: String,
  },
  dispatchedThrough: {
    type: String,
  },
  destination: {
    type: String,
  },
  termsOfDelivery: {
    type: String,
  },
  orderId: {
    type: String,
  },
  totalAmount: {
    type: String
  },
  companyInfo: companyInfoSchema,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
});

// Create a model from the schema
const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
