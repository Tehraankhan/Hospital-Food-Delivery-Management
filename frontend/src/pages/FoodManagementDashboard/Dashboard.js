import { React, useState, useEffect } from "react";
import PatientForm from "./PatientForm";
import DietChartForm from "./DietChartForm";
import axios from "axios";
import {
  Box,
  Card,
  Stack,
  Typography,
  Grid,
  IconButton,
  useTheme,
  InputAdornment,
  TextField,
  Menu,
  MenuItem,
  Button,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import TabComponent from "../../Components/Tabs";
import CustomButton from "../../Components/button";
import CustomModal from "../../Components/CustomModal";
import CustomTable from "../../Components/CustomTable";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import DietChartTable from "../../Components/DietChartTable";
import PatientTable from "../../Components/PatientTable";
import StaffModal from "./StaffForm";
import PantryTable from "../../Components/PantryTable";
import MealPreparationFormModal from "./MealPreparationModal";
import MealPreparationTable from "../../Components/MealPreparationTable";
import DeliveryTable from "../../Components/DeliveryTable";
import { io } from "socket.io-client";
import AlertCard from "../../Components/AlertCard";
import StatusCard from "../../Components/StatusCard";
import { useSelector, useDispatch } from 'react-redux';



// const socket = io("https://hospital-food-delivery-management-backend-rf3c.onrender.com");
export default function Dashboard() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isStaffModalOpen, setStaffModalOpen] = useState(false);
  const [isMealPreparationFormModalOpen, setMealPreparationFormModalOpen] =
    useState(false);
  const [currentTab, setCurrentTab] = useState("Patients");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [pendingPreparations, setPendingPreparations] = useState(0);
  const [delayedMessages, setDelayedMessages] = useState("");
  const dispatch = useDispatch();
 const loading2 = useSelector((state)=>state.userData.Loading)
  const handleTabClick = (label) => {
    setCurrentTab(label);
  };

  const fetchData = async () => {
    setLoading(true); // Start loading spinner
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      let url = "";
      switch (currentTab) {
        case "Patients":
        dispatch({type:"fetchAllPatient"})
         console.log(loading2)
          break;
        case "Diet Chart":
        dispatch({type:"fetchAllDietChart"})
          break;
        case "Add Staff":
          dispatch({type:"fetchAllStaff"})
          break;
        case "Meal Preparation":
          dispatch({type:"fetchAllMealPreparation"})
          break;
        case "Delivery Status":
          dispatch({type:"fetchAllDeliveryDetails"})
          break;
        default:
          break;
      }

      if (url) {
        const response = await axios.get(url, { headers });
        console.log(`${currentTab} Data:`, response.data);
        setData(response.data);
        
       
      }
    } catch (error) {
      console.error(`Error fetching ${currentTab} data:`, error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentTab]);

  const openModal = () => {
    switch (currentTab) {
      case "Patients":
        setPatientModalOpen(true);
        break;
      case "Diet Chart":
        setModalOpen(true);
        break;
      case "Add Staff":
        setStaffModalOpen(true);
        break;
      case "Meal Preparation":
        setMealPreparationFormModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (data, id) => {
    console.log(data);
    setLoading(true);

    if (currentTab === "Patients") {
      dispatch({type:"AddPatient",payload:data})

    } else if (currentTab === "Diet Chart") {

      dispatch({type:"AddDietChart",payload:{data,id}})
    } else if (currentTab === "Add Staff") {
      dispatch({type:"AddStaff",payload:data})
     
    } else if (currentTab === "Meal Preparation") {
      dispatch({type:"AddMealPreparation",payload:data})
      
    }
    await fetchData();
    setLoading(false);
  };

  // useEffect(() => {
  //   socket.on("updatePendingDeliveries", (data) => {
  //     console.log("Updated Pending Deliveries:", data.pendingDeliveries);
  //     setPendingDeliveries(data.pendingDeliveries);
  //   });

  //   socket.on("updatePendingPreparations", (data) => {
  //     console.log("Updated Pending Preparations:", data.pendingPreparations);
  //     setPendingPreparations(data.pendingPreparations);
  //   });
  //   socket.on("mealDelayed", (message) => {
  //     setDelayedMessages(message)
  //   });

  //   return () => {
  //     socket.off("mealDelayed");
  //   };
  // }, []);

  return (
    <>
      <MealPreparationFormModal
        open={isMealPreparationFormModalOpen}
        onClose={() => setMealPreparationFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        fetchData={fetchData}
      />
      <StaffModal
        open={isStaffModalOpen}
        onClose={() => setStaffModalOpen(false)}
        onSubmit={handleFormSubmit}
        fetchData={fetchData}
      />
      <DietChartForm
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        fetchData={fetchData}
      />
      <PatientForm
        open={isPatientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        onSubmit={handleFormSubmit}
        fetchData={fetchData}
      />

      <Box sx={{ width: "80%", margin: "auto" }}>
        {/* Cards Section */}
      <StatusCard/>

        {/* Tabs and Content Section */}
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Stack
            direction="row"
            gap="18px"
            flexWrap="wrap"
            alignItems="center"
            mt="28px"
            mb="30px"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <TabComponent
                labels={[
                  "Patients",
                  "Diet Chart",
                  "Add Staff",
                  "Meal Preparation",
                  "Delivery Status",
                ]}
                onTabClick={handleTabClick}
                color="#002F31"
              />
            </Box>

            <Stack direction="row" gap="18px">
              <CustomButton label={currentTab} onClick={openModal} value={1} />
            </Stack>
          </Stack>
        </Grid>

        {/* Display loading spinner or content */}
        {loading2 ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {currentTab === "Patients" && (
              <PatientTable data={data} fetchData={fetchData} />
            )}
            {currentTab === "Diet Chart" && (
              <DietChartTable dietCharts={data} fetchData={fetchData} />
            )}
            {currentTab === "Add Staff" && (
              <PantryTable data={data} fetchData={fetchData} />
            )}
            {currentTab === "Meal Preparation" && (
              <MealPreparationTable data={data} fetchData={fetchData} />
            )}
            {currentTab === "Delivery Status" && (
              <DeliveryTable data={data} fetchData={fetchData} />
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
