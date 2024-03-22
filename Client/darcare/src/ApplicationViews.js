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
import { AddEncounterForm } from "./Components/Encounters/AddEncounter";
import { StaffList } from "./Admin-Menus/StaffMenu";
import { AddStaffForm } from "./Admin-Menus/StaffAdd";
import { EditStaffForm } from "./Admin-Menus/StaffEdit";
import { ProcedureList } from "./Admin-Menus/ProcedureMenu";
import { AddProcedureForm } from "./Admin-Menus/ProcedureAdd.js";
import { EditProcedureForm } from "./Admin-Menus/ProcedureEdit.js";

export default function ApplicationViews({setIsLoggedIn}) {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/departmentchange" element={<DepartmentChange setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/patient" element={<PatientList />} />
      <Route path="/patient/record/:id" element={<PatientRecord />} />
      <Route path="/register" element={<PatientRegisterForm />} />
      <Route path="/encounter/:id" element={<EncounterChart />} />
      <Route path="/encounter/add" element={<AddEncounterForm />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
      <Route path="/staff/menu" element={<StaffList />} />
      <Route path="/staff/add" element={<AddStaffForm/>} />
      <Route path="/staff/edit/:id" element={<EditStaffForm/>} />
      <Route path="/procedures/menu" element={<ProcedureList />} />
      <Route path="/procedures/add" element={<AddProcedureForm/>} />
      <Route path="/procedures/edit/:id" element={<EditProcedureForm/>} />
      <Route path="/addtreatment" element={<AddTreatmentForm />} />
    </Routes>
  );
}
