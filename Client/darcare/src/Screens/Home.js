import React from "react";

export const HomeScreen = () => {

  //Access localstorage for userProfile
  const userString = localStorage.getItem("userProfile");
  const user = JSON.parse(userString);

  return (
    <div class="container-fluid col text-center" id="main-home">
        
        <div class="row" id="top-row-home">
            <div class="col-4">
                <h3>Welcome, {user.firstName}</h3>
            </div>
            <div class="col-8">
                <h3>Active Patients - {user.departmentName}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-4" id="staff-menu">
            
            </div>
            <div class="col-8" id="active-patient-chart">
                <table class="table scrollable">
                    <thead>
                        <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Gender</th>
                        <th>Location</th>
                        <th>Reason for Visit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Porplenko</td>
                        <td>Mariia</td>
                        <td>Female</td>
                        <td>1112</td>
                        <td>Not Appendix</td>
                        </tr>
                        <tr>
                        <td>Daugherty</td>
                        <td>Darrin</td>
                        <td>Male</td>
                        <td>ERWR</td>
                        <td>Maybe Appendix</td>
                        </tr>
                        <tr>
                        <td>Colin</td>
                        <td>Matteson</td>
                        <td>Male</td>
                        <td>1105</td>
                        <td>Definitely Appendix</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs toe amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs nose amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs hand amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs toe amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs fingers amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs toe amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs toe amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs eye amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs toe amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs lips amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs head amputated</td>
                        </tr>
                        <tr>
                        <td>Brad</td>
                        <td>Pitt</td>
                        <td>Male</td>
                        <td>1107</td>
                        <td>Needs toe amputated</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

  );
};
