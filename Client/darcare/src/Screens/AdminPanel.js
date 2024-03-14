import React from "react";
import { Link } from "react-router-dom";


export const AdminPanel = () => {


return(<div class="col-fluid text-center">
        <h2>Admin Panel</h2>
        <h5>Please select a data category to manage.</h5>
        <div class="row">
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title">Staff</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link to={`/staff`} className="btn btn-success">Manage</Link>
                </div>
            </div>
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title">Procedures</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Manage</a>
                </div>
            </div>
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title">Locations</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Manage</a>
                </div>
            </div>
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title">Departments</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Manage</a>
                </div>
            </div>
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title">Encounter Statuses</h5>
                    <p class="card-text">Manage statuses for admissions, active encounters and discharges.</p>
                    <a href="#" class="btn btn-primary">Manage</a>
                </div>
            </div>
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title">Treatments</h5>
                    <p class="card-text">With supporleting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Manage</a>
                </div>
            </div>
        </div>

    
    </div>
)
}

