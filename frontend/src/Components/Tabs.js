import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const TabComponent = ({
  labels = [],
  color = "#002F31",
  onTabClick = () => {},
  tabContent = [],
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Notify parent about the selected tab label
    onTabClick(labels[newValue]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="dynamic tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: color,
            },
          }}
        >
          {labels.map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              sx={{
                color: color,
                "&.Mui-selected": {
                  color: "black", // Modify the selected color
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabContent.map((content, index) => (
        <TabPanel key={index} value={value} index={index}>
          {content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default TabComponent;
