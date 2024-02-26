import React, { useEffect, useState } from "react";
import { getAllPatients} from "../../Managers/PatientManager";

export const PatientList = () => {
    const [patients, setPatients] = useState([]);

    const getPatientList = () => {
        getAllPatients().then((allPatients) => setPatients(allPatients));
    }

    useEffect(() => {
        getPatientList();
    }, []);

return (
<div>
    <table>
        <thead>
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
            </tr>
        </thead>
        <tbody>
            {patients.map((patient) => (
                <tr key={patient.id}>
                    <td>{patient.lastName}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.dateOfBirth}</td>
                    <td>{patient.gender}</td>
                </tr>
            ))}
        </tbody>
    </table>


</div>
)

}