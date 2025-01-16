import { React, useState, useEffect } from "react";
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
import AlertCard from "../Components/AlertCard";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

export default function StatusCard() {
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [pendingPreparations, setPendingPreparations] = useState(0);
  const [delayedMessages, setDelayedMessages] = useState("");

  useEffect(() => {
    socket.on("updatePendingDeliveries", (data) => {
      setPendingDeliveries(data.pendingDeliveries);
    });

    socket.on("updatePendingPreparations", (data) => {
      setPendingPreparations(data.pendingPreparations);
    });

    socket.on("mealDelayed", (message) => {
      // console.log("Received mealDelayed event:", message);
      // console.log("yes",message)
      setDelayedMessages(message);
      // alert(`Test alert: ${message}`);
    });

    return () => {
      socket.off("mealDelayed");
    };
  }, []);

  return (
    <>
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

        <AlertCard delayedMessages={delayedMessages} />
      </Box>
    </>
  );
}
