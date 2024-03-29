import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllActivePatients } from "../../Managers/EncounterManager";
import { patientAge } from "../Functions";

export const ActivePatientTable = () => {
    const [activePatients, setActivePatients] = useState([]);

    //Access localstorage for userProfile
    const userString = localStorage.getItem("userProfile");
    const user = JSON.parse(userString);

    

    const getActivePatients = () => {
        getAllActivePatients().then((activePatients) => setActivePatients(activePatients));
    }

    useEffect(() => {
        if (user.departmentId === 0) {
            getActivePatients();
        } else {
            getAllActivePatients().then((allActivePatients) => {
                const filteredActivePatients = allActivePatients.filter(patient => patient.departmentId === user.departmentId);
                setActivePatients(filteredActivePatients);
            });
        }
    }, [user.departmentId]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Date of Birth</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {activePatients.map((activePatient) => (
                        <tr key={activePatient.Id}>
                            <td>{activePatient.location.room}</td>
                            <td>{activePatient.patient.lastName}</td>
                            <td>{activePatient.patient.firstName}</td>
                            <td>{new Date(activePatient.patient.dateOfBirth).toLocaleDateString('en-US')}</td>
                            <td>{patientAge(activePatient.patient.dateOfBirth)}</td>
                            <td>{activePatient.patient.gender}</td>
                            <button class="btn btn-lg btn-info">
                                <Link to={`/encounter/${activePatient.id}`} className="text-white">Chart</Link>
                            </button>
                            <button class="btn btn-lg btn-success">
                                <Link to={`/patient/record/${activePatient.patientId}`} className="text-white">File</Link>
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
