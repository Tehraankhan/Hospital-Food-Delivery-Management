import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path as necessary

const PrivateRoute = ({ roleRequired, children }) => {
  const { user } = useAuth(); // Get the logged-in user
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false); // Once the user data is loaded, stop the loading state
    }
  }, [user]);

  if (loading) {
    // While loading, you can return a loading spinner or just return null
    return <div>Loading...</div>; // Or a spinner for better UX
  }

  // If the roleRequired is an array, check if user's role matches any of them
  const hasRequiredRole = Array.isArray(roleRequired)
    ? roleRequired.includes(user?.role)
    : user?.role === roleRequired;

  if (!user || !hasRequiredRole) {
    // Redirect to Signin if user is not logged in or role doesn't match
    return <Navigate to="/Signin" />;
  }

  return children; // Render the child components if role matches
};

export default PrivateRoute;
