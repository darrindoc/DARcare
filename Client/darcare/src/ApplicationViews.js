import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientList } from "./Components/Patient/PatientList";
import { HomeScreen } from "./Screens/Home";
import { PatientRegisterForm } from "./Components/Patient/PatientRegister";
import { PatientRecord } from "./Components/Patient/PatientRecord";

export default function ApplicationViews() {
    return (
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/patient' element={<PatientList/>} />
          <Route path='/patient/record/:id' element ={<PatientRecord/>} />
          <Route path='/register' element={<PatientRegisterForm/>} />

      </Routes>
    );
  }