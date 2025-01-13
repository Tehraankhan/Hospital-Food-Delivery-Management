import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DeliveryTable = ({ data }) => {
  // Table column headers
  const columns = [
    { label: "Patient ID", field: "patientId", align: "center" },
    { label: "Patient Name", field: "patientName", align: "center" },
    { label: "Diet Chart", field: "dietChartName", align: "center" },
    { label: "Meal Type", field: "mealType", align: "center" },
    { label: "Preparation Status", field: "preparationStatus", align: "center" },
    { label: "Prepared By", field: "preparedBy", align: "center" },
    { label: "Delivery Status", field: "deliveryStatus", align: "center" },
    { label: "Delivery Timestamp", field: "deliveryTimestamp", align: "center" },
    { label: "Delivery Notes", field: "deliveryNotes", align: "center" },
    { label: "Delivery Personnel", field: "deliveryPersonnel", align: "center" },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Head */}
        <TableHead sx={{ backgroundColor: "#002F31" }}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align}
                style={{ color: "#fff", fontWeight: "bold" }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  align={column.align}
                  style={{ backgroundColor: "#f4f4f4" }} // Light gray row background
                >
                  {row[column.field] || "N/A"} {/* Default to "N/A" if no data */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeliveryTable;
