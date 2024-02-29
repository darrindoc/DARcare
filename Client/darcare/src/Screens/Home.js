import React from "react";
import { ActivePatientTable } from "../Components/Patient/ActivePatientTable";

export const HomeScreen = () => {

  //Access localstorage for userProfile
  const userString = localStorage.getItem("userProfile");
  const user = JSON.parse(userString);

  return (
    <div class="container-fluid col text-center" id="main-home">
        
        <div class="row" id="top-row-home">
            <div class="col-4">
                <h3>Welcome, {user.firstName}</h3>
            </div>
            <div class="col-8">
                <h3>Active Patients - {user.departmentName}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-4" id="staff-menu">
            
            </div>
            <div class="col-8" id="active-patient-chart">
                    <ActivePatientTable/>
            </div>
        </div>
    </div>

  );
};
