const patientModel = require("../models/patientSchema");
const mealDeliveryModal = require("../models/mealDeliverySchema");
const mealModal = require("../models/mealSchema");
const DeliveryPersonneModal = require("../models/DeliveryPersonnelSchema");
const patientDietChart = require("../models/dietChartSchema");
const mongoose = require("mongoose");


const creatPatient = async (req, res) => {
  try {
    const patientData = req.body;
    patientData.userId = req.userId; // This assumes `userId` comes from the authentication token

    const newPatient = new patientModel(patientData);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error adding patient", error: error.message });
  }
};

const getAllPatient = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(201).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error got", error: error.message });
  }
};


const getPatientID = async (req,res)=>{
  try {
    const patients = await patientModel.find({}, { _id: -1, name: 1 });
    console.log(patients)
    res.status(201).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error got", error: error.message });
  }

}

const editPatientData = async (req, res) => {
  try {
   
    const {
      name,
      disease,
      allergies,
      roomNumber,
      bedNumber,
      floorNumber,
      age,
      gender,
      contactInfo,
      emergencyContact,
    } = req.body;
    
 
    const patientId = req.params.id;

  
    const updatedPatient = await patientModel.findOneAndUpdate(
      { _id: patientId }, 
      {
        name,
        disease,
        allergies,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInfo,
        emergencyContact,
      },
      { new: true } 
    );

    res.status(200).json({
      message: "Patient updated successfully",
      updatedPatient,
    });
  } catch (error) {
   
    console.error("Error updating patient data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete patient from the `patientModal`
      const deletedPatient = await patientModel.findByIdAndDelete(patientId, { session });

      if (!deletedPatient) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: "Patient not found" });
      }

      // Remove all related records in other schemas
      // Example: Deleting appointments, prescriptions, etc.
      await mealModal.deleteMany({ patientId }, { session });
      await mealDeliveryModal.deleteMany({ patientId }, { session });
     await patientDietChart.deleteMany({patientId},{session})

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: "Patient and related data deleted successfully",
        deletedPatient,
      });
    } catch (err) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      console.error("Error during delete operation:", err);
      res.status(500).json({ message: "Failed to delete patient data" });
    }
  } catch (error) {
    console.error("Error deleting patient data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = { creatPatient, getAllPatient,getPatientID ,editPatientData,deletePatient};
