

const baseUrl = "https://localhost:7205/api/Procedure";


export const getAllProcedures = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };