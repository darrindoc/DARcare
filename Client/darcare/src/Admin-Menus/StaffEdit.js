import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStaffTypes } from "../Managers/StaffTypeManager";
import { editStaff } from "../Managers/StaffManager";

export const EditStaffForm = () => {
    const { id } = useParams();
    const [editedStaff, setEditedStaff] = useState({
        id: id,
        firstName: "",
        lastName: "",
        credentials: "",
        title: "",
        userName: "",
        userPassword: "",
        staffTypeId: 0,
        departmentId: 0,
    })
    const [staffTypes, setStaffTypes] = useState([])

    //fetch staff types for staff type selection dropdown menu
    const getStaffTypes = () => {
    getAllStaffTypes().then((fetchedStaffTypes) => setStaffTypes(fetchedStaffTypes));
    }
    useEffect(() => {
    getStaffTypes();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEditedStaff({
          ...editedStaff,
          [name]: value
        });
      };
    
    const handleSubmit = (event) => {
    editStaff(editedStaff)
    navigate('/staff')
    };

    const navigate = useNavigate();

    return(
        <div>
        <h2>Edit Staff</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={editedStaff.firstName} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={editedStaff.lastName} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="credentials">Credentials:</label>
                <input type="text" id="credentials" name="credentials" value={editedStaff.credentials} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={editedStaff.title} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="userName">UserName:</label>
                <input type="text" id="userName" name="userName" value={editedStaff.userName} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="userPassword">Password:</label>
                <input type="text" id="userPassword" name="userPassword" value={editedStaff.userPassword} onChange={handleInputChange} />
            </div>
            <label htmlFor="departmentId">Department ID:</label>
            <select id="staffTypeId" name="staffTypeId" value={editedStaff.staffTypeId} onChange={handleInputChange}>
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