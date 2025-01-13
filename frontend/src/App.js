import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Adjust path as necessary
import PrivateRoute from "./Components/PrivateRoute"; // Adjust path as necessary

import Dashboard from "./pages/FoodManagementDashboard/Dashboard";
import Signin from "./pages/Userauthentication/Signin";
import Signup from "./pages/Userauthentication/Signup";
import PantryDashboard from "./pages/PantryManagement/PantryDashboard";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<HomePage/>}/>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />

        {/* Manager-only route */}
        <Route
          path="/HospitalFoodManagementAdmin"
          element={
            <PrivateRoute roleRequired="manager">
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Pantry and Delivery roles can access this route */}
        <Route
          path="/pantryMangamentAdmin"
          element={
            <PrivateRoute roleRequired={["pantry", "delivery"]}>
              <PantryDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
