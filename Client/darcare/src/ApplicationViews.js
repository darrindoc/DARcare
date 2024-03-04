import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientList } from "./Screens/PatientList";
import { HomeScreen } from "./Screens/Home";
import { PatientRegisterForm } from "./Screens/PatientRegister";
import { PatientRecord } from "./Screens/PatientRecord";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/patient" element={<PatientList />} />
      <Route path="/patient/record/:id" element={<PatientRecord />} />
      <Route path="/register" element={<PatientRegisterForm />} />
    </Routes>
  );
}
