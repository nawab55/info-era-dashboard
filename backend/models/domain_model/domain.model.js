// models/Domain.js
const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  domainName: {
    type: String, 
    required: true 
},
  customerName: {
    type: String, 
    required: true 
},
  customerMobile: { 
    type: String, 
    required: true 
},
  whatsappNumber: { 
    type: String 
},
  email: { 
    type: String, 
    required: true 
},
  purchaseDate: { 
    type: String, 
    required: true 
},
  expiryDate: { 
    type: String, 
    required: true 
},
  hosting: {
    type: String,
    required: true
  },
  ssl: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  renewableAmount: { 
    type: Number, 
    required: true },
});

module.exports = mongoose.model('Domain', domainSchema);
