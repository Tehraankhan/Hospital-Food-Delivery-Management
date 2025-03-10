import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Input = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const url = "https://hospital-food-delivery-management-backend-rf3c.onrender.com";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/user/signin`,
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.role === "manager") {
        navigate("/HospitalFoodManagementAdmin");
      } else {
        navigate("/pantryMangamentAdmin");
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* Credentials Box */}
      <Box
        sx={{
          width: "66%",
          backgroundColor: "#f5f5f5", // Light background color
          padding: 2,
          boxShadow: 2,
          borderRadius: 2,
          marginBottom: 5,
          border: "2px solid #002F31"
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Use the following credentials to sign in:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
          <strong>Email:</strong> hospital_manager@xyz.com
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
          <strong>Email:</strong> hospital_pantry@xyz.com
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
          <strong>Email:</strong> hospital_delivery@xyz.com
        </Typography>
        <Typography variant="body2">
          <strong>Password:</strong> Password@2025
        </Typography>
      </Box>

      {/* Sign In Form */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={Input}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={Input}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          onClick={fetchData}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign In"}
        </Button>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link to="/Signup" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
