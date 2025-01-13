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

const DeliveryPersonnalTable = ({ data }) => {
    const [data1,setData]=useState(Array.isArray(data) ? data : [])
  const columns = [
    { label: "Name", field: "name", align: "center" },
    { label: "Contact Info", field: "contactInfo", align: "center" },
    { label: "Other Details", field: "OtherDetails", align: "center" },
    { label: "Actions", field: "actions", align: "center" }, // Action column
  ];

  const handleEdit = (id) => {
    console.log(`Editing delivery personnel with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting delivery personnel with id: ${id}`);
  };

  return (
    <TableContainer component={Paper} style={{
        maxHeight: "400px", // Set maximum height for the table
        overflowY: "auto", // Enable vertical scrolling
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
          {data1?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.slice(0, -1).map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  align={column.align}
                  style={{ backgroundColor: "#f4f4f4", color: "#000" }}
                >
                  {row[column.field] || "N/A"} {/* Default to "N/A" if no data */}
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
      {data?.length === 0 && (
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

export default DeliveryPersonnalTable;
