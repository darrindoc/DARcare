//Lots of useful functions in one place to help keep my code ***DRY***





//Will calculate current patient age in years with dateOfBirth input
export const patientAge = (dateOfBirth) => {
    const DOB = new Date(dateOfBirth)
    const ageCalc = Date.now() - DOB.getTime()
    const age = new Date(ageCalc)
    //as far as computers are concerned, time began in 1970, so that is why we subtract it ⏳
    return Math.abs(age.getUTCFullYear() - 1970)
}


  //Access localstorage for userProfile
  const userString = localStorage.getItem("userProfile");
  const user = JSON.parse(userString);