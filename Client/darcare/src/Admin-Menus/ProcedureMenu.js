import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProcedures } from "../Managers/ProcedureManager";

export const ProcedureList = () => {
  const [procedures, setProcedures] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");


  const getProcedureList = () => {
    getAllProcedures().then((allProcedures) => setProcedures(allProcedures));
  };

  useEffect(() => {
    getProcedureList();
  }, []);

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchCodeChange = (event) => {
    setSearchCode(event.target.value);
  };

  const filteredProcedures = procedures.filter((searchedProcedure) => {
    const nameMatch = searchedProcedure.name.toLowerCase().includes(searchName.toLowerCase());
    const codeMatch = searchedProcedure.code.toLowerCase().includes(searchCode.toLowerCase());

    return nameMatch && codeMatch
  });

  const handleDeleteButton = (id) => {
   // deleteProcedure(id);
    window.location.reload();
  }

  return (
    <div class="col-fluid text-center">
      <h2>Procedure List</h2>
      <div class="row sticky-top border text-start" id="pt-database-search">
        <h4>Search <Link to={`/procedure/add`} className="btn btn-danger">Add Procedure</Link></h4>
        <div class="mb-3 col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by procedure name"
            value={searchName}
            onChange={handleSearchNameChange}
          />
        </div>
        <div class="mb-3 col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by code"
            value={searchCode}
            onChange={handleSearchCodeChange}
          />
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {filteredProcedures.map((procedure) => (
            <tr key={procedure.id}>
              <td>{procedure.name}</td>
              <td>{procedure.code}</td>
              <td>
                <Link to={`/procedure/edit/${procedure.id}`} className="btn btn-success">Manage</Link>
                <button onClick={() => handleDeleteButton(procedure.id)} className="btn btn-danger mx-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
