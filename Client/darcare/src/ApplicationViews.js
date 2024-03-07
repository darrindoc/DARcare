import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientList } from "./Screens/PatientList";
import { HomeScreen } from "./Screens/Home";
import { PatientRegisterForm } from "./Screens/PatientRegister";
import { PatientRecord } from "./Screens/PatientRecord";
import { EncounterChart } from "./Screens/EncounterChart";
import { AdminPanel } from "./Screens/AdminPanel";
import { DepartmentChange } from "./Components/Staff/StaffDepartment";
import { AddTreatmentForm } from "./Components/Treatments/AddTreatmentForm";

export default function ApplicationViews({setIsLoggedIn}) {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/departmentchange" element={<DepartmentChange setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/patient" element={<PatientList />} />
      <Route path="/patient/record/:id" element={<PatientRecord />} />
      <Route path="/register" element={<PatientRegisterForm />} />
      <Route path="/encounter/:id" element={<EncounterChart />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
      <Route path="/addtreatment" element={<AddTreatmentForm />} />
    </Routes>
  );
}
