import axios from "axios";

// const BaseUrl = "http://localhost:5000";
const BaseUrl = "https://hospital-food-delivery-management-backend-rf3c.onrender.com/"
export const fetchAllPatient = (token) =>
  axios.get(`${BaseUrl}/patient/getAllPatient`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchAllDietCharts = (token) =>
  axios.get(`${BaseUrl}/patient/DietChart/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchAllStaff = (token, id) =>
  axios.get(`${BaseUrl}/staff/getDetails`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchAllmealPrepared = (token, id) =>
  axios.get(`${BaseUrl}/mealpreparation/getData`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchAllDeliveryDetails = (token, id) =>
  axios.get(`${BaseUrl}/Delivery/getData`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchAllDeliveryStatus = (token, id) =>
  axios.get(`http://localhost:5000/Delivery/getalltheDetails`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchAllDeliveryPersonnal = (token, id) =>
  axios.get(`${BaseUrl}/Delivery/getAllDeliveryDetails`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchAllMealBox = (token, id) =>
  axios.get(`${BaseUrl}/Delivery/getAllMealBoxDetails`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchAllAssignMeals = (token, id) =>
  axios.get(`${BaseUrl}/mealpreparation/getData`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const addDeliverPersonnal = (token, id, data) =>
  axios.post(`${BaseUrl}/Delivery/addDeliveryDetails`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const ChangedDeliveryStatus = (token, id) =>
  axios.post(`${BaseUrl}/Delivery/addDeliveryDetails`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const addMeal = (token, id, data) =>
  axios.post(`${BaseUrl}/mealpreparartion/addMeal`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const AssignMealBox = (token, id, data) =>
  axios.post(`${BaseUrl}/Delivery/addMealDelivery`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const AddPatient = (token, payload) =>
  axios.post(`${BaseUrl}/patient/add-details`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const AddStaff = (token,payload) =>
  axios.post(`${BaseUrl}/staff/add-staff`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const AddDietChart = (token,data,id) =>
  axios.post(`${BaseUrl}/patient/DietChart/addDiet/${id}`,data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const AddMeal = (token, payload) =>
  axios.post(`${BaseUrl}/mealpreparation/addMeal`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteSelectedDataAPI = (token, id) =>
  axios.delete(`http://localhost:5000/notes/delete/selecteddata/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const updateDataAPI = (token, data, id) =>
  axios.put(`http://localhost:5000/notes/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
