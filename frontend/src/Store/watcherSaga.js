import { takeLatest } from "redux-saga/effects";

import {
  fetchAllPatientSaga,
  fetchAllDietChartSaga,
  fetchAllStaffSaga,
  fetchAllDeliveryPersonnalSaga,
  fetchAllMealPreparationSaga,
  fetchAllDeliveryDetailsSaga,
  AddPatientSaga,
  AddDietChartSaga,
  AddMealPreparationSaga,
  AddStaffSaga,
} from "./userDataSaga";

export function* userDataWatcherSaga() {
  yield takeLatest("fetchAllPatient", fetchAllPatientSaga);
  yield takeLatest("fetchAllDietChart", fetchAllDietChartSaga);
  yield takeLatest("fetchAllStaff", fetchAllStaffSaga);
  yield takeLatest("fetchAllDeliveryPersonnal", fetchAllDeliveryPersonnalSaga);
  yield takeLatest("fetchAllMealPreparation", fetchAllMealPreparationSaga);
  yield takeLatest("fetchAllDeliveryDetails", fetchAllDeliveryDetailsSaga);
  yield takeLatest("AddDietChart", AddDietChartSaga);
  yield takeLatest("AddMealPreparation",AddMealPreparationSaga);
  yield takeLatest("AddStaff", AddStaffSaga);;
  
}
