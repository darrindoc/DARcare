




const apiUrl = "https://localhost:7205/api/staff";

export const getAllUsers = () => {
  return fetch(`${apiUrl}`) 
    .then((res) => res.json())
};

export const getUserByUserName = (username) => {
	return fetch(`${apiUrl}/${username}`).then((res) => res.json());
};

////////////////////////////////////////////

export const login = (userString, userPassword) => {
  return fetch(`${apiUrl}/${userString}`)
  .then((r) => r.json())
    .then((userProfile) => {
      if(userProfile.id){
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile
      }
      else{
        return undefined
      }
    });
};

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject, password) => {
  return  fetch(`${apiUrl}/api/userprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};





// return (
//   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register,  }}>
//      {props.children}
//   </UserProfileContext.Provider>
// );