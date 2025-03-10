import { React, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
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
} from "@mui/material";
import TabComponent from "../../Components/Tabs";
import CustomButton from "../../Components/button";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import DietChartTable from "../../Components/DietChartTable";
import MealPreparationTable from "../../Components/MealPreparationTable";
import DeliveryPersonnelModal from "./DeliveryPersonnalModal";
import MealBoxModal from "./MealBoxModal";
import DeliveryTable from "../../Components/DeliveryTable2";
import MealAssignTable from "../../Components/MealAssignTable";
import DeliveryPersonnalTable from "../../Components/DeliveryPersonnalTable";
import AlertCard from "../../Components/AlertCard";
import StatusCard from "../../Components/StatusCard";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

// const socket = io("https://hospital-food-delivery-management-backend-rf3c.onrender.com");


export default function PantryDashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeliveryPersonnelModalOpen, setDeliveryPersonnelModalOpen] =
    useState(false);

  const [currentTab, setCurrentTab] = useState("view Assign Meals");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [pendingPreparations, setPendingPreparations] = useState(0);
  const [delayedMessages, setDelayedMessages] = useState("");
  const dispatch = useDispatch();
  const loading2 = useSelector((state)=>state.userData.fetchAllPatientLoading)
console.log(loading2)
  const handleTabClick = (label) => {
    setCurrentTab(label);
  };
  const handleFormSubmit = async (data, id) => {
    if (currentTab === "Assign meal Box") {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        console.log("Data being sent:", data); // Log data for debhttps://hospital-food-delivery-management-backend-rf3c.onrender.com/
        const response = await axios.post(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/addMealDelivery", // Ensure this URL is correct
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
            },
          }
        );

        console.log("Response Data:", response.data); // Log response data
        console.log("Meal delivery successfully added!");
      } catch (error) {
        console.error(
          "Error adding meal delivery:",
          error.response?.data || error.message
        );
      }
    } else if (currentTab === "Add delivery Personnel") {
      try {
        console.log("yes");
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await axios.post(
          `https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/addDeliveryDetails`,
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
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/mealpreparartion/addMeal",
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
  };

  // useEffect(() => {
  //   socket.on("updatePendingDeliveries", (data) => {
      
  //     setPendingDeliveries(data.pendingDeliveries);
  //   });

  //   socket.on("updatePendingPreparations", (data) => {
     
  //     setPendingPreparations(data.pendingPreparations);
  //   });

  //   socket.on("mealDelayed", (message) => {
  //     // console.log("Received mealDelayed event:", message);
  //     // console.log("yes",message)
  //     setDelayedMessages(message);
  //     // alert(`Test alert: ${message}`);
  //   });

  //   return () => {
  //     socket.off("mealDelayed");
  //   };
  // }, []);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      let token = localStorage.getItem("token");
      let response;

      if (currentTab === "Changed Delivery Status") {
        response = await axios.get(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/getalltheDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (currentTab === "Add delivery Personnel") {
        response = await axios.get(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/getAllDeliveryDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (currentTab === "Assign meal Box") {
        response = await axios.get(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/Delivery/getAllMealBoxDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (currentTab === "view Assign Meals") {
        response = await axios.get(
          "https://hospital-food-delivery-management-backend-rf3c.onrender.com/mealpreparation/getData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentTab]);

  const openModal = () => {
    switch (currentTab) {
      case "Add delivery Personnel":
        setDeliveryPersonnelModalOpen(true);
        break;
      case "Assign meal Box":
        setModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MealBoxModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        fetchData={fetchData}
      />

      <DeliveryPersonnelModal
        open={isDeliveryPersonnelModalOpen}
        onClose={() => setDeliveryPersonnelModalOpen(false)}
        onSubmit={handleFormSubmit}
        fetchData={fetchData}
      />

      <Box sx={{ width: "80%", margin: "auto" }}>
        {/* Cards Section */}
        <StatusCard/>

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
                  "view Assign Meals",
                  "Add delivery Personnel",
                  "Assign meal Box",
                  "Changed Delivery Status",
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

        {/* Show loading spinner or data */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress /> {/* Material UI spinner */}
          </Box>
        ) : (
          <>
            {currentTab === "view Assign Meals" && (
              <MealPreparationTable
                data={data}
                editstatus={true}
                fetchData={fetchData}
              />
            )}
            {currentTab === "Changed Delivery Status" && (
              <DeliveryTable
                data={data}
                editstatus={true}
                fetchData={fetchData}
              />
            )}
            {currentTab === "Assign meal Box" && (
              <MealAssignTable data={data} fetchData={fetchData} />
            )}
            {currentTab === "Add delivery Personnel" && (
              <DeliveryPersonnalTable data={data} fetchData={fetchData} />
            )}
          </>
        )}
      </Box>
    </>
  );
}
