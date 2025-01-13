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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PatientForm from "../../src/pages/FoodManagementDashboard/PatientForm";
import axios from "axios";

const PatientTable = ({ data ,fetchData}) => {
  const [data1, setData] = useState(Array.isArray(data) ? data : []);
  const [selectedData, setSelectedData] = useState(data);
  const [selectedId, setSelectedId] = useState("");
  const columns = [
    { label: "Patient Name", field: "name", align: "center" },
    { label: "Disease", field: "disease", align: "center" },
    { label: "Allergies", field: "allergies", align: "center" },
    { label: "Room Number", field: "roomNumber", align: "center" },
    { label: "Bed Number", field: "bedNumber", align: "center" },
    { label: "Floor Number", field: "floorNumber", align: "center" },
    { label: "Age", field: "age", align: "center" },
    { label: "Gender", field: "gender", align: "center" },
    { label: "Contact Info", field: "contactInfo", align: "center" },
    { label: "Emergency Contact", field: "emergencyContact", align: "center" },
    { label: "Actions", field: "actions", align: "center" }, // Adding an Actions column for icons
  ];

  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const handleEdit = async (data) => {
    try {
      console.log(selectedId,selectedData)
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await axios.put(
        `https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/editPatient/${selectedId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
    await fetchData()
  };

  const handleDelete = async (id) => {
    try {

      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await axios.delete(
        `https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/deletePatient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );
    
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
    await fetchData()
  };

  return (
    <>
      <PatientForm
        open={isPatientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        onSubmit={handleEdit}
        patientData={selectedData}
      />
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
                    style={{ backgroundColor: "#f4f4f4", color: "#000" }} // Light gray background for rows
                  >
                    {row[column.field] || "N/A"}{" "}
                    {/* Default to "N/A" if no data */}
                  </TableCell>
                ))}

                {/* Action Column */}
                <TableCell
                  align="center"
                  style={{ backgroundColor: "#f4f4f4" }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => {
                      console.log(row._id);
                      setSelectedId(row._id);
                      setSelectedData(row);
                      setPatientModalOpen(true);
                    }} // Assuming each row has an 'id' field
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(row._id)} // Assuming each row has an 'id' field
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
    </>
  );
};

export default PatientTable;
