import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientList } from "./Components/Patient/PatientList";
import { HomeScreen } from "./Screens/Home";

export default function ApplicationViews() {
    return (
        <Routes>
          <Route path='/patient' element={<PatientList/>} />
          <Route path='/' element={<HomeScreen/>} />

      </Routes>
    );
  }