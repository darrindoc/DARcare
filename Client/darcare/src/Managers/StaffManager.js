

const baseUrl = "https://localhost:7205/api/Staff";

export const getAllStaff = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };