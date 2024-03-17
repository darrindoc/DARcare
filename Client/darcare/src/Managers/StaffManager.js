

const baseUrl = "https://localhost:7205/api/Staff";

export const getAllStaff = () => {
    return fetch(baseUrl) 
    .then((res) => {
      return res.json();
    })
  };

  export const addStaff = (newStaffData) => {
    return fetch(`${baseUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: newStaffData.firstName,
            lastName: newStaffData.lastName,
            credentials: newStaffData.credentials,
            title: newStaffData.title,
            userName: newStaffData.userName, 
            userPassword: newStaffData.userPassword,
            staffTypeId: newStaffData.staffTypeId
        })
    })
    }

    export const deleteStaff = (id) => {
        return fetch(`${baseUrl}/delete/${id}`, {
          method: "DELETE",
        })
          .then(() => getAllStaff())
      };

    export const editStaff = (editedStaff) => {
    return fetch(`${baseUrl}/edit/${editedStaff.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedStaff)
    }
    )}