import React, { useEffect, useState } from 'react';
import { getAllProcedures } from '../../Managers/ProcedureManager';
import { addTreatment } from '../../Managers/TreatmentManager';
import { reloadPage } from '../Functions';

export const AddTreatmentForm = ({isOpen, onClose, encounterId, staffId}) => {
  const [procedures, setProcedures] = useState([])
  const [treatmentData, setTreatmentData] = useState({encounterId: encounterId || "", 
  procedureId: '', 
  staffId: staffId || '', 
  procedureTime: '', 
  notes: ''
  });

  const getProcedures = () => {
    getAllProcedures().then((fetchedProcedures) => setProcedures(fetchedProcedures));
}

useEffect(() => {
    getProcedures();
  }, []);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTreatmentData({
      ...treatmentData,
      [name]: name === "procedureId" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTreatment(treatmentData)
    console.log(treatmentData);
    onClose();
    reloadPage()
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input hidden type="text" id="encounterId" name="encounterId" value={treatmentData.encounterId} onChange={handleInputChange} />
      </div>
        <div>
            <label htmlFor="procedureId">Procedure ID:</label>
            <select id="procedureId" name="procedureId" value={treatmentData.procedureId} onChange={handleInputChange}>
            <option value="" disabled selected hidden>Choose a procedure</option>
            {procedures.map(procedure => (
                <option key={procedure.id} value={procedure.id}>{procedure.name}</option>
            ))}
            </select>
        </div>
      <div>
        <input hidden type="text" id="staffId" name="staffId" value={treatmentData.staffId} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="procedureTime">Procedure Time:</label>
        <input type="datetime-local" id="procedureTime" name="procedureTime" value={treatmentData.procedureTime} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes" value={treatmentData.notes} onChange={handleInputChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};