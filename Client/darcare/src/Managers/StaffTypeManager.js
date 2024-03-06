

const baseUrl = 'https://localhost:7205/api/StaffType';

export const getAllStaffTypes = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };