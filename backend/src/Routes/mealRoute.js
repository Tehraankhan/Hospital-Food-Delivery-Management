const express = require("express");
const mealRoute = express.Router();
const {createmealDelivery} = require("../Controller/mealDeliveryController")
const {creatMeal,getMealData,ChangedMealPreparationStatus} = require("../Controller/mealPreparation")


const auth = require("../middle/auth")

mealRoute.post("/addMeal",auth,creatMeal);
mealRoute.get("/getData",auth,getMealData)
mealRoute.put("/changedStatus/:id",auth,ChangedMealPreparationStatus)

// patientRouter.get("/",auth,getAllPatient)

module.exports = mealRoute