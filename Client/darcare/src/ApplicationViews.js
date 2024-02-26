import React from "react";
import { Route, Routes } from "react-router-dom";
import { PatientList } from "./Components/Patient/PatientList";

export default function ApplicationViews() {
    return (
        <Routes>
          <Route path='/patient' element={<PatientList/>} />
      </Routes>
    );
  }