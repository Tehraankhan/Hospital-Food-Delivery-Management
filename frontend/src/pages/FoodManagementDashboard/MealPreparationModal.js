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

const MealPreparationFormModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    dietChartId: "",
    mealType: "",
    status: "",
    preparedBy: "",
    preparationDeadline: "", // Field for time only
  });

  const [patients, setPatients] = useState([]);
  const [dietCharts, setDietCharts] = useState([]);
  const [staffList, setStaffList] = useState([]); // Store staff data

  useEffect(() => {
    const fetchPatientsAndStaff = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        // Fetch patients data
        const response1 = await axios.get(
          "http://localhost:5000/patient/DietChart/getPatientWithDietCharts", // Replace with your API endpoint
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatients(response1.data.data); // Store patients

        // Fetch staff data
        const response2 = await axios.get(
          "http://localhost:5000/staff/getStaffIDAndName", // Replace with your API endpoint
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStaffList(response2.data); // Store staff data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPatientsAndStaff();
  }, [open]);

  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      patientId,
      dietChartId: "", // Reset diet chart when patient changes
    }));

    // Find the selected patient and populate the associated diet charts
    const selectedPatient = patients.find(
      (patient) => patient.patientId === patientId
    );
    if (selectedPatient) {
      setDietCharts(selectedPatient.dietChartIds); // Set the dietChartIds for the selected patient
    }
  };

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
      <DialogTitle>Meal Preparation Form</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
          {/* Patient ID Dropdown */}
          <TextField
            label="Patient ID"
            name="patientId"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.patientId}
            onChange={handlePatientChange}
            required
          >
            {patients?.map((patient) => (
              <MenuItem key={patient.patientId} value={patient.patientId}>
                {patient.patientName} (ID: {patient.patientId})
              </MenuItem>
            ))}
          </TextField>

          {/* Diet Chart ID Dropdown */}
          <TextField
            label="Diet Chart ID"
            name="dietChartId"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.dietChartId}
            onChange={handleInputChange}
            required
            disabled={!formData.patientId} // Disable diet chart dropdown if no patient is selected
          >
            {dietCharts?.map((dietChartId) => (
              <MenuItem key={dietChartId} value={dietChartId}>
                Diet Chart ID: {dietChartId}
              </MenuItem>
            ))}
          </TextField>

          {/* Meal Type Dropdown */}
          <TextField
            label="Meal Type"
            name="mealType"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.mealType}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
          </TextField>

          {/* Status Dropdown */}
          <TextField
            label="Status"
            name="status"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>

          {/* Prepared By (Staff ID) Dropdown */}
          <TextField
            label="Prepared By (Staff ID)"
            name="preparedBy"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.preparedBy}
            onChange={handleInputChange}
            required
          >
            {staffList?.map((staff) => (
              <MenuItem key={staff._id} value={staff._id}>
                {staff.staffName} (ID: {staff._id})
              </MenuItem>
            ))}
          </TextField>

          {/* Time Selection Input */}
          <TextField
            label="Set Time"
            name="preparationDeadline"
            type="time" // Time input type
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.preparationDeadline}
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

export default MealPreparationFormModal;
