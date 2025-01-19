const mongoose = require('mongoose');
const Counter = require('./Counter')


const pantrySchema = new mongoose.Schema({
  _id: { type: Number },
    staffName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    location: { type: String, required: true },
  });

  pantrySchema.pre('save', async function (next) {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { collectionName: 'pantries' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.sequenceValue;
    }
    next();
  });

  
  module.exports = mongoose.model('Pantry', pantrySchema);