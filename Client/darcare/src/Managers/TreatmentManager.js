import React from "react";

//use exact URL location in baseUrl ----> 7205 in this case
const baseUrl = "https://localhost:7205/api/Treatment";

export const getTreatmentByEncounter = (id) => {
  // return fetch(`${baseUrl}/encounterId?id=${id}`)
  return fetch(`${baseUrl}/${id}`).then((res) => {
    return res.json();
  });
};

export const addTreatment = (treatmentData) => {
  return fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        encounterId: treatmentData.encounterId,
        notes: treatmentData.notes,
        procedureId: treatmentData.procedureId,
        procedureTime: treatmentData.procedureTime,
        staffId: treatmentData.staffId
      })
  })
  }
