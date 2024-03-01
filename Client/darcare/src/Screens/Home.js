import React, { useState } from "react";
import { ActivePatientTable } from "../Components/Patient/ActivePatientTable";
import { PatientSearchForm } from "../Components/Patient/PatientSearchForm";

export const HomeScreen = () => {
    const [showPatientSearch, setShowPatientSearch] = useState(false);

  //Access localstorage for userProfile
  const userString = localStorage.getItem("userProfile");
  const user = JSON.parse(userString);

  const handleButtonClick = () => {
    setShowPatientSearch(true);
  };

  const handleClosePopup = () => {
    setShowPatientSearch(false);
  };


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
            <button class="btn btn-lg btn-success" onClick={handleButtonClick}>Register Patient</button>
                {showPatientSearch && (
                    <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>Close</span>
                        <PatientSearchForm />
                    </div>
                    </div>
                  )}
            </div>
            <div class="col-8" id="active-patient-chart">
                    <ActivePatientTable/>
            </div>
        </div>
    </div>

  );
};
