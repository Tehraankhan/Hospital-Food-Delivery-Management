const mealModal = require("../models/mealSchema");
const patientModel = require("../models/patientSchema");
const mealDeliveryModal = require("../models/mealDeliverySchema");
const alertMessageModal = require("../models/alertMessageSchema");


const creatMeal = async (req, res) => {
  try {
    // const patientId = req.params.id;
    const { patientId, dietChartId, mealType, status, preparedBy,preparationDeadline } = req.body;

    const MealPreparation = new mealModal({
      patientId: patientId,
      dietChartId: dietChartId,
      mealType: mealType,
      status: status,
      preparedBy: preparedBy,
      preparationDeadline:preparationDeadline
    });

    await MealPreparation.save();
    res.status(201).json({ message: "meal preparartion is saved" });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

const getMealData = async (req, res) => {
  try {
    const meals = await mealModal
      .find()
      .populate("patientId", "name _id") // Populate patient details
      .populate("preparedBy", "staffName _id") // Populate staff details
      .populate({
        path: "dietChartId",
        select: "morningMeal eveningMeal nightMeal", // Select the fields from dietChartSchema
      })
      .lean();

    const formattedMeals = meals.map((meal) => ({
      _id: meal._id,
      patientId: meal.patientId._id,
      patientName: meal.patientId.name,
      dietChartId: meal.dietChartId._id,
      morningMeal: meal.dietChartId?.morningMeal || {}, // Morning meal details
      eveningMeal: meal.dietChartId?.eveningMeal || {}, // Evening meal details
      nightMeal: meal.dietChartId?.nightMeal || {}, // Night meal details
      mealType: meal.mealType,
      status: meal.status,
      preparedBy: meal.preparedBy._id,
      staffName: meal.preparedBy.staffName,
    }));

    res.status(200).json(formattedMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const ChangedMealPreparationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const _id = req.params.id;

    const updatedMeal = await mealModal.findOneAndUpdate(
      { _id },
      { status },
      { new: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal not found" }); // Exit function after sending response
    }
    console.log("yes");

    res.status(200).json({ message: "Meal updated successfully", updatedMeal });
  } catch (error) {
    console.error("Error updating meal preparation status:", error); // Log error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
};



const checkDelayedItems = async (io) => {
  try {
    const testTimeMeals = "08:10"; // Fixed time for meal preparations
    const testTimeDelivery = "10:00"; // Fixed time for meal deliveries
    console.log(`Testing with meal preparation time: ${testTimeMeals} and delivery time: ${testTimeDelivery}`);

    const alertMessages = []; // To store all alert messages

    // Check for delayed meal preparations
    const delayedPreparations = await mealModal.find({
      preparationDeadline: { $lt: testTimeMeals },
      status: { $ne: "Completed" },
    }).populate("patientId");

    // Handle delayed meal preparations
    for (const preparation of delayedPreparations) {
      const message1 = `⚠️ Meal preparation for patient ${preparation.patientId.name} (Deadline: ${preparation.preparationDeadline}) is delayed. Please take immediate action!`;

      let existingMessage = await alertMessageModal.findOne({ message: message1 });
      if (!existingMessage) {
        existingMessage = new alertMessageModal({ message: message1 });
        await existingMessage.save();
      }

      alertMessages.push(existingMessage); // Add the message to the array
    }

    // Check for delayed meal deliveries
    const delayedDelivery = await mealDeliveryModal.find({
      deliveryDeadline: { $lt: testTimeDelivery },
      deliveryStatus: { $ne: "Delivered" },
    }).populate("patientId");

    // Handle delayed meal deliveries
    for (const delivery of delayedDelivery) {
      if (!delivery.patientId) {
        continue; // Skip if patientId is not present
      }

      const message2 = `⚠️ Delivery for patient ${delivery.patientId.name} (Deadline: ${delivery.deliveryDeadline}) is delayed. Please take immediate action!`;

      // Check if the exact message already exists before saving
      let existingDeliveryMessage = await alertMessageModal.findOne({ message: message2 });
      
      // If message doesn't exist, create a new one
      if (!existingDeliveryMessage) {
        existingDeliveryMessage = new alertMessageModal({ message: message2 });
        await existingDeliveryMessage.save();
      }

      // Push to the alertMessages array (if new or already existing)
      alertMessages.push(existingDeliveryMessage);
    }

    // Emit all alert messages at once
    if (alertMessages.length > 0) {
      io.emit("mealDelayed", alertMessages);
    }

  } catch (error) {
    console.error("Error checking for delayed items:", error);
  }
};




let previousPendingDeliveriesCount = null;
let previousPendingPreparationsCount = null;

const getPendingCounts = async (io) => {
  try {

    // 1. Count pending meal deliveries
    const currentPendingDeliveriesCount = await mealDeliveryModal.countDocuments({
      deliveryStatus: "Pending",
    });

    // 2. Count pending meal preparations
    const currentPendingPreparationsCount = await mealModal.countDocuments({
      status: "Pending",
    });

    // Emit delivery count only if it has changed
    if (currentPendingDeliveriesCount !== previousPendingDeliveriesCount) {
      io.emit("updatePendingDeliveries", {
        pendingDeliveries: currentPendingDeliveriesCount,
      });
      console.log(`Pending Deliveries Count Changed: ${currentPendingDeliveriesCount}`);
      previousPendingDeliveriesCount = currentPendingDeliveriesCount;
    }

    // Emit preparation count only if it has changed
    if (currentPendingPreparationsCount !== previousPendingPreparationsCount) {
      io.emit("updatePendingPreparations", {
        pendingPreparations: currentPendingPreparationsCount,
      });
      console.log(`Pending Preparations Count Changed: ${currentPendingPreparationsCount}`);
      previousPendingPreparationsCount = currentPendingPreparationsCount;
    }

    

    
  } catch (error) {
    console.error("Error during pending counts or delayed meals check:", error);
  }
};





    module.exports = { creatMeal, getMealData, ChangedMealPreparationStatus,checkDelayedItems,getPendingCounts };
