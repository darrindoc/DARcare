import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getTreatmentByEncounter } from "../Managers/TreatmentManager";
import { dischargePatient, getEncounterById } from "../Managers/EncounterManager";
import { formatDate, formatTime } from "../Components/Functions";
import { AddTreatmentForm } from "../Components/Treatments/AddTreatmentForm";
import { useNavigate } from "react-router-dom";

export const EncounterChart = () => {
  const [encounter, setEncounter] = useState([]);
  const [treatments, setTreatments] = useState([])
  const [treatmentPopUp, setTreatmentPopUp] = useState(false)
  const { id } = useParams();

  const getEncounter = () => {
    getEncounterById(id).then((thisEncounter) => setEncounter(thisEncounter));
  };

  const getTreatments = () => {
    getTreatmentByEncounter(id).then((theseTreatments) => setTreatments(theseTreatments));
  };

  const navigate = useNavigate()

  useEffect(() => {
    getEncounter();
  }, [id]);

  useEffect(() => {
    getTreatments();
  }, [id]);

  //these modify the pop up for addind a treatment
  const openPopup = () => {
    setTreatmentPopUp(true);
  };

  const closePopup = () => {
    setTreatmentPopUp(false);
  };

    //Access localstorage for userProfile
    const userString = localStorage.getItem("userProfile");
    const user = JSON.parse(userString);

    const handleDischarge = () => {
      dischargePatient(encounter)
      navigate('/')
    }

    

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col"></div>
            <div class="row">
                <div class="card-fluid text-center">
                <h3>Encounter {encounter.id}</h3>
                <div class="row">
                <div class="col-4 text-start">
                <ul class="list-group list-group-flush">
                    <h4 class="list-group-item">Patient Name: {encounter.patient?.lastName}, {encounter.patient?.firstName} </h4>
                    <h4 class="list-group-item">DOB: {formatDate(encounter.patient?.dateOfBirth)}</h4>
                    <h4 class="list-group-item">{encounter.patient?.gender}</h4>
                </ul>
                </div>
                <div class="col-4 text-center">
                    <ul class="list-group list-group-flush">
                        <h4 class="list-group-item">{encounter.location?.name} - {encounter.location?.room} </h4>
                        <h4 class="list-group-item">Admit Date: {formatDate(encounter.admitTime)}</h4>
                        <h4 class="list-group-item">Admit Time: {formatTime(encounter.admitTime)}</h4>
                    </ul>
                </div>
                <div class="col-4 text-end">
                    <ul class="list-group list-group-flush">
                        <h4 class="list-group-item"> {encounter.location?.room}</h4>
                        {encounter.dischargeTime == null ? (<>
                            <h4 class="list-group-item">Discharge Date: Active</h4>
                            <h4 class="list-group-item">Discharge Time: Active</h4>
                            </>
                          ) : (<>
                            <h4 class="list-group-item">Discharge Date: {formatDate(encounter.dischargeTime)}</h4>
                            <h4 class="list-group-item">Discharge Time: {formatTime(encounter.dischargeTime)}</h4>
                            </>
                          )}

                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>



        <div class="row">
          <h3 class="">Treatment History</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="col">Date</th>
                <th class="col">Time</th>
                <th scope="col">Code</th>
                <th scope="col">Description</th>
                <th scope="col">Staff</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
             {treatments.map((treatment) => (
                <tr key={treatment.id}>
                    <td>{formatDate(treatment.procedureTime)} </td>
                    <td>{formatTime(treatment.procedureTime)}</td>
                    <td>{treatment.procedure?.code}</td>
                    <td>{treatment.procedure?.name}</td>
                    <td>{treatment.staff?.firstName} {treatment.staff?.lastName}, {treatment.staff?.title}</td>
                    <td>{treatment.notes}</td>
                </tr>
             ))}
            </tbody>
          </table>
        </div>
        <div class="row text-center">
        </div>
      <button class="btn btn-lg btn-success">
        <Link to="/patient" className="text-white">
          Patient Database
        </Link>
      </button>
      <div>
      <button class="btn btn-lg btn-danger"onClick={openPopup}>Add Treatment</button>
      {treatmentPopUp && (
        <div className="popup">
          <div className="popup-content">
            <button class="btn btn-sm btn-info"className="close" onClick={closePopup}>Close</button>
            <AddTreatmentForm isOpen={treatmentPopUp} onClose={closePopup} encounterId={encounter.id} staffId={user.id}/>
          </div>
        </div>
      )}
      {encounter.dischargeTime == null ? (
            <button class="btn btn-lg btn-info" onClick={handleDischarge}>Discharge Patient</button>
          ) : (<></>)}
      </div>
    </div>
  );
};