const mealDeliveryModal = require("../models/mealDeliverySchema");
const mealModal = require("../models/mealSchema");
const DeliveryPersonneModal = require("../models/DeliveryPersonnelSchema");
const cron = require('node-cron');
const alertMessageModal = require("../models/alertMessageSchema")

const createmealDelivery = async (req, res) => {
  try {
    const { patientId, deliveryPersonnelId,deliveryDeadline,_id } = req.body;
    

    if (!patientId || !deliveryPersonnelId) {
      return res.status(400).json({
        message: "Patient ID and Delivery Personnel ID are required.",
      });
    }


    const mealPreparationId = _id; // Assuming the `_id` of the mealModal is used as mealPreparationId

    // Create a new meal delivery entry
    const newMealDelivery = new mealDeliveryModal({
      patientId,
      mealPreparationId,
      deliveryPersonnelId,
      deliveryStatus: "Pending",
      deliveryTimestamp: "", // Leave empty
      deliveryNotes: "", // Leave empty
      deliveryDeadline
    });

    await newMealDelivery.save();

    res.status(201).json({ message: "Meal delivery created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllDeliveryPersonnel = async (req,res) =>{

    try {
        const DeliveryPersonnal = await DeliveryPersonneModal.find()
        res
          .status(200)
          .json( DeliveryPersonnal);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }

}

const getDeileveyStatus = async (req, res) => {
  try {
    const mealPreparations = await mealModal
      .find()
      .populate("patientId", "name") // Fetch patient name
      .populate("preparedBy", "staffName"); // Fetch staff name
    // Fetch diet chart details

    const mealDeliveries = await mealDeliveryModal
      .find()
      .populate("deliveryPersonnelId", "name"); // Fetch delivery personnel details

    // Create a map for mealDelivery using mealPreparationId as the key
    const deliveryMap = mealDeliveries.reduce((map, delivery) => {
      map[delivery.mealPreparationId.toString()] = delivery;
      return map;
    }, {});

    // Combine mealPreparation and mealDelivery data
    const combinedData = mealPreparations.map((prep) => {
      const delivery = deliveryMap[prep._id.toString()] || {}; // Default to empty if no delivery
      return {
        patientId: prep.patientId?._id || "N/A",
        patientName: prep.patientId?.name || "N/A",
        dietChartName: prep.dietChartId || "N/A",
        mealType: prep.mealType,
        preparationStatus: prep.status,
        preparedBy: prep.preparedBy?.staffName || "Not Assigned",
        deliveryStatus: delivery.deliveryStatus || "Not Assigned",
        deliveryDeadline:delivery.deliveryDeadline,
        deliveryTimestamp: delivery.deliveryTimestamp || "N/A",
        deliveryNotes: delivery.deliveryNotes || "N/A",
        deliveryPersonnel: delivery.deliveryPersonnelId?.name || "N/A",
      };
    });

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching meal statuses:", error);
    res.status.json({ message: error.message });
  }
};

const addDeliveryPersonnalDetails = async (req, res) => {
  try {
    const { name, contactInfo, otherDetails } = req.body;

    const DeliveryDetails = new DeliveryPersonneModal({
      name: name,
      contactInfo: contactInfo,
      otherDetails: otherDetails,
    });

    await DeliveryDetails.save();
    res.status(201).json({ message: "Delivery  Personnel details saved" });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

const getAllDeliveryDetails = async (req, res) => {
  try {
    const DeliveryDetails = await DeliveryPersonneModal.find();
    res.status(201).json(DeliveryDetails);
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

const getCompletedMealsDetails = async (req, res) => {
  try {
    console.log("yes");

    // Fetch completed meals and populate the patientId to get the patient's name
    const completedMeals = await mealModal
      .find({ status: "Completed" })
      .populate("patientId", "name"); // Populate patientId with the name field

    // Transform the data to separate patientId and name on different lines
    const transformedMeals = completedMeals.map((meal) => ({
      _id: meal._id,
      patientId: meal.patientId._id, // Separate patientId
      patientName: meal.patientId.name, // Separate patient name
      dietChartId: meal.dietChartId,
      mealType: meal.mealType,
      status: meal.status,
      preparedBy: meal.preparedBy,
    }));

    console.log(transformedMeals);

    // Send the transformed meals with separate patientId and name
    res.status(200).json(transformedMeals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDeliveryPersonnelIds = async (req, res) => {
  try {
    console.log("yes");

    const completedMeals = await DeliveryPersonneModal.find(
      {},
      { _id: 1, name: 1 }
    );
    console.log(completedMeals);
    res.status(200).json(completedMeals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getalltheDetails = async (req, res) => {
  try {
    // Fetch all meal delivery records with populated related data
    const allDeliveries = await mealDeliveryModal
      .find()
      .populate({
        path: "mealPreparationId", // Populating mealPreparationId
        select: "dietChartId mealType status preparedBy", // Selecting only the required fields
      })
      .populate({
        path: "patientId", // Populating patient details
        select: "name age disease allergies roomNumber bedNumber floorNumber", // Selecting specific fields
      })
      .populate({
        path: "deliveryPersonnelId",
        select: "name",
      });

    if (!allDeliveries || allDeliveries.length === 0) {
      return res
        .status(404)
        .json({ message: "No meal delivery records found" });
    }

    // Format the response data as an array of JSON objects
    const formattedResponse = allDeliveries.map((delivery) => ({
      _id: delivery._id,
      deliveryStatus: delivery.deliveryStatus || "N/A",
      deliveryNotes: delivery.deliveryNotes || "N/A",
      deliveryPersonnelId: delivery.deliveryPersonnelId?._id || "N/A",
      deliveryPersonnelName: delivery.deliveryPersonnelId?.name || "N/A",
      deliveryDeadline:delivery.deliveryDeadline,
      dietChartId: delivery.mealPreparationId?.dietChartId || "N/A",
      mealType: delivery.mealPreparationId?.mealType || "N/A",
      status: delivery.mealPreparationId?.status || "N/A",
      preparedBy: delivery.mealPreparationId?.preparedBy || "N/A",
      patientId: delivery.patientId?._id || "N/A",
      patientName: delivery.patientId?.name || "N/A",
      patientAge: delivery.patientId?.age || "N/A",
      patientDisease: delivery.patientId?.disease || "N/A",
      patientAllergies: delivery.patientId?.allergies || "N/A",
      roomNumber: delivery.patientId?.roomNumber || "N/A",
      bedNumber: delivery.patientId?.bedNumber || "N/A",
      floorNumber: delivery.patientId?.floorNumber || "N/A",
    }));

    // Send the formatted response
    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching meal delivery details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ChangedMealDeliveryStatus = async (req, res) => {
  try {
    const { deliveryStatus } = req.body;
    const _id= req.params.id;

    const updatedMeal = await mealDeliveryModal.findOneAndUpdate(
      { _id },
      { deliveryStatus  },
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

const getAllMealBoxDetails = async (req,res)=>{

  try {
    const mealDeliveryDetails = await mealDeliveryModal.find();
    res.status(201).json(mealDeliveryDetails);
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
}


const checkDelayedDelivery = async (io) => {
  try {
    const testTime = "10:00"; // Fixed time for testing
    console.log(`Testing with time: ${testTime}`);

    // Find meal preparations with deliveryDeadline as string
    const delayedDelivery = await mealDeliveryModal.find({
      deliveryDeadline: { $lt: testTime },
      deli: { $ne: "deliveryStatus" },
    }).populate("patientId"); // Populate patientId for patient details

    for (const delivery of delayedDelivery) {
      // Check if patientId is present
      if (!delivery.patientId) {
        continue; // Skip this delivery if patientId is not present
      }

      const message1 = `⚠️ delivery  for patient ${delivery.patientId.name} (Deadline: ${delivery.deliveryDeadline}) is delayed. Please take immediate action!`;
     

      
      const existingMessage = await alertMessageModal.findOne({ message: message1 });

      if (!existingMessage) {
      
        const message = new alertMessageModal({ message: message1 });
        await message.save();

        
       
      }
       io.emit("mealDelayed", existingMessage);
    }
  } catch (error) {
    console.error("Error checking delayed deliveries:", error);
  }
};

module.exports = {
  createmealDelivery,
  getDeileveyStatus,
  addDeliveryPersonnalDetails,
  getAllDeliveryDetails,
  getCompletedMealsDetails,
  getDeliveryPersonnelIds,
  getalltheDetails,
  ChangedMealDeliveryStatus,
  getAllMealBoxDetails,
  checkDelayedDelivery
  
};
