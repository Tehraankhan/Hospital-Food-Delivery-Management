import React, { useEffect, useState } from "react";
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

const PatientFormModal = ({ open, onClose, onSubmit,patientData}) => {
  const [formData, setFormData] = useState({
    name: "",
    disease: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
  });

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
    setFormData({
      name:  "",
      disease:  "",
      allergies: "",
      roomNumber:  "",
      bedNumber:  "",
      floorNumber:  "",
      age: "",
      gender:  "",
      contactInfo:  "",
      emergencyContact:  "",
    });

    onClose(); // Close the modal after submission
  };

  useEffect(() => {
    if (patientData) {
      setFormData({
        name: patientData.name || "",
        disease: patientData.disease || "",
        allergies: patientData.allergies || "",
        roomNumber: patientData.roomNumber || "",
        bedNumber: patientData.bedNumber || "",
        floorNumber: patientData.floorNumber || "",
        age: patientData.age || "",
        gender: patientData.gender || "",
        contactInfo: patientData.contactInfo || "",
        emergencyContact: patientData.emergencyContact || "",
      });
    }
  }, [patientData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Patient Form</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Patient Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Disease"
            name="disease"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.disease}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Allergies"
            name="allergies"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.allergies}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Room Number"
            name="roomNumber"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.roomNumber}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Bed Number"
            name="bedNumber"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.bedNumber}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Floor Number"
            name="floorNumber"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.floorNumber}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Gender"
            name="gender"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Contact Info"
            name="contactInfo"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.contactInfo}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Emergency Contact"
            name="emergencyContact"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientFormModal;
