import React from "react";

//use exact URL location in baseUrl ----> 7205 in this case
const baseUrl = 'https://localhost:7205/api/Encounter';

export const getAllPatients = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };

  export const getAllActivePatients = () => {
    return fetch(`${baseUrl}/active`) 
    .then((res) => {
      return res.json();
    })
  };

  export const getEncounterById = (id) => {
    return fetch(`${baseUrl}/${id}`) 
    .then((res) => {
      return res.json();
    })
  };

  export const addEncounter = (encounterData) => {
    return fetch(`${baseUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientId: encounterData.patientId,
          admitTime: encounterData.admitTime,
          dischargeStatusId: 0,
          admitStatusId: 0,
          encounterStatusId: 0,
          departmentId: encounterData.departmentId,
          locationId: encounterData.locationId
        })
    })
    }