import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientList } from "./Components/Patient/PatientList";
import { HomeScreen } from "./Screens/Home";
import { PatientRegisterForm } from "./Components/Patient/PatientRegister";

export default function ApplicationViews() {
    return (
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/patient' element={<PatientList/>} />
          <Route path='/register' element={<PatientRegisterForm/>} />

      </Routes>
    );
  }