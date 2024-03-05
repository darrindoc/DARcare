import React from "react";

//use exact URL location in baseUrl ----> 7205 in this case
const baseUrl = 'https://localhost:7205/api/Treatment';

export const getTreatmentByEncounter = (id) => {
    return fetch(`${baseUrl}/encounterId?id=${id}`) 
    .then((res) => {
      return res.json();
    })
  };