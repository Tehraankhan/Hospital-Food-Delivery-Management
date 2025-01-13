const express = require("express");
const patientRouter = express.Router();
const {creatPatient,getAllPatient, getPatientID,editPatientData,deletePatient} = require("../Controller/patientController")


const auth = require("../middle/auth")

patientRouter.post("/add-details",auth,creatPatient);
patientRouter.get("/getAllPatient",auth,getAllPatient)
patientRouter.get("/getPatientID",getPatientID)
patientRouter.put("/editPatient/:id",auth,editPatientData)
patientRouter.delete("/deletePatient/:id",auth,deletePatient)


module.exports = patientRouter
