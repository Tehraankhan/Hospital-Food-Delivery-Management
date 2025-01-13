import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const MealBoxModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    deliveryPersonnelId: "",
    deliveryDeadline: "",
  });

  const [patients, setPatients] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);

  useEffect(() => {
    const fetchPatientsAndStaff = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        // Fetch completed meals and populate the patient and delivery personnel data
        const response1 = await axios.get(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/getCompletedMealsDetails",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response1.data);
        setPatients(response1.data); // Set patients data

        const response2 = await axios.get(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/getDeliveryPersonnelIds",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response2.data);
        setDeliveryPersonnel(response2.data); // Set delivery personnel data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPatientsAndStaff();
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to the parent component
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Meal Delivery Form</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
          {/* Patient Selection */}
          <TextField
            select
            label="Patient"
            name="patientId"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.patientId}
            onChange={handleInputChange}
            required
          >
            {patients.map((patient) => (
              <MenuItem key={patient.patientId} value={patient.patientId}>
                {patient.patientId} - {patient.patientName}
              </MenuItem>
            ))}
          </TextField>

          {/* Delivery Personnel Selection */}
          <TextField
            select
            label="Delivery Personnel"
            name="deliveryPersonnelId"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.deliveryPersonnelId}
            onChange={handleInputChange}
            required
          >
            {deliveryPersonnel.map((personnel) => (
              <MenuItem key={personnel._id} value={personnel._id}>
                {personnel._id} - {personnel.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Meal ID"
            name="_id"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData._id}
            onChange={handleInputChange}
            required
          >
            {patients.map((patient) => (
              <MenuItem key={patient._id} value={patient._id}>
                {patient._id} - {patient.mealType}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            label="Set Time"
            name="deliveryDeadline"
            type="time" // Time input type
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.deliveryDeadline}
            onChange={handleInputChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MealBoxModal;
