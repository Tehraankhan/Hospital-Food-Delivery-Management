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

const DeliveryTable2 = ({ data, editstatus }) => {
  const [updatedData, setUpdatedData] = useState(Array.isArray(data) ? data : []);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const columns = [
    { label: "Patient ID", field: "patientId", align: "center" },
    { label: "Patient Name", field: "patientName", align: "center" },
    { label: "Bed Number", field: "bedNumber", align: "center" },
    { label: "Floor Number", field: "floorNumber", align: "center" },
    { label: "Room Number", field: "roomNumber", align: "center" },
    { label: "Delivery Personnel Name", field: "deliveryPersonnelName", align: "center" },
    {label:"Delivery Deadline", field:"deliveryDeadline",align:"center"},
    { label: "Status", field: "deliveryStatus", align: "center" },
    { label: "Action", field: "action", align: "center" },
  ];

  // Handle status change
  const handleStatusChange = async (newStatus, mealBoxId) => {
    const originalRow = updatedData.find((row) => row._id === mealBoxId);
    const originalStatus = originalRow?.deliveryStatus;

    try {
      // Update the status locally
      const updatedTableData = updatedData.map((row) =>
        row._id === mealBoxId ? { ...row, deliveryStatus: newStatus } : row
      );
      setUpdatedData(updatedTableData);

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Send the updated status to the backend
      const response = await axios.put(
        `http://localhost:5000/Delivery/ChangedMealDeliveryStatus/${mealBoxId}`,
        { deliveryStatus : newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);

      // Revert the status locally in case of an error
      const revertedTableData = updatedData.map((row) =>
        row._id === mealBoxId ? { ...row, deliveryStatus: originalStatus } : row
      );
      setUpdatedData(revertedTableData);

      alert("Failed to update status. Reverting to the previous status.");
    }
  };

  // Open modal and set selected row
  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <TableContainer component={Paper} 
    style={{
      maxHeight: "400px", // Set maximum height for the table
      overflowY: "auto",
      border:"1px solid #002F31"  // Enable vertical scrolling
    }}>
      <Table>
        {/* Table Header */}
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

        {/* Table Body */}
        <TableBody>
          {updatedData?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  align={column.align}
                  style={{ backgroundColor: "#f4f4f4", color: "#000" }}
                >
                  {column.field === "deliveryStatus" && editstatus ? (
                    <Select
                      value={row[column.field] || ""}
                      onChange={(e) => handleStatusChange(e.target.value, row._id)}
                      style={{ minWidth: "120px" }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  ) : column.field === "action" ? (
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenModal(row)}
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

      {/* Modal for detailed view */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
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
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" component="h2">
            Detailed Information
          </Typography>
          {selectedRow ? (
            <Box mt={2}>
              <Typography><strong>Meal Box ID:</strong> {selectedRow._id}</Typography>
              <Typography><strong>Patient ID:</strong> {selectedRow.patientId}</Typography>
              <Typography><strong>Patient Name:</strong> {selectedRow.patientName}</Typography>
              <Typography><strong>Bed Number:</strong> {selectedRow.bedNumber}</Typography>
              <Typography><strong>Floor Number:</strong> {selectedRow.floorNumber}</Typography>
              <Typography><strong>Room Number:</strong> {selectedRow.roomNumber}</Typography>
              <Typography><strong>Delivery Personnel Name:</strong> {selectedRow.deliveryPersonnelName}</Typography>
              <Typography><strong>Diet Chart ID:</strong> {selectedRow.dietChartId}</Typography>
              <Typography><strong>Meal Type:</strong> {selectedRow.mealType}</Typography>
            </Box>
          ) : (
            <Typography>No data available.</Typography>
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default DeliveryTable2;
