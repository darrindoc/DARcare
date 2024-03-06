import React, { useState, useEffect } from "react";
import { getAllDepartments, changeDepartment } from "../../Managers/DepartmentManager";
import { useNavigate } from "react-router-dom";
import { login } from "../../Managers/UserProfileManager";

export const DepartmentChange = ({setIsLoggedIn}) => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(0);
    const navigate = useNavigate();

    const userString = localStorage.getItem("userProfile");
    const user = JSON.parse(userString);
    
    const getDepartments = () => {
        getAllDepartments().then((fetchedDepartments) => setDepartments(fetchedDepartments));
    }

    useEffect(() => {
        getDepartments();
      }, []);

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(parseInt(e.target.value));
    };

    const handleSave = () => {
        changeDepartment(user.id, selectedDepartment)
        .then(() => login(user.userName, user.userPassword))
        .then(() => {setIsLoggedIn(true)})
        .then(() => navigate('/'))
        
    };

    return (

        <div className="department-change-popup">
            <h2>Select Department</h2>
            <select value={selectedDepartment} onChange={handleDepartmentChange}>
                {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                        {department.name}
                    </option>
                ))}
            </select>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}