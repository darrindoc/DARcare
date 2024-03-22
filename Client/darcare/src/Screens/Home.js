import React, { useState } from "react";
import { ActivePatientTable } from "../Components/Patient/ActivePatientTable";
import { Link } from "react-router-dom";

export const HomeScreen = () => {

  //Access localstorage for userProfile
  const userString = localStorage.getItem("userProfile");
  const user = JSON.parse(userString);


  return (
    <div className="container-fluid col text-center d-flex flex-column" style={{ minHeight: "91vh" }} id="main-home">
      <div className="row" id="top-row-home">
        <div className="col-4">
          <h3>Welcome, {user.firstName}</h3>
        </div>
        <div className="col-8">
          <h3>Active Patients - {user.departmentName}</h3>
        </div>
      </div>
      <div className="row flex-grow-1">
        <div className="col-4 d-flex flex-column align-items-center" id="staff-menu">
          <div className="d-flex flex-column align-items-center justify-content-around" style={{ minHeight: "75%" }}>
            <button className="btn btn-lg btn-primary">
              <Link to="/departmentchange" className="text-white">Change Department</Link>
            </button>
            <button className="btn btn-lg btn-info">
              <Link to="/encounter/add" className="text-white">Register Patient</Link>
            </button>
            <button className="btn btn-lg btn-success">
              <Link to="/patient" className="text-white">Patient Database</Link>
            </button>
            {user.staffTypeId === 4 && (
              <button className="btn btn-lg btn-danger">
                <Link to="/admin/panel" className="text-white">Admin Panel</Link>
              </button>
            )}
          </div>
        </div>
        <div className="col-8" id="active-patient-chart">
          <ActivePatientTable />
        </div>
      </div>
    </div>
  );
  
};
