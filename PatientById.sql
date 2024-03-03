SELECT p.id, p.firstName, p.lastName, p.dateOfBirth, p.gender,
e.Id as encounterId, e.patientId, e.admitTime, e.dischargeTime, e.dischargeStatusId, e.admitStatusId, e.encounterStatusId, e.departmentID, e.locationId
FROM Patient p
LEFT JOIN Encounters e on p.id = e.patientId
WHERE p.id = 7