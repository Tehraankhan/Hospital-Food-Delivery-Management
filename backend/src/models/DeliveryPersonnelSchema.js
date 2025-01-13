const mongoose = require('mongoose');

const DeliveryPersonneShema  = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    OtherDetails: { type: String},
  });
  
  module.exports = mongoose.model('DeliveryPersonnel',DeliveryPersonneShema );