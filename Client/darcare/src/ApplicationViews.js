import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientList } from "./Screens/PatientList";
import { HomeScreen } from "./Screens/Home";
import { PatientRegisterForm } from "./Screens/PatientRegister";
import { PatientRecord } from "./Screens/PatientRecord";
import { EncounterChart } from "./Screens/EncounterChart";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/patient" element={<PatientList />} />
      <Route path="/patient/record/:id" element={<PatientRecord />} />
      <Route path="/register" element={<PatientRegisterForm />} />
      <Route path="/encounter/:id" element={<EncounterChart />} />
    </Routes>
  );
}
