const mongoose = require('mongoose');
const Counter = require('./Counter')

const DeliveryPersonneShema  = new mongoose.Schema({
  _id: { type: Number },
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    OtherDetails: { type: String},
  });

  DeliveryPersonneShema.pre('save', async function (next) {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { collectionName: 'deliverypersoonels' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.sequenceValue;
    }
    next();
  });


  
  module.exports = mongoose.model('DeliveryPersonnel',DeliveryPersonneShema );