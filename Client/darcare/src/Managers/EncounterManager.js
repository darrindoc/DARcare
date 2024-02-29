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