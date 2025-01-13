import React from "react";
import { Routes, Route } from "react-router-dom";


import Dashboard from "./pages/FoodManagementDashboard/Dashboard";
import Signin from "./pages/Userauthentication/Signin";
import Signup from "./pages/Userauthentication/Signup";
import PantryDashboard from "./pages/PantryManagement/PantryDashboard";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/HospitalFoodManagementAdmin" element={<Dashboard />} />
      <Route path="/pantryMangamentAdmin" element={<PantryDashboard />} />
    </Routes>
  );
};

export default App;
