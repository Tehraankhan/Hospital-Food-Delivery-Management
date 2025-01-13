const mongoose = require('mongoose');

const mealDeliverySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    mealPreparationId: { type: mongoose.Schema.Types.ObjectId, ref: 'MealPreparation', required: true },
    deliveryPersonnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel', required: true },
    deliveryStatus: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
    deliveryTimestamp: { type: Date },
    deliveryNotes: { type: String },
    deliveryDeadline: { type: String, required: true }, 
  });
  
  module.exports = mongoose.model('MealDelivery', mealDeliverySchema);
  