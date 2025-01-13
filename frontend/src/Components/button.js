import React from "react";

import { Button } from "@mui/material";

const CustomButton = ({ label, value, onClick }) => {
  return (
    <>

   
    <Button
      variant="contained"
      color="primary"
      onClick={() => onClick(value)} // Trigger onClick with the value passed
      sx={{
        margin: "8px", // You can adjust the margin or styling here
        backgroundColor: "#FFB800", // Custom color
        color: "#002F31",
        "&:hover": {
          backgroundColor: "#004C47", // Darker color on hover
        },
      }}
    >
      {label}
    </Button> </>
  );
};

export default CustomButton;
