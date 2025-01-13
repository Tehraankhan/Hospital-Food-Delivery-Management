import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";

const DietChartFormModal = ({ open, onClose, onSubmit, dietChartData}) => {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    morningMeal: {
      mealName: "",
      ingredients: [""],
      instructions: "",
    },
    eveningMeal: {
      mealName: "",
      ingredients: [""],
      instructions: "",
    },
    nightMeal: {
      mealName: "",
      ingredients: [""],
      instructions: "",
    },
  });

  const [patients, setPatients] = useState([]); // Store patients
  const [selectedPatientId, setSelectedPatientId] = useState(""); // To keep track of the selected patient ID

  // Fetch patients list on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await axios.get("http://localhost:5000/patient/getPatientID", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPatients(response.data); // Store the list of patients
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [open]);



  const handleInputChange = (e, mealType, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        [field]: value,
      },
    }));
  };

  const handleIngredientsChange = (e, mealType, index) => {
    const { value } = e.target;
    setFormData((prev) => {
      const ingredients = [...prev[mealType].ingredients];
      ingredients[index] = value;
      return {
        ...prev,
        [mealType]: {
          ...prev[mealType],
          ingredients,
        },
      };
    });
  };

  const addIngredient = (mealType) => {
    setFormData((prev) => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        ingredients: [...prev[mealType].ingredients, ""],
      },
    }));
  };

  const removeIngredient = (mealType, index) => {
    setFormData((prev) => {
      const ingredients = [...prev[mealType].ingredients];
      ingredients.splice(index, 1);
      return {
        ...prev,
        [mealType]: {
          ...prev[mealType],
          ingredients,
        },
      };
    });
  };

  const handlePatientIdChange = (e) => {
    const selectedPatientId = e.target.value;
    setSelectedPatientId(selectedPatientId); // Update selected patient ID
    setFormData((prev) => ({
      ...prev,
      patientId: selectedPatientId,
    }));

    // Find the selected patient's name directly from the patients array
    const selectedPatient = patients.find(
      (patient) => patient._id === selectedPatientId
    );

    if (selectedPatient) {
      setFormData((prev) => ({
        ...prev,
        patientName: selectedPatient.name, // Set the patient's name
      }));
    } else {
      console.error("Patient not found");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData,selectedPatientId);
    onClose(); // Close the modal after submission
  };
  useEffect(() => {
    if (dietChartData) {
      setFormData({
        patientId: dietChartData.patientId || "",
        patientName: dietChartData.patientName || "",
        morningMeal: {
          mealName: dietChartData.morningMeal?.mealName || "",
          ingredients: dietChartData.morningMeal?.ingredients || [""],
          instructions: dietChartData.morningMeal?.instructions || "",
        },
        eveningMeal: {
          mealName: dietChartData.eveningMeal?.mealName || "",
          ingredients: dietChartData.eveningMeal?.ingredients || [""],
          instructions: dietChartData.eveningMeal?.instructions || "",
        },
        nightMeal: {
          mealName: dietChartData.nightMeal?.mealName || "",
          ingredients: dietChartData.nightMeal?.ingredients || [""],
          instructions: dietChartData.nightMeal?.instructions || "",
        },
      });
    }
  }, [dietChartData]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Diet Chart Form</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Patient ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.patientId}
            onChange={handlePatientIdChange}
            required
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Patient ID</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient._id}
              </option>
            ))}
          </TextField>

          <TextField
            label="Patient Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.patientName}
            disabled
            required
          />

          {["morningMeal", "eveningMeal", "nightMeal"].map((mealType) => (
            <Box key={mealType} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {mealType.replace("Meal", " Meal").toUpperCase()}
              </Typography>
              <TextField
                label="Meal Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData[mealType].mealName}
                onChange={(e) => handleInputChange(e, mealType, "mealName")}
              />
              <Typography variant="subtitle1" mt={2}>
                Ingredients:
              </Typography>
              {formData[mealType].ingredients.map((ingredient, index) => (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  key={index}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    label={`Ingredient ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientsChange(e, mealType, index)
                    }
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeIngredient(mealType, index)}
                    disabled={formData[mealType].ingredients.length === 1}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Stack>
              ))}
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => addIngredient(mealType)}
                sx={{ mt: 2 }}
              >
                Add Ingredient
              </Button>

              <TextField
                label="Instructions"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                value={formData[mealType].instructions}
                onChange={(e) => handleInputChange(e, mealType, "instructions")}
              />
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
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

export default DietChartFormModal;
