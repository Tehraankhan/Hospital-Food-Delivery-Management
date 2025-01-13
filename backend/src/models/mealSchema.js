
const mongoose = require('mongoose');

const mealPreparationSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true },
    mealType: { type: String, enum: ['Morning', 'Evening', 'Night'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    preparedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pantry' },
    preparationDeadline: { type: String ,required: true }, 
  });
  
  module.exports = mongoose.model('MealPreparation', mealPreparationSchema);
  