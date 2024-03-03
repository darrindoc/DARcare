import { useState, useEffect } from "react";
import React from "react";
import { getPatientById, getPatientHistory } from "../../Managers/PatientManager";
import { useParams, Link } from "react-router-dom";
import { formatDate, patientAge } from "../Functions";

export const PatientRecord = () => {
  const [patientRecord, setPatientRecord] = useState([]);
  const [patient, setPatient] = useState("")
  const { id } = useParams()

  const getPatient = () => {
    getPatientById(id).then((patient) => setPatient(patient));
  }

  const getPatientRecord = () => {
    getPatientHistory(id).then((patient) => setPatientRecord(patient));
  };

  useEffect(() => {
    getPatient();
  }, [id])

  useEffect(() => {
    getPatientRecord();
  }, [id])

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col"></div>
            <div class="card text-center">
                <h3>{patient.lastName}, {patient.firstName}</h3>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Date of Birth: {formatDate(patient.dateOfBirth)}</li>
                    <li class="list-group-item">{patient.gender}</li>
                    <li class="list-group-item">{patientAge(patient.dateOfBirth)} Years Old</li>
                </ul>
            </div>
        </div>
      <div class="row">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="col">Admission Date</th>
              <th scope="col">Discharge Date</th>
              <th scope="col">Encounter ID</th>
            </tr>
          </thead>
          <tbody>
            {patientRecord.map((record, index) => (
                <tr key={index}>
                    <td>{formatDate(record.encounter.admitTime)}</td>
                    <td>{formatDate(record.encounter.dischargeTime)}</td>
                    <td>{record.encounter.id}</td>
                </tr>
            ))}
          </tbody>
        </table>
    </div>
        <button class="btn btn-lg btn-success">
            <Link to="/patient" className="text-white">Patient Database</Link>
        </button>
    </div>
  );
};
