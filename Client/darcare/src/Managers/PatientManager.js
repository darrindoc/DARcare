import React from "react";

//use exact URL location in baseUrl ----> 7205 in this case
const baseUrl = 'https://localhost:7205/api/Patient';

export const getAllPatients = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };

  export const getPatientById = (id) => {
    return fetch(`${baseUrl}/${id}`) 
    .then((res) => {
      return res.json();
    })
  };

  export const getPatientHistory = (id) => {
    return fetch(`${baseUrl}/History/${id}`)
    .then((res) => {
      return res.json();
    })
  }

  export const addPatient = (firstName, lastName, dob, gender) => {
    return fetch(`${baseUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dob,
          gender: gender,
        })
    })
    }