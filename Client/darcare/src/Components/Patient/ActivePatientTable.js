import React, { useEffect, useState } from "react";
import { getAllActivePatients } from "../../Managers/EncounterManager";

export const ActivePatientTable = () => {
    const [activePatients, setActivePatients] = useState([]);

    const getActivePatients = () => {
        getAllActivePatients().then((activePatients) => setActivePatients(activePatients));
    }

    useEffect(() => {
        getActivePatients();
    }, []);

    const patientAge = (dateOfBirth) => {
        const DOB = new Date(dateOfBirth)
        const ageCalc = Date.now() - DOB.getTime()
        const age = new Date(ageCalc)
        return Math.abs(age.getUTCFullYear() - 1970)
    }

return (
<div>
    <table>
        <thead>
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Gender</th>
            </tr>
        </thead>
        <tbody>
            {activePatients.map((activePatient) => (
                <tr key={activePatient.Id}>
                    <td>{activePatient.patient.lastName}</td>
                    <td>{activePatient.patient.firstName}</td>
                    <td>{new Date(activePatient.patient.dateOfBirth).toLocaleDateString('en-US')}</td>
                    <td>{patientAge(activePatient.patient.dateOfBirth)}</td>
                    <td>{activePatient.patient.gender}</td>
                </tr>
            ))}
        </tbody>
    </table>


</div>
)

}