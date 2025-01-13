const mongoose = require('mongoose');




const dietChartSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
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
  
  module.exports = mongoose.model('DietChart', dietChartSchema);
  