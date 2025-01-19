const mongoose = require('mongoose');
const Counter = require("./Counter")

const patientSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  disease: { type: String },
  allergies: { type: String },
  roomNumber: { type: Number, required: true },
  bedNumber: { type: Number, required: true },
  floorNumber: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contactInfo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  
});

patientSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { collectionName: 'patients' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    this._id = counter.sequenceValue;
  }
  next();
});

module.exports = mongoose.model('Patient', patientSchema);
