import { createTheme } from "@mui/material/styles";

// Note:  Reference for customization
// https://mui.com/material-ui/customization/default-theme/

const defaultTheme = createTheme();

//Add common theme here
const commonTheme = createTheme({
  // Add shdows here in array format
  shadows: [
    "none",
    "0px 1px 10px 0px #E7E7E7", // Override first shadow (Default)
    "0px 2px 5px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.05)", //Image shadow
    ...defaultTheme.shadows.slice(2), // Keep all other default shadows unchanged
  ],

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    // Border radius
    borderRadius_xs: "6px",
    borderRadius_sm: "8px",
    borderRadius_md: "10px",
    borderRadius_mdl: "14px",

    taglineColor: "#007BFF",
  },
});

// Add typography here
const typography = {
  htmlFontSize: 16,
  fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  pxToRem: (px, baseFontSize = 16) => `${px / baseFontSize}rem`,

  h1: { fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(",") },
  h2: { fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(",") },
  h3: {
    fontSize: 24,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),

    // Example of responsive font size
    // [commonTheme.breakpoints.up("md")]: {
    //   fontSize: 28,
    // },
  },
  h4: {
    fontSize: 20,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
  },
  h5: {
    fontSize: 18,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
  },
  h6: {
    fontSize: 16,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
  },
  subtitle1: {
    fontSize: 14,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
  },
  subtitle2: {
    fontSize: 12,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
    lineHeight: "14px",
  },
  body1: {
    fontSize: 16,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
  },
  body2: {
    fontSize: 10,
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
  },
  button: {
    fontFamily: ["Roboto", "Montserrat", "sans-serif"].join(","),
    fontSize: 14,
    fontWeight: 500,
    textTransform: "uppercase",
  },
};

//Light and dark theme
export const lightTheme = createTheme(commonTheme, {
  palette: {
    mode: "light",

    primary: {
      main: "#ff4b08",
      light: "#ffe5dc",
    },

    success: {
      main: "#4caf50",
    },

    grey: {
      main: "#333333",
      dark: "#717273",
      light: "#e7e7e7",
      greyBg: "#F4F4F4",
    },

    button: {
      light: "#ffe5dc",
    },

    // text: {},

    common: {
      black: "#000",
      white: "#fff",
    },

    borderColor: "#DEE2E6",
    borderColor2: "#ced4da",

    // New vaiables
    textTitle: "#262429E8",
    backgroundColor: "#f3f5f8",

    darkBlue: "#080341",
    // Shadows
    // appBarShadow: "0px 4px 40px rgba(39, 32, 120, 0.1)",
    // cardShadow: "0px 9px 20px rgba(46, 35, 94, 0.07)",
    // posTableShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    // btnShadow2:
    //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    // imgShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",

    // Table
    // lightGrey: "#5C5470",
    // tableHeaderBg: "#E1F2FB",

    chipWarning: "#FF9500",
    chipWarningBg: "#FF95004D",
    chipSuccess: "#4CAF50",
    chipSuccessBg: "#4CAF504D",
    chipError: "#FF3B30",
    chipErrorBg: "#FF3B304D",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: commonTheme.shadows[1],
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          // color: "#bbdefb",
          borderRadius: "8px",
          borderWidth: "0px",
          borderColor: "#2196f3",
          border: "0px solid",
          // backgroundColor: "#0d47a1",
          boxShadow: commonTheme.shadows[1],
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          borderWidth: "0px",
          border: "0px solid",
          ":hover": {
            backgroundColor: "#dbdbdbe8",

            borderRadius: "8px",
            border: "0px solid",
            borderWidth: "0px",
          },
        },
        today: {
          borderRadius: "8px",
          borderWidth: "0px",
          // border: "0px solid !important",
        },
      },
    },
    MuiPickersMonth: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          borderWidth: "0px",
          border: "0px solid",
          gap: "4px",
          ":hover": {
            backgroundColor: "#dbdbdbe8",

            borderRadius: "8px",
            border: "0px solid",
            borderWidth: "0px",
          },
        },
        monthButton: {
          borderRadius: "8px",
          borderWidth: "0px",
          border: "0px solid",
          margin: "8px 4px",
          ":hover": {
            backgroundColor: "#dbdbdbe8",
            borderRadius: "8px",
            border: "0px solid",
            borderWidth: "0px",
          },
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          borderWidth: "0px",
          border: "0px solid",
          ":hover": {
            backgroundColor: "#dbdbdbe8",

            borderRadius: "8px",
            border: "0px solid",
            borderWidth: "0px",
          },
        },
        yearButton: {
          borderRadius: "8px",
          borderWidth: "0px",
          border: "0px solid",
          ":hover": {
            backgroundColor: "#dbdbdbe8",
            borderRadius: "8px",
            border: "0px solid",
            borderWidth: "0px",
          },
        },
      },
    },
  },
  typography,
});

export const darkTheme = createTheme(commonTheme, {
  palette: {
    mode: "dark",

    primary: {
      main: "#ff4b08",
      light: "#ffe5dc",
    },

    success: {
      main: "#4caf50",
    },

    grey: {
      main: "#333333",
      dark: "#717273",
      light: "#e7e7e7",
    },

    button: {
      light: "#ffe5dc",
    },

    // text: {},

    common: {
      black: "#000",
      white: "#fff",
    },

    // Bg Colos
    // bodyBg: "#F4F7F9",
    // drawerBg: "#2A3650",
    // activeItemColor: "#374462",
    // btnBgPrimary: "rgba(72, 163, 215, 0.2)",

    // Colors
    // whiteColor: "#FFF",
    // primaryColor: "#48A3D7",
    // blackColor: "#000",
    // errorColor: "#d32f2f",
    // blueColor1: "#00A9FF",
    // lightBlueColor: "#B4D4FF",
    // lightPurple: "#86B6F6",
    // lightPurple2: "#5F9DF7",
    // faintWhiteColor: "#f4fbff",
    // yellowColor1: "#FFC374",
    // yellowshade: "#cda16d",
    // purpleshade: "#514792",

    // rgba colors
    // whiteRgba: "rgba(255, 255, 255,0)",
    // blueText: "#1688CE",
    // whiteRgba2: "rgba(255, 255, 255,0.1)",

    borderColor: "#E0E2E7",

    // Shadows
    // appBarShadow: "0px 4px 40px rgba(39, 32, 120, 0.1)",
    // cardShadow: "0px 9px 20px rgba(46, 35, 94, 0.07)",
    // posTableShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    // btnShadow2:
    //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",

    // Table
    // lightGrey: "#5C5470",
    // tableHeaderBg: "#E1F2FB",

    chipWarning: "#FF9500",
    chipSuccess: "#4CAF50",
  },

  typography,
});
