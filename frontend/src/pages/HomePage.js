import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import ResumeImage from "./path-to-your-image.jpg"; // Replace with actual image path
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#2e6e2b" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hospital Food Delivery Management
          </Typography>
          <Link to={{ pathname: "/Signin" }} style={{color:"white"}}>
          <Button color="inherit">
            Sign In
          </Button></Link>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "left", animation: "fade-up 1s" }}>
              <Typography
                variant="h2"
                sx={{ mt: 2, fontSize: "60px", fontWeight: "bold" }}
              >
                Hospital Food Delivery Management
              </Typography>
              <Typography
                variant="h6"
                sx={{ mt: 2, fontSize: "20px", width: "90%" }}
              >
                Our Hospital Food Delivery Management system ensures timely,
                nutritious, and tailored meal delivery for patients and hospital
                staff. We aim to provide a seamless experience for both
                healthcare
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", animation: "fade-left 1s" }}></Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
