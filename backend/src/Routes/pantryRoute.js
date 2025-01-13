const express = require("express");
const pantryRouter = express.Router();
const {addStaffDetails,getStaffDetails, getStaffIDAndName} = require("../Controller/pantryController")

const auth = require("../middle/auth")
pantryRouter.post("/add-staff",auth,addStaffDetails)
pantryRouter.get("/getDetails",auth,getStaffDetails)
pantryRouter.get("/getStaffIDAndName",auth,getStaffIDAndName)
module.exports = pantryRouter
