import React from "react";

//use exact URL location in baseUrl ----> 7205 in this case
const baseUrl = 'https://localhost:7205/api/patient';

export const getAllPatients = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };