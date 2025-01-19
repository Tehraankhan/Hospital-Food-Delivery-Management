import { call, put, select } from "redux-saga/effects";
import {
  fetchAllPatientFails,
  fetchAllPatientSuccess,
  fetchAllPatientTrigger,
  fetchAllDietChartSuccess,
  fetchAllDietChartFails,
  fetchAllDietChartTrigger,

  // Staff
  fetchAllStaffSuccess,
  fetchAllStaffFails,
  fetchAllStaffTrigger,

  // Delivery Personnel
  fetchAllDeliveryPersonnalSuccess,
  fetchAllDeliveryPersonnalFails,
  fetchAllDeliveryPersonnalTrigger,

  // Meal Preparation
  fetchAllMealPreparationSuccess,
  fetchAllMealPreparationFails,
  fetchAllMealPreparationTrigger,

  // Delivery Status
  fetchAllDeliveryDetailsFails,
  fetchAllDeliveryDetailsTrigger,
  fetchAllDeliveryDetailsSuccess,
} from "./userRedux";

import {
  fetchAllPatient,
  fetchAllDietCharts,
  fetchAllStaff,
  fetchAllmealPrepared,
  fetchAllDeliveryDetails,
  AddPatient,
  AddDietChart,
  AddMeal,
  AddStaff,
  AssignMealBox,
} from "./userDataApi";

export function* fetchAllPatientSaga() {
  console.log("yes");
  try {
    yield put(fetchAllPatientTrigger());
    const token = localStorage.getItem("token");
    const response = yield call(fetchAllPatient, token);

    yield put(fetchAllPatientSuccess(response.data));
  } catch (error) {
    yield put(fetchAllPatientFails(error.response.data.message));
  }
}

export function* AddPatientSaga({ payload }) {
  console.log(payload);
  console.log("yes");
  try {
    const token = localStorage.getItem("token");
    const response = yield call(AddPatient, token, payload);
    yield put(fetchAllPatientTrigger());
    const response2 = yield call(fetchAllPatient, token);

    yield put(fetchAllPatientSuccess(response2.data));
  } catch (error) {
    yield put(fetchAllPatientFails(error.response.data.message));
  }
}

// Diet Chart Saga
export function* fetchAllDietChartSaga() {
  console.log("Fetching all diet charts...");
  try {
    yield put(fetchAllDietChartTrigger());
    const token = localStorage.getItem("token");
    const response = yield call(fetchAllDietCharts, token);

    yield put(fetchAllDietChartSuccess(response.data));
  } catch (error) {
    yield put(fetchAllDietChartFails(error.response.data.message));
  }
}

export function* AddDietChartSaga({payload}) {
  console.log("Fetching all diet charts...");
  try {
    const {id,data}=payload
    console.log(id,data)
    const token = localStorage.getItem("token");
    const response = yield call(AddDietChart, token, data,id);

    yield put(fetchAllDietChartTrigger());
    const response2 = yield call(fetchAllDietCharts, token);

    yield put(fetchAllDietChartSuccess(response2.data));
  } catch (error) {
    yield put(fetchAllDietChartFails(error.response.data.message));
  }
}

// Staff Saga
export function* fetchAllStaffSaga() {
  console.log("Fetching all staff...");
  try {
    yield put(fetchAllStaffTrigger());
    const token = localStorage.getItem("token");
    const response = yield call(fetchAllStaff, token);

    yield put(fetchAllStaffSuccess(response.data));
  } catch (error) {
    yield put(fetchAllStaffFails(error.response.data.message));
  }
}

export function* AddStaffSaga({ payload }) {
  console.log("Fetching all staff...");
  try {
    const token = localStorage.getItem("token");
    const response = yield call(AddStaff, token, payload);

    yield put(fetchAllStaffTrigger());
    const response1 = yield call(fetchAllStaff, token);

    yield put(fetchAllStaffSuccess(response1.data));
  } catch (error) {
    yield put(fetchAllStaffFails(error.response.data.message));
  }
}

// Delivery Personnel Saga
export function* fetchAllDeliveryPersonnalSaga() {
  console.log("Fetching all delivery personnel...");
  try {
    yield put(fetchAllDeliveryPersonnalTrigger());
    const token = localStorage.getItem("token");
    const response = yield call(fetchAllDeliveryDetails, token);

    yield put(fetchAllDeliveryPersonnalSuccess(response.data));
  } catch (error) {
    yield put(fetchAllDeliveryPersonnalFails(error.response.data.message));
  }
}

// Meal Preparation Saga
export function* fetchAllMealPreparationSaga() {
  console.log("Fetching all meal preparations...");
  try {
    yield put(fetchAllMealPreparationTrigger());
    const token = localStorage.getItem("token");
    const response = yield call(fetchAllmealPrepared, token);

    yield put(fetchAllMealPreparationSuccess(response.data));
  } catch (error) {
    yield put(fetchAllMealPreparationFails(error.response.data.message));
  }
}
export function* AddMealPreparationSaga({ payload }) {
  console.log("Fetching all meal preparations...");
  try {
    const token = localStorage.getItem("token");
    const response = yield call(AddMeal, token, payload);

    yield put(fetchAllMealPreparationTrigger());
    const response1 = yield call(fetchAllmealPrepared, token);

    yield put(fetchAllMealPreparationSuccess(response1.data));
  } catch (error) {
    yield put(fetchAllMealPreparationFails(error.response.data.message));
  }
}

// Delivery Status Saga
export function* fetchAllDeliveryDetailsSaga() {
  console.log("Fetching all delivery statusesbb...");
  try {
    yield put(fetchAllDeliveryDetailsTrigger());
    const token = localStorage.getItem("token");
    const response = yield call(fetchAllDeliveryDetails, token);

    yield put(fetchAllDeliveryDetailsSuccess(response.data));
  } catch (error) {
    yield put(fetchAllDeliveryDetailsFails(error.response.data.message));
  }
}
