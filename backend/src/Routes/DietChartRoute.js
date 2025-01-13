const express = require("express");
const DietChartRouter = express.Router();
const {creatDietChart,getDietChart,getPatientWithDietCharts,updateDiertChart ,deleteDietChart} = require("../Controller/DietController")


const auth = require("../middle/auth")

DietChartRouter.post("/addDiet/:id",auth,creatDietChart);
DietChartRouter.get("/",auth,getDietChart)
DietChartRouter.get("/getPatientWithDietCharts",auth,getPatientWithDietCharts)
DietChartRouter.put("/updateDiertChart/:id",auth,updateDiertChart )
DietChartRouter.delete("/deleteDietChart/:id",auth,deleteDietChart)

module.exports = DietChartRouter
