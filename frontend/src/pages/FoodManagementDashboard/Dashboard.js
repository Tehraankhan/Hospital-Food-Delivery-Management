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

const socket = io("https://hospital-food-delivery-management-backhttps://hospital-food-delivery-management-backend-rf3c.onrender.com");
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
          url = "https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/getAllPatient";
          break;
        case "Diet Chart":
          url = "https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/DietChart/";
          break;
        case "Add Staff":
          url = "https://hospital-food-delivery-management-backend-rf3c.onrender.com/staff/getDetails";
          break;
        case "Meal Preparation":
          url = "https://hospital-food-delivery-management-backend-rf3c.onrender.com/mealpreparation/getData";
          break;
        case "Delivery Status":
          url = "https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/getData";
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
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await axios.post(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/add-details",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
            },
          }
        );
        console.log("Patient Data:", response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    } else if (currentTab === "Diet Chart") {
      try {
        console.log("yes");
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await axios.post(
          `https://hospital-food-delivery-management-backend-rf3c.onrender.com/patient/DietChart/addDiet/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
            },
          }
        );
        console.log("Patient Data:", response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    } else if (currentTab === "Add Staff") {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await axios.post(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/staff/add-staff",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
            },
          }
        );

        console.log("Patient Data:", response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    } else if (currentTab === "Meal Preparation") {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await axios.post(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/mealpreparation/addMeal",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
            },
          }
        );
        console.log("Meal Data:", response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
    await fetchData();
    setLoading(false);
  };

  useEffect(() => {
    socket.on("updatePendingDeliveries", (data) => {
      console.log("Updated Pending Deliveries:", data.pendingDeliveries);
      setPendingDeliveries(data.pendingDeliveries);
    });

    socket.on("updatePendingPreparations", (data) => {
      console.log("Updated Pending Preparations:", data.pendingPreparations);
      setPendingPreparations(data.pendingPreparations);
    });
    socket.on("mealDelayed", (message) => {
      setDelayedMessages(message)
    });

    return () => {
      socket.off("mealDelayed");
    };
  }, []);

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
        <Box
          sx={{
            width: "100%",
            minHeight: "150px",
            margin: "10px 0px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          {/* Card 1 with Cool Blue Background */}
          <Card
            sx={{
              width: "30%",
              backgroundColor: "#f5f5f5",
              border: "2px solid #002F31",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Meal Preparation Pending
              </Typography>
              {/* Row for Icon and Count */}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <KitchenIcon style={{ fontSize: 40, color: "orange" }} />
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {pendingPreparations}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 2: Delivery Pending */}
          <Card
            sx={{
              width: "30%",
              backgroundColor: "#f5f5f5",
              border: "2px solid #002F31",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery Pending
              </Typography>
              {/* Row for Icon and Count */}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <DeliveryDiningIcon style={{ fontSize: 40, color: "green" }} />
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {pendingDeliveries}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 3 with Cool Green Background */}
          <AlertCard delayedMessages={delayedMessages} />
        </Box>

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
        {loading ? (
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
