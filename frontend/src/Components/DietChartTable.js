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
import DietChartFormModal from "../pages/FoodManagementDashboard/DietChartForm";
import axios from "axios";
import { useSelector } from "react-redux";

const DietChartTable = ({ dietCharts,fetchData }) => {
  const [data, setData] = useState(useSelector((state)=>state.userData.fetchAllDietChart));
  const [selectedData, setSelectedData] = useState(data);
  const [selectedId, setSelectedId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);


  const handleEdit = async ({data,fetchData}) => {
    try {
      console.log(selectedId, selectedData);
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      const response = await axios.put(
        `https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/DietChart/updateDiertChart/${selectedId}`,
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
        `https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/DietChart/deleteDietChart/${id}`,
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
      <DietChartFormModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleEdit}
        dietChartData={selectedData}
      />
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "400px", // Set maximum height for the table
          overflowY: "auto", // Enable vertical scrolling
          border: "1px solid #002F31",
        }}
      >
        <Table stickyHeader>
          {" "}
          {/* Enable sticky header */}
          <TableHead sx={{ backgroundColor: "#002F31" }}>
            <TableRow>
              <TableCell style={{ color: "#fff", backgroundColor: "#002F31" }}>
                Patient ID
              </TableCell>
              <TableCell style={{ color: "#fff", backgroundColor: "#002F31" }}>
                Meal Type
              </TableCell>
              <TableCell style={{ color: "#fff", backgroundColor: "#002F31" }}>
                Meal Name
              </TableCell>
              <TableCell style={{ color: "#fff", backgroundColor: "#002F31" }}>
                Ingredients
              </TableCell>
              <TableCell style={{ color: "#fff", backgroundColor: "#002F31" }}>
                Instructions
              </TableCell>
              <TableCell style={{ color: "#fff", backgroundColor: "#002F31" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((dietChart, index) => (
              <React.Fragment key={index}>
                {["morningMeal", "eveningMeal", "nightMeal"].map(
                  (mealType, mealIndex) => (
                    <TableRow key={`${dietChart.patientId}-${mealType}`}>
                      {mealIndex === 0 && (
                        <TableCell rowSpan={3}>{dietChart.patientId}</TableCell>
                      )}
                      <TableCell>{mealType.replace(/Meal/, " Meal")}</TableCell>
                      <TableCell>
                        {dietChart[mealType]?.mealName || "N/A"}
                      </TableCell>
                      <TableCell>
                        {dietChart[mealType]?.ingredients?.length > 0
                          ? dietChart[mealType].ingredients.join(", ")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {dietChart[mealType]?.instructions || "N/A"}
                      </TableCell>
                      {mealIndex === 0 && (
                        <TableCell rowSpan={3}>
                          <IconButton
                            onClick={() => {
                              setSelectedData(dietChart)
                                setSelectedId(dietChart._id);
                                setModalOpen(true)
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(dietChart._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
    </>
  );
};

export default DietChartTable;
