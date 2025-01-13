const mongoose = require('mongoose');

const pantrySchema = new mongoose.Schema({
    staffName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    location: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Pantry', pantrySchema);