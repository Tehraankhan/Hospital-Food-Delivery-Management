
const mongoose = require('mongoose');
const Counter = require('./Counter')

const mealPreparationSchema = new mongoose.Schema({
  _id: { type: Number },
    patientId: {type:Number, ref: 'Patient', required: true },
    dietChartId: { type:Number, ref: 'DietChart', required: true },
    mealType: { type: String, enum: ['Morning', 'Evening', 'Night'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    preparedBy: { type:Number, ref: 'Pantry' },
    preparationDeadline: { type: String ,required: true }, 
  });

  mealPreparationSchema.pre('save', async function (next) {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { collectionName: 'mealpreparations' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.sequenceValue;
    }
    next();
  });

  
  module.exports = mongoose.model('MealPreparation', mealPreparationSchema);
  