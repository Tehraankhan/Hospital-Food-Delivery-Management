import React, { useState } from "react";
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

const StaffModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    staffName: "",
    contactInfo: "",
    location: "",
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
      <DialogTitle>Patient Form</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Staff Name"
            name="staffName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.staffName}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Contact"
            name="contactInfo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.contactInfo}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Location"
            name="location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.location}
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

export default StaffModal;


