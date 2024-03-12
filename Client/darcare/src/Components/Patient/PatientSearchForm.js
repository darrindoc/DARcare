import React, { useState, useEffect } from 'react';
import { addPatient, getAllPatients } from '../../Managers/PatientManager';
import { formatDate } from '../Functions';

export const PatientSearchForm = ({ matchedPatient, setMatchedPatient }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [patientDB, setPatientDB] = useState([]);
  //const [matchedPatient, setMatchedPatient] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false)

  const getPatientList = () => {
    getAllPatients().then((allPatients) => setPatientDB(allPatients));
  }

  useEffect(() => {
    getPatientList();
  }, []);

  // Search Patients object (assigned to patientDB state)
  const handleSubmit = (e) => {
    e.preventDefault();
    const standardizedDob = new Date(dob).toISOString().slice(0, 10)
    const matched = patientDB.find(patient => patient.firstName === firstName && patient.lastName === lastName && patient.dateOfBirth.slice(0, 10) === standardizedDob);
    if (matched) {
      //show matched patient's data and show register button
      setMatchedPatient(matched);
      setSearchClicked(true)
    } else {
      //show message for no match and show "Register New Patient" button (which has a warning to check name and DOB)
      setMatchedPatient("noMatch");
      setSearchClicked(true)
    }
  };

  const searchWarning = () => {
    const verifyReg = window.confirm("This action will create a new patient. Please verify spelling of patient's name and date of birth are correct.")
    if (verifyReg) {
      addPatient(firstName, lastName, dob, gender)
  }
}


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
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
              <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </label>
            <label>
              Gender:
              <select required id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
                <option value="" disabled selected>Please select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
          
            </label>
            <button className="btn btn-sm btn-success" type="submit">Search</button>
          </form>
          {searchClicked && matchedPatient !== "noMatch" ? (
            <div>
              <h3>Match Found:</h3>
              <p>Name: {matchedPatient.firstName} {matchedPatient.lastName}</p>
              <p>Date of Birth: {formatDate(matchedPatient.dateOfBirth)}</p>
              <button className="btn btn-danger">Register Patient</button>
            </div>
          ) : (
            searchClicked && 
            <div>
              <h3>No Match Found</h3>
              <button className="btn btn-danger" onClick={searchWarning}>Add New Patient</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
