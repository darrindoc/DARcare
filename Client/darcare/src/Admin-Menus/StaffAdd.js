import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStaff } from '../Managers/StaffManager';
import { getAllStaffTypes } from '../Managers/StaffTypeManager';

export const AddStaffForm = () => {
    const [newStaffData, setNewStaffData] = useState({
        firstName: "",
        lastName: "",
        credentials: "",
        title: "",
        userName: "", 
        userPassword: "",
        staffTypeId: 0,
      });
      const [staffTypes, setStaffTypes] = useState([])

      const navigate = useNavigate();


      //fetch staff types for staff type selection dropdown menu
      const getStaffTypes = () => {
        getAllStaffTypes().then((fetchedStaffTypes) => setStaffTypes(fetchedStaffTypes));
      }
      useEffect(() => {
        getStaffTypes();
      }, []);


      const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewStaffData({
          ...newStaffData,
          [name]: value
        });
      };
    
      const handleSubmit = (event) => {
        addStaff(newStaffData)
        navigate('/staff')
      };
      


    return(
    <div>
        <h2>Edit Staff</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={newStaffData.firstName} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={newStaffData.lastName} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="credentials">Credentials:</label>
                <input type="text" id="credentials" name="credentials" value={newStaffData.credentials} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={newStaffData.title} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="userName">UserName:</label>
                <input type="text" id="userName" name="userName" value={newStaffData.userName} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="userPassword">Password:</label>
                <input type="text" id="userPassword" name="userPassword" value={newStaffData.userPassword} onChange={handleInputChange} />
            </div>
            <label htmlFor="departmentId">Department ID:</label>
            <select id="staffTypeId" name="staffTypeId" value={newStaffData.staffTypeId} onChange={handleInputChange}>
            <option value="" disabled>Select a Staff Type</option>
            {staffTypes.map(staffType => (
                <option key={staffType.id} value={staffType.id}>{staffType.name}</option>
            ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}