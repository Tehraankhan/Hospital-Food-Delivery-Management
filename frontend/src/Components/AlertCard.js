import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const AlertCard = ({ delayedMessages }) => {

  return (
    <Card sx={{ width: "30%", border: "2px solid #002F31"}}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Alert
        </Typography>
        {delayedMessages.length > 0 ? (
          <Box
            component="ul"
            sx={{
              padding: 0,
              margin: 0,
              listStyleType: "none",
              maxHeight: "90px", // Set a fixed height for scrolling
              overflowY: "auto", // Allow vertical scrolling
            }}
          >
            {delayedMessages.map((message, index) => (
              <Box
                component="li"
                key={index}
                sx={{ color: "red", marginBottom: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {message.message}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No Alert
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertCard;
