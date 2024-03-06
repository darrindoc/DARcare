

const baseUrl = 'https://localhost:7205/api/Department';

export const getAllDepartments = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };

  export const changeDepartment = (userId, departmentId) => {
    return fetch(`https://localhost:7205/api/Staff/department?userId=${userId}&departmentId=${departmentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            departmentId: departmentId
        })
    })
    }