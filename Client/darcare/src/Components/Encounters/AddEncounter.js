import React, { useEffect, useState } from 'react';
import { reloadPage } from '../Functions';
import { getAllLocations } from '../../Managers/LocationManager';
import { addEncounter } from '../../Managers/EncounterManager';
import { getAllDepartments } from '../../Managers/DepartmentManager';
import { PatientSearchForm } from '../Patient/PatientSearchForm';
import { useNavigate } from 'react-router-dom';

export const AddEncounterForm = ({patientId}) => {
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] =useState([])
  const [matchedPatient, setMatchedPatient] = useState(null);
  const [encounterData, setEncounterData] = useState({
    patientId: patientId,
    admitTime: "",
    departmentId: "", 
    locationId: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (matchedPatient) {
        const newEncounter = {...encounterData}
            newEncounter.patientId = matchedPatient.id
            setEncounterData(newEncounter)
    }
  }, [matchedPatient]);


  const getLocations = () => {
    getAllLocations().then((fetchedLocations) => setLocations(fetchedLocations));
  }

  const getDepartments = () => {
    getAllDepartments().then((fetchedDepartments) => setDepartments(fetchedDepartments));
  }

  useEffect(() => {
    getLocations();
  }, []);
  
  useEffect(() => {
    getDepartments();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEncounterData({
      ...encounterData,
      [name]: name === "departmentId" || name === "locationId" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEncounter(encounterData);
    console.log(encounterData);
    navigate('/')
  };
  

  return (<div>
    <PatientSearchForm matchedPatient={matchedPatient} setMatchedPatient={setMatchedPatient}/>
    <div class="col text-center">
    <form onSubmit={handleSubmit}>
        <div class="row">
        <input hidden type="text" id="encounterId" name="encounterId" value={encounterData.encounterId} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="admitTime">Admit Time:</label>
        <input type="datetime-local" id="admitTime" name="admitTime" value={encounterData.admitTime} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="departmentId">Department ID:</label>
        <select id="departmentId" name="departmentId" value={encounterData.departmentId} onChange={handleInputChange}>
          <option value="" disabled>Select a department</option>
          {departments.map(department => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="locationId">Location ID:</label>
        <select id="locationId" name="locationId" value={encounterData.locationId} onChange={handleInputChange}>
          <option value="" disabled>Select a location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};
