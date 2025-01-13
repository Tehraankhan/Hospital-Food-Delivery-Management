import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const DeliveryPersonnelModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "", // Matches the schema field name
    contactInfo: "", // Matches the schema field name
    otherDetails: "", // Matches the schema field name (case adjusted for JavaScript convention)
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
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Delivery Personnel Form</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name" // Matches the schema field name
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Contact Information"
            name="contactInfo" // Matches the schema field name
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.contactInfo}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Other Details"
            name="otherDetails" // Matches the schema field name
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.otherDetails}
            onChange={handleInputChange}
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

export default DeliveryPersonnelModal;
