const mongoose = require('mongoose');
const Counter = require('./Counter')

const mealDeliverySchema = new mongoose.Schema({
  _id: { type: Number },
    patientId: { type: Number, ref: 'Patient', required: true },
    mealPreparationId: { type: Number, ref: 'MealPreparation', required: true },
    deliveryPersonnelId: { type: Number, ref: 'DeliveryPersonnel', required: true },
    deliveryStatus: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
    deliveryTimestamp: { type: Date },
    deliveryNotes: { type: String },
    deliveryDeadline: { type: String, required: true }, 
  });
  mealDeliverySchema.pre('save', async function (next) {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { collectionName: 'mealdeliveries' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.sequenceValue;
    }
    next();
  });
  module.exports = mongoose.model('MealDelivery', mealDeliverySchema);
  