import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { fetchAllDeliveryPersonnal, fetchAllPatient } from "./userDataApi";

// const url = "https://resume-maker-backend-13vv.onrender.com";

// Create a slice for managing user data
const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    Loading: true,
    fetchAllPatient: [],
    fetchAllDietChart: [],
    fetchAllStaff: [],
    fetchAllDeliveryPersonnal: [],
    fetchAllMealPreparartion: [],
    fetchAllDeliveryDetails: [],

    fetchAllPatientError: undefined,
    fetchAllDietChartError: undefined,
    fetchAllStaffError: undefined,
    fetchAllDeliveryPersonnalError: undefined,
    fetchAllMealPreparartionError: undefined,
    fetchAllDeliveryDetailsError: undefined,
  },
  reducers: {
    fetchAllPatientTrigger: (state, action) => {
      console.log("yes");
      return {
        ...state,
        Loading: true,
      };
    },
    fetchAllPatientSuccess: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllPatient: action.payload,
      };
    },

    fetchAllPatientFails: (state, action) => {
      return {
        ...state,
        fetchAllPatientError: action.payload,
      };
    },
    fetchAllDietChartTrigger: (state, action) => {
      console.log("Fetching all diet charts...");
      return {
        ...state,
        Loading: true,
      };
    },
    fetchAllDietChartSuccess: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllDietChart: action.payload,
        fetchAllDietChartError: undefined, // Reset error on success
      };
    },
    fetchAllDietChartFails: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllDietChartError: action.payload,
      };
    },

    // Staff
    fetchAllStaffTrigger: (state, action) => {
      console.log("Fetching all staff...");
      return {
        ...state,
        Loading: true,
      };
    },
    fetchAllStaffSuccess: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllStaff: action.payload,
        fetchAllStaffError: undefined, // Reset error on success
      };
    },
    fetchAllStaffFails: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllStaffError: action.payload,
      };
    },

    // Delivery Personnel
    fetchAllDeliveryPersonnalTrigger: (state, action) => {
      console.log("Fetching all delivery personnel...");
      return {
        ...state,
        Loading: true,
      };
    },
    fetchAllDeliveryPersonnalSuccess: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllDeliveryPersonnal: action.payload,
        fetchAllDeliveryPersonnalError: undefined, // Reset error on success
      };
    },
    fetchAllDeliveryPersonnalFails: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllDeliveryPersonnalError: action.payload,
      };
    },

    // Meal Preparation
    fetchAllMealPreparationTrigger: (state, action) => {
      console.log("Fetching all meal preparations...");
      return {
        ...state,
        Loading: true,
      };
    },
    fetchAllMealPreparationSuccess: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllMealPreparartion: action.payload,
        fetchAllMealPreparationError: undefined, // Reset error on success
      };
    },
    fetchAllMealPreparationFails: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllMealPreparationError: action.payload,
      };
    },

    // Delivery Status
    fetchAllDeliveryDetailsTrigger: (state, action) => {
      console.log("Fetching all delivery statuses...");
      return {
        ...state,
        Loading: true,
      };
    },
    fetchAllDeliveryDetailsSuccess: (state, action) => {
      return {
        ...state,
        Loading: false,
        fetchAllDeliveryDetails: action.payload,
        ffetchAllDeliveryDetailsError: undefined, // Reset error on success
      };
    },
    fetchAllDeliveryDetailsFails: (state, action) => {
      return {
        ...state,
        Loading: false,
        ffetchAllDeliveryDetailsError: action.payload,
      };
    },

    deletingResumeDataSuccess: (state, action) => {
      return {
        ...state,
        deletingResumeDataLoading: false,
      };
    },

    deletingResumeDataFails: (state, action) => {
      return {
        ...state,
        deletingResumeDataLoading: false,
        deleteResumeDataError: action.payload,
      };
    },
    updatePersonalData: (state, action) => {
      console.log(action.payload);
      state.personal = action.payload;
    },
    fetchSelectedDataTrigger: (state, action) => {
      console.log("yes");
      return {
        ...state,
        fetchSelectedDataLoading: true,
      };
    },
    fetchSelectedDataSuccess: (state, action) => {
      console.log(action.payload[0]);

      return {
        ...state,
        fetchSelectedDataLoading: false,
        fetchSelectedData: action.payload[0],

        ID: action.payload[0]._id,
      };
    },

    fetchSelectedDataFails: (state, action) => {
      return {
        ...state,
        fetchdataListLoading: false,
        fetchSelectedDataError: action.payload,
      };
    },
  },
});

// Export actions and reducer from the slice

export const {
  Loading,
  // Patient
  fetchAllPatientSuccess,
  fetchAllPatientError,
  fetchAllPatientFails,
  fetchAllPatientTrigger,

  // Diet Chart
  fetchAllDietChartSuccess,
  fetchAllDietChartError,
  fetchAllDietChartFails,
  fetchAllDietChartTrigger,

  // Staff
  fetchAllStaffSuccess,
  fetchAllStaffError,
  fetchAllStaffFails,
  fetchAllStaffTrigger,

  // Delivery Personnel
  fetchAllDeliveryPersonnalSuccess,
  fetchAllDeliveryPersonnalError,
  fetchAllDeliveryPersonnalFails,
  fetchAllDeliveryPersonnalTrigger,

  // Meal Preparation
  fetchAllMealPreparationSuccess,
  fetchAllMealPreparationError,
  fetchAllMealPreparationFails,
  fetchAllMealPreparationTrigger,

  // Delivery Status
  fetchAllDeliveryDetailsTrigger,
  fetchAllDeliveryDetailsSuccess,
  fetchAllDeliveryDetailsFails,
  fetchAllDeliveryDetailsError,

} = userDataSlice.actions;

export default userDataSlice.reducer;
