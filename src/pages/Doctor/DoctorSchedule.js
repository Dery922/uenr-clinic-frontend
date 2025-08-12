import React, { useEffect, useState } from "react";
import axios from "axios";
import { pendingAppointment } from "../../services/GeneralService";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
const DoctorSchedule = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patients who have completed vitals but not seen doctor
  useEffect(() => {
    const fetchReadyPatients = async () => {
      const response = await pendingAppointment();
      setPatients(response);
      console.log(response)
    };
    fetchReadyPatients();
  }, []);
  return (
    <div className="main-wrapper">
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
                      <th>Doctor Name</th>
                      <th>Appointment Type</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Reason</th>
                      <th>Appointment Status</th>

                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      patients.map((datas) => (
                        <tr>
                          <td>
                            <img
                              width="28"
                              height="28"
                              src="assets/img/user.jpg"
                              class="rounded-circle m-r-5"
                              alt=""
                            />{" "}
                            {datas.patient_name}
                          </td>

                          <td>{datas.doctor_name}</td>
                          <td>{datas.appointment_type}</td>
                          <td>{datas.appointment_date}</td>
                          <td>{datas.appointment_time}</td>
                          <td>{datas.reason}</td>
                          <td>{datas.appointment_status}</td>

                          <td class="text-right">
                            <div class="dropdown dropdown-action">
                              <a
                                href="#"
                                class="action-icon dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i class="fa fa-ellipsis-v"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-right">
                                <Link
                                  to={`/edit-patient-record/${datas._id}`}
                                  class="dropdown-item"
                                >
                                  <i class="fa fa-pencil m-r-5"></i> Edit
                                </Link>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#delete_patient"
                                >
                                  <i class="fa fa-trash-o m-r-5"></i> Delete
                                </a>
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
    </div>
  );
};

export default DoctorSchedule;
