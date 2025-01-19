const patientDietChart = require("../models/dietChartSchema");
const patientModel = require("../models/patientSchema");
const mealModal = require("../models/mealSchema");
const mongoose = require("mongoose");

const creatDietChart = async (req, res) => {
  try {
    console.log("yes")
    const { morningMeal, eveningMeal, nightMeal } = req.body;

    const patientId = req.params.id;

    const newDietchart = new patientDietChart({
      patientId: patientId,
      morningMeal: morningMeal,
      eveningMeal: eveningMeal,
      nightMeal: nightMeal,
    });

    await newDietchart.save();
    res
      .status(201)
      .json({ message: "Meal data saved successfully", meal: newDietchart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to save diet chart ", error: error.message });
  }
};

const getDietChart = async (req, res) => {
  try {
    const dietCharts = await patientDietChart.find();
    console.log(dietCharts)
    res
      .status(200)
      .json(dietCharts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getPatientWithDietCharts = async (req,res) => {
 
    try {
      // Step 1: Fetch all patients
      const patients = await patientModel.find();
  
      const results = [];
  
      // Step 2: Iterate over all patients and fetch associated diet charts
      for (const patient of patients) {
        // Convert patient._id to a string for comparison
        const patientIdString = patient._id.toString();
  
        // Step 3: Find diet charts associated with the current patient
        const dietCharts = await patientDietChart.find({
          patientId:patient._id, // Match as string
        });
  
        // Step 4: Create a result object for each patient with the associated diet chart IDs
        const patientInfo = {
          patientId: patient._id,
          patientName: patient.name,
          dietChartIds: dietCharts.map((dietChart) => dietChart._id), // Extracting only the DietChart IDs
        };
  
        results.push(patientInfo);
      }
  
      // Step 5: Return or log the results
      console.log(results)
      res
      .status(200)
      .json({ message: "Diet charts with patient details fetch successfully", data: results });
      return results; // You can also log here: console.log(results);
    } catch (error) {
      console.error("Error fetching patients and their diet charts:", error);
    }
  
};

const updateDiertChart = async (req, res) => {
  try {
    console.log("yes")
    const  _id  = req.params.id;
    const {patientId,
    morningMeal,
    eveningMeal,
    nightMeal} = req.body;

    const updatedChart = await patientDietChart.findOneAndUpdate(
      { _id },
      {
        patientId,
        morningMeal,
        eveningMeal,
        nightMeal
      },
      { new: true }
    );

   

    res.status(200).json(updatedChart);
  } catch (error) {
    res.status(500).json({ message: "Error updating diet chart", error });
  }
}

const deleteDietChart = async (req, res) => {
  try {
    const dietChartId = req.params.id;

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete the diet chart from the `dietChartModel`
      const deletedDietChart = await patientDietChart.findByIdAndDelete(dietChartId, { session });

      if (!deletedDietChart) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: "Diet chart not found" });
      }

      // Remove all related records in other schemas, if any
      // Example: Deleting related meal plans or logs associated with the diet chart
      await mealModal.deleteMany({ dietChartId }, { session });
    

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: "Diet chart and related data deleted successfully",
        deletedDietChart,
      });
    } catch (err) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      console.error("Error during delete operation:", err);
      res.status(500).json({ message: "Failed to delete diet chart data" });
    }
  } catch (error) {
    console.error("Error deleting diet chart data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



module.exports = { getDietChart, creatDietChart, getPatientWithDietCharts,updateDiertChart ,deleteDietChart };
