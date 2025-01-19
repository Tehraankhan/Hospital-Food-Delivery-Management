import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const MealPreparationTable = ({ data, editstatus }) => {
  const [updatedData, setUpdatedData] = useState(useSelector((state)=>state.userData.fetchAllMealPreparartion));
  const [selectedMeal, setSelectedMeal] = useState(null); // State for selected meal details
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  const columns = [
    { label: "Patient ID", field: "_id", align: "center" },
    { label: "Patient Name", field: "patientName", align: "center" },
    { label: "Diet Chart ID", field: "dietChartId", align: "center" },
    { label: "Meal Type", field: "mealType", align: "center" },
    { label: "Status", field: "status", align: "center" },
    { label: "Prepared By (ID)", field: "preparedBy", align: "center" },
    { label: "Staff Name", field: "staffName", align: "center" },
    { label: "Action", field: "action", align: "center" },
  ];

  const mealTypeMapping = {
    Morning: "morningMeal",
    Evening: "eveningMeal",
    Night: "nightMeal",
  };

  const handleStatusChange = async (newStatus, id) => {
    const originalRow = updatedData.find((row) => row._id === id);
    const originalStatus = originalRow?.status;

    try {
      const updatedTableData = updatedData.map((row) =>
        row._id === id ? { ...row, status: newStatus } : { ...row }
      );
      setUpdatedData(updatedTableData);

      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://hospital-food-delivery-management-backend-rf3c.onrender.com/mealpreparation/changedStatus/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      const revertedTableData = updatedData.map((row) =>
        row._id === id ? { ...row, status: originalStatus } : { ...row }
      );
      setUpdatedData(revertedTableData);
      alert("Failed to update status. Reverting to the previous status.");
    }
  };

  const openModal = (mealDetails, mealType) => {
    const mealKey = mealTypeMapping[mealType];
    setSelectedMeal(mealDetails[mealKey]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setModalOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#002F31" }}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "#002F31",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {updatedData?.map((row, rowIndex) => (
              <TableRow key={row._id || rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    align={column.align}
                    style={{ backgroundColor: "#f4f4f4", color: "#000" }}
                  >
                    {column.field === "status" && editstatus ? (
                      <Select
                        value={row[column.field] || ""}
                        onChange={(e) =>
                          handleStatusChange(e.target.value, row._id)
                        }
                        style={{ minWidth: "120px" }}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    ) : column.field === "action" ? (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          openModal(
                            {
                              morningMeal: row.morningMeal,
                              eveningMeal: row.eveningMeal,
                              nightMeal: row.nightMeal,
                            },
                            row.mealType
                          )
                        }
                      >
                        View Details
                      </Button>
                    ) : (
                      row[column.field] || "N/A"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedMeal ? (
            <div>
              <Typography variant="h6" component="h2">
                Meal Details
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Meal Name: {selectedMeal.mealName || "N/A"}
              </Typography>
              <Typography>
                Ingredients: {selectedMeal.ingredients?.join(", ") || "N/A"}
              </Typography>
              <Typography>
                Instructions: {selectedMeal.instructions || "N/A"}
              </Typography>
            </div>
          ) : (
            <Typography>No meal details available.</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MealPreparationTable;
