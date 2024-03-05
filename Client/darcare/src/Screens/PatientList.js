import React, { useEffect, useState } from "react";
import { getAllPatients } from "../Managers/PatientManager";
import { Link } from "react-router-dom";

export const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchLastName, setSearchLastName] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchDateOfBirth, setSearchDateOfBirth] = useState("");

  const getPatientList = () => {
    getAllPatients().then((allPatients) => setPatients(allPatients));
  };

  useEffect(() => {
    getPatientList();
  }, []);

  const handleSearchLastNameChange = (event) => {
    setSearchLastName(event.target.value);
  };

  const handleSearchFirstNameChange = (event) => {
    setSearchFirstName(event.target.value);
  };

  const handleSearchDateOfBirthChange = (event) => {
    setSearchDateOfBirth(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const lastNameMatch = patient.lastName.toLowerCase().includes(searchLastName.toLowerCase());
    const firstNameMatch = patient.firstName.toLowerCase().includes(searchFirstName.toLowerCase());
    const dateOfBirthMatch = patient.dateOfBirth.includes(searchDateOfBirth);

    return lastNameMatch && firstNameMatch && dateOfBirthMatch;
  });

  return (
    <div class="col-fluid text-center">
      <h2>Patient Database</h2>
      <div class="row sticky-top border text-start" id="pt-database-search">
        <h4>Search</h4>
        <div class="mb-3 col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by last name"
            value={searchLastName}
            onChange={handleSearchLastNameChange}
          />
        </div>
        <div class="mb-3 col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by first name"
            value={searchFirstName}
            onChange={handleSearchFirstNameChange}
          />
        </div>
        <div class="mb-3 col-4">
          <input
            type="date"
            className="form-control"
            placeholder="Search by date of birth"
            value={searchDateOfBirth}
            onChange={handleSearchDateOfBirthChange}
          />
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Edit Patient</th>
            <th>Encounter History</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.lastName}</td>
              <td>{patient.firstName}</td>
              <td>
                {new Date(patient.dateOfBirth).toLocaleDateString("en-US")}
              </td>
              <td>{patient.gender}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <Link
                  to={`/patient/record/${patient.id}`}
                  className="btn btn-success"
                >
                  File
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
