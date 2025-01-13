import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MealAssignTable = ({ data }) => {
    const [data1,setData]=useState(Array.isArray(data) ? data : [])
  const columns = [
    { label: "Patient ID", field: "patientId", align: "center" },
    { label: "Meal Preparation ID", field: "mealPreparationId", align: "center" },
    { label: "Delivery Personnel ID", field: "deliveryPersonnelId", align: "center" },
    { label: "Delivery Status", field: "deliveryStatus", align: "center" },
    {label:"Delivery Deadline", field:"deliveryDeadline",align:"center"},
    { label: "Delivery Timestamp", field: "deliveryTimestamp", align: "center" },
    { label: "Delivery Notes", field: "deliveryNotes", align: "center" },
    
    { label: "Actions", field: "actions", align: "center" }, // Action column
  ];

  const handleEdit = (id) => {
    console.log(`Editing delivery with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting delivery with id: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
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
          {data1?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.slice(0, -1).map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  align={column.align}
                  style={{ backgroundColor: "#f4f4f4", color: "#000" }}
                >
                  {column.field === "deliveryTimestamp"
                    ? row[column.field]
                      ? new Date(row[column.field]).toLocaleString()
                      : "N/A"
                    : row[column.field] || "N/A"}
                </TableCell>
              ))}

              {/* Action Column */}
              <TableCell align="center" style={{ backgroundColor: "#f4f4f4" }}>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(row._id)} // Assuming `_id` is the unique identifier
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(row._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data1?.length === 0 && (
        <Typography
          variant="h6"
          align="center"
          sx={{ padding: 2, color: "#999" }}
        >
          No records found
        </Typography>
      )}
    </TableContainer>
  );
};

export default MealAssignTable;
