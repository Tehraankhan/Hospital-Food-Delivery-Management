const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

// const MealPreparationController = require("./src/controller/mealPreparation"); // Adjust the path if needed
const UserRoutes = require("./src/Routes/userRoutes");
const patientRoutes = require("./src/Routes/patientRoutes");
const DietChartRoutes = require("./src/Routes/DietChartRoute");
const PantryRoutes = require("./src/Routes/pantryRoute");
const mealRoute = require("./src/Routes/mealRoute");
const DeliveryRoute = require("./src/Routes/DeliveryRoute");

const app = express();
const server = http.createServer(app);

// Enable CORS for regular HTTP requests
app.use(cors());

// Enable CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "https://hospital-food-delivery-management-jxst.onrender.com", // Allow connections from the frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow cookies and credentials
  },
});

dotenv.config();
app.use(express.json());
app.use("/user", UserRoutes);
app.use("/patient", patientRoutes);
app.use("/patient/DietChart", DietChartRoutes);
app.use("/staff", PantryRoutes);
app.use("/mealpreparation", mealRoute);
app.use("/Delivery", DeliveryRoute);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


const cron = require('./src/utils/cron');

mongoose
  .connect(process.env.MONGO_URL, { dbName: "test" })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(5000, () => {
      console.log("Server started at port 5000");
    });
    cron.init(io);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  module.exports = { io };