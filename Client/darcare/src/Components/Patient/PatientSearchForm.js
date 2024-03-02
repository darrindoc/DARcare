import React, { useState, useEffect } from 'react';
import { getAllPatients } from '../../Managers/PatientManager';



export const PatientSearchForm = ({ people }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [patientDB, setPatientDB] = useState([]);
  const [matchedPatient, setMatchedPatient] = useState(null);


  const getPatientList = () => {
      getAllPatients().then((allPatients) => setPatientDB(allPatients));
  }

  useEffect(() => {
      getPatientList();
  }, []);

  //search Patients
  const handleSubmit = (e) => {
    e.preventDefault();
    const standardizedDob = new Date(dob).toISOString().slice(0, 10)
    const matched = patientDB.find(patient => patient.firstName === firstName && patient.lastName === lastName && patient.dateOfBirth.slice(0, 10) === standardizedDob);
    if (matched) {
        setMatchedPatient(matched);
      } else {
        setMatchedPatient("noMatch");
      }
  };

  const searchWarning = () => {
    const verifyReg = window.confirm("This action will create a new patient. Please verify spelling of patient's name and date of birth are correct.")
    if (verifyReg) {
        //I will POST patient details to database and proceed to same Encounter creation screen
    }
  }
  

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 text-center">
            <h1>Register Patient</h1>
                <h2>Patient Search</h2>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
              Last Name:
              <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
              Date of Birth:
              <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)}/>
            </label>
            <button class="btn btn-sm btn-success" type="submit">Search</button>
          </form>
          {matchedPatient == null ? (
            <div>
              <h3>Match Found:</h3>
              <p>Name: {matchedPatient.firstName} {matchedPatient.lastName}</p>
              <p>Date of Birth: {matchedPatient.dateOfBirth}</p>
              <button class="btn btn-danger">Register Patient</button>
            </div>
          ) : (
            <div>
                <h3>No Patient Selected</h3>
              <button class="btn btn-danger" onClick={searchWarning}>Register New Patient</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};