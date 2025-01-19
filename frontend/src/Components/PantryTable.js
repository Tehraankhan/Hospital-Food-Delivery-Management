import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

const PantryTable = ({ data }) => {
  const [data1,setData]=useState(useSelector((state)=>state.userData.fetchAllStaff))

  const columns = [
    { label: "staff Name", field: "staffName", align: "center" },
    { label: "contactInfo", field: "contactInfo", align: "center" },
    { label: "location", field: "location", align: "center" },
    { label: "Actions", field: "actions", align: "center" },
 
  ];

  const handleEdit = (id) => {
    // Handle edit logic
    console.log(`Editing patient with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic
    console.log(`Deleting patient with id: ${id}`);
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
                style={{ color: "#fff", fontWeight: "bold", backgroundColor: "#002F31" }}
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
                  style={{ backgroundColor: "#f4f4f4", color: "#000" }} // Light gray background for rows
                >
                  {row[column.field] || "NA"} {/* Default to "N/A" if no data */}
                </TableCell>
              ))}

              {/* Action Column */}
              <TableCell align="center" style={{ backgroundColor: "#f4f4f4" }}>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(row.id)} // Assuming each row has an 'id' field
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(row.id)} // Assuming each row has an 'id' field
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PantryTable;
