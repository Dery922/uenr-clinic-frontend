import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import patientService from "../../services/patientService";
import patientOPDService from "../../services/opdService";

const AllPatientRecordOPD = () => {

    const [allPatient, setAllPatient] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await patientOPDService();
            console.log(data)
            setAllPatient(data);
        }

        fetchData()
    },[])

    return(
        <div class="main-wrapper">


        <div class="page-wrapper">
            <Sidebar />
            <div class="content">
                <div class="row">
                    <div class="col-sm-4 col-3">
                        <h4 class="page-title">Patients</h4>
                        </div>

                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-border table-striped custom-table datatable mb-0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Registration Date</th>
                                        <th>Temperature</th>
                                        <th>Pulse</th>
                                        <th>Respiratory Rate</th>
                                        <th>Blood Pressure</th>
                                        <th>Height</th>
                                        <th>Weight</th>
                                        <th class="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPatient && allPatient.map((datas) => (

                                    <tr>
                                        <td><img width="28" height="28" src="assets/img/user.jpg" class="rounded-circle m-r-5" alt="" /> {datas.first_name + " "+ datas.last_name}</td>
                                       
                                        <td>{datas.registration_date}</td>
                                        <td>{datas.temperature}</td>
                                        <td>{datas.pulse}</td>
                                        <td>{datas.respiratory_rate}</td>
                                        <td>{datas.blood_pressure}</td>
                                        <td>{datas.height}</td>
                                        <td>{datas.weight}</td>
                                      
                                        <td class="text-right">
                                            <div class="dropdown dropdown-action">
                                                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa fa-ellipsis-v"></i></a>
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <Link to={`/edit-patient-record/${datas._id}`} class="dropdown-item" ><i class="fa fa-pencil m-r-5"></i> Edit</Link>
                                                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient">
                                                        <i class="fa fa-trash-o m-r-5"></i> Delete</a>
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
        <div id="delete_patient" class="modal fade delete-modal" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <img src="assets/img/sent.png" alt="" width="50" height="46" />
                        <h3>Are you sure want to delete this Patient?</h3>
                        <div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    )
}


export default AllPatientRecordOPD;