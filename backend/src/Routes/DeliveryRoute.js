const express = require("express");
const DeliveryRoute = express.Router();

const {
  createmealDelivery,
  getDeileveyStatus,
  addDeliveryPersonnalDetails,
  getAllDeliveryDetails,
  getCompletedMealsDetails,
  getDeliveryPersonnelIds,
  getalltheDetails,
  ChangedMealDeliveryStatus,
  getAllMealBoxDetails
} = require("../Controller/mealDeliveryController");

const auth = require("../middle/auth");

DeliveryRoute.post("/addDeliveryDetails", auth, addDeliveryPersonnalDetails);
DeliveryRoute.get("/getData", auth, getDeileveyStatus);
DeliveryRoute.get("/getAllDeliveryDetails", auth, getAllDeliveryDetails);
DeliveryRoute.post("/addMealDelivery", auth, createmealDelivery);
DeliveryRoute.get("/getCompletedMealsDetails", auth, getCompletedMealsDetails);
DeliveryRoute.get("/getDeliveryPersonnelIds",auth,getDeliveryPersonnelIds)
DeliveryRoute.get("/getalltheDetails",auth,getalltheDetails)
DeliveryRoute.put("/ChangedMealDeliveryStatus/:id",auth,ChangedMealDeliveryStatus)
DeliveryRoute.get("/getAllMealBoxDetails",auth,getAllMealBoxDetails)

// patientRouter.get("/",auth,getAllPatient)

module.exports = DeliveryRoute;
