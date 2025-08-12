import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import {EmployeeService} from "../../services/employeesService";

const Employee = () => {
  const [emp, setEmp] = useState([]);
    useEffect(() => {
            const fetchEmp = async () => {
                try {
                    const empData = await EmployeeService();
                    setEmp(empData);
                } catch (error) {
                    console.log({message : error.message})
                }
             }
        fetchEmp();
    },[])
    return(
        <div className="main-wrapper">
 
        <Sidebar />
        <div className="page-wrapper">
            <div className="content">
                <div className="row">
                    <div className="col-sm-4 col-3">
                        <h4 className="page-title">Employee</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                        <Link to="/add-employee" className="btn btn-primary float-right btn-rounded"><i className="fa fa-plus"></i> Add Employee</Link>
                    </div>
                </div>
                <div className="row filter-row">
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus">
                            <label className="focus-label">Employee ID</label>
                            <input type="text" className="form-control floating" />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus">
                            <label className="focus-label">Employee Name</label>
                            <input type="text" className="form-control floating" />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus select-focus">
                            <label className="focus-label">Role</label>
                            <select className="select floating">
                                <option>Select Role</option>
                                <option>Nurse</option>
                                <option>Pharmacist</option>
                                <option>Laboratorist</option>
                                <option>Accountant</option>
                                <option>Receptionist</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <a href="#" className="btn btn-success btn-block"> Search </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
						<div className="table-responsive">
                            <table className="table table-striped custom-table">
                                <thead>
                                    <tr>
                                        <th style={{minWidth : "200px"}}>Name</th>
                                        <th>Employee ID</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th style={{minWidth: "110px"}}>Join Date</th>
                                        <th>Role</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {emp.map((data) => (
                                              <tr>
                                              <td>
                                                  <img width="28" height="28" src="assets/img/user.jpg" className="rounded-circle" alt="" /> <h2>{data?.username}</h2>
                                              </td>
                                              <td>NS-0001</td>
                                              <td>{data?.email}</td>
                                              <td>{data?.phone}</td>
                                              <td>7 May 2015</td>
                                              <td>
                                              <span className={`custom-badge ${data.role === 'Nurse' ? 'status-blue' : '' 
                                                || data.role === 'Doctor' ? 'status-green' : '' 
                                                || data.role === "Admin" ? 'status-grey' : '' 
                                                || data.role === "Record" ? 'status-orange' : '' 
                                                || data.role === "Accountants" ? 'status-pink' : '' 
                                                || data.role === "Laboratorist" ? 'status-red' : '' 
                                                || data.role === "Pharmacist" ? 'status-purple' : ''} `}>
  {data.role}
</span>
                                              </td>
                                              <td className="text-right">
                                                  <div className="dropdown dropdown-action">
                                                      <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                                      <div className="dropdown-menu dropdown-menu-right">
                                                          <a className="dropdown-item" href="edit-employee.html"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                                      </div>
                                                  </div>
                                              </td>
                                          </tr>
                                     ))}
                       
                                </tbody>
                            </table>
						</div>
                    </div>
                </div>
            </div>

        </div>
		<div id="delete_employee" className="modal fade delete-modal" role="dialog">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-body text-center">
						<img src="assets/img/sent.png" alt="" width="50" height="46" />
						<h3>Are you sure want to delete this Employee?</h3>
						<div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
							<button type="submit" className="btn btn-danger">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
        </div>
    )
}

export default Employee;

