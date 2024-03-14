import React, { useEffect, useState } from "react";
import { getAllStaff } from "../Managers/StaffManager";
import { Link } from "react-router-dom";

export const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [searchLastName, setSearchLastName] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");


  const getStaffList = () => {
    getAllStaff().then((allStaff) => setStaff(allStaff));
  };

  useEffect(() => {
    getStaffList();
  }, []);

  const handleSearchLastNameChange = (event) => {
    setSearchLastName(event.target.value);
  };

  const handleSearchFirstNameChange = (event) => {
    setSearchFirstName(event.target.value);
  };

  const filteredStaff = staff.filter((staffMember) => {
    const lastNameMatch = staffMember.lastName.toLowerCase().includes(searchLastName.toLowerCase());
    const firstNameMatch = staffMember.firstName.toLowerCase().includes(searchFirstName.toLowerCase());

    return lastNameMatch && firstNameMatch
  });

  return (
    <div class="col-fluid text-center">
      <h2>Staff List</h2>
      <div class="row sticky-top border text-start" id="pt-database-search">
        <h4>Search <button class="btn btn-sm btn-danger">Add Staff</button></h4>
        <div class="mb-3 col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by last name"
            value={searchLastName}
            onChange={handleSearchLastNameChange}
          />
        </div>
        <div class="mb-3 col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by first name"
            value={searchFirstName}
            onChange={handleSearchFirstNameChange}
          />
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Credentials</th>
            <th>Title</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((staffMember) => (
            <tr key={staffMember.id}>
              <td>{staffMember.userName}</td>
              <td>{staffMember.lastName}</td>
              <td>{staffMember.firstName}</td>
              <td>{staffMember.credentials}</td>
              <td>{staffMember.title}</td>
              <td><Link to={`/patient/record/${staffMember.id}`} className="btn btn-success">Manage</Link><button class="btn btn-danger mx-2">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
