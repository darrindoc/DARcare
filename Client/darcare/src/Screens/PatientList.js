import React, { useEffect, useState } from "react";
import { getAllPatients } from "../Managers/PatientManager";
import { Link } from "react-router-dom";

export const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const getPatientList = () => {
    getAllPatients().then((allPatients) => setPatients(allPatients));
  };

  useEffect(() => {
    getPatientList();
  }, []);

  return (
    <div>
      <table>
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
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.lastName}</td>
              <td>{patient.firstName}</td>
              <td>
                {new Date(patient.dateOfBirth).toLocaleDateString("en-US")}
              </td>
              <td>{patient.gender}</td>
              <td>
                <button>Edit </button>
              </td>
              <button class="btn btn-lg btn-success">
                <Link
                  to={`/patient/record/${patient.id}`}
                  className="text-white"
                >
                  File
                </Link>
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
