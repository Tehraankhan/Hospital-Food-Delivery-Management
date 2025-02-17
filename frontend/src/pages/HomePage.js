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
import { Link } from "react-router-dom";
import ResumeImage from "./Canteen.jpg"; // Image Import

const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ background: "#2e6e2b" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: '"Pacifico", cursive',
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Text Shadow
              color: "white",
            }}
          >
            Hospital Food Delivery Management
          </Typography>
          <Link to="/Signin" style={{ color: "white", textDecoration: "none" }}>
            <Button color="inherit">Sign In</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Section */}
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Left Side - Text Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "left", animation: "fade-up 1s" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "40px", md: "60px" },
                  fontWeight: "bold",
                  color: "#2e6e2b",
                }}
              >
                Hospital Food Delivery Management
              </Typography>
              <Typography
                variant="h6"
                sx={{ mt: 2, fontSize: "20px", width: "90%", color: "#555" }}
              >
                Our system ensures timely, nutritious, and tailored meal
                delivery for patients and hospital staff. We aim to provide a
                seamless experience for both healthcare professionals and
                patients.
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Image with Curved Design */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "400px",
                backgroundImage: `url(${ResumeImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                clipPath: "ellipse(90% 70% at 100% 50%)", // Curved effect
                borderRadius: "20px",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
