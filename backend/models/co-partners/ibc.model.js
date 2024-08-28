// models/ibc.model.js
const mongoose = require('mongoose');

const IbcSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  gender: { 
    type: String, 
    required: true 
},
  aadhaar: { 
    type: String, 
    required: true 
},
  pan: { 
    type: String, 
    required: true 
},
  gst: { 
    type: String 
},
  email: { 
    type: String, 
    required: true 
},
  mobile: { 
    type: String, 
    required: true 
},
  state: { 
    type: String, 
    required: true 
},
  district: { 
    type: String, 
    required: true 
},
}, { timestamps: true });

module.exports = mongoose.model('Ibc', IbcSchema);
