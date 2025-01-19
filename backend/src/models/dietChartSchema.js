const mongoose = require('mongoose');
const Counter = require('./Counter')




const dietChartSchema = new mongoose.Schema({
  _id: { type: Number },
    patientId: {type:Number},
    morningMeal: {
      mealName:{ type: String },
      ingredients: [{ type: String, required: true }],
      instructions: { type: String },
    },
    eveningMeal: {
      mealName:{ type: String },
      ingredients: [{ type: String, required: true }],
      instructions: { type: String },
    },
    nightMeal: {
      mealName:{ type: String },
      ingredients: [{ type: String, required: true }],
      instructions: { type: String },
    },
  });
  
  dietChartSchema.pre('save', async function (next) {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { collectionName: 'dietcharts' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.sequenceValue;
    }
    next();
  });
  module.exports = mongoose.model('DietChart', dietChartSchema);
  