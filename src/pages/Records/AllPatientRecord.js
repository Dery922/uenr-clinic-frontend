import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import patientService from "../../services/patientService";

import $ from "jquery";

import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons/js/buttons.print.js";

import "datatables.net-buttons-dt/css/buttons.dataTables.css";

import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const AllPatientRecord = () => {
  const [allPatient, setAllPatient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await patientService();
        setAllPatient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allPatient.length > 0 && !loading) {
      // Destroy existing DataTable if it exists
      if ($.fn.DataTable.isDataTable("#patientTable")) {
        $("#patientTable").DataTable().destroy();
      }

      // Initialize DataTable with enhanced options
      $("#patientTable").DataTable({
        dom: '<"top"<"left-col"B><"center-col"l><"right-col"f>>rtip',
        buttons: [
          {
            extend: 'collection',
            text: 'Export',
            buttons: [
              { extend: 'copy', className: 'btn-light' },
              { extend: 'excel', className: 'btn-light' },
              { extend: 'csv', className: 'btn-light' },
              { 
                extend: 'pdf',
                className: 'btn-light',
                customize: function (doc) {
                  doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                }
              },
              { extend: 'print', className: 'btn-light' }
            ]
          }
        ],
        responsive: true,
        pageLength: 25,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search patients...",
          lengthMenu: "Show _MENU_ patients per page",
          zeroRecords: "No matching patients found",
          info: "Showing _START_ to _END_ of _TOTAL_ patients",
          infoEmpty: "No patients available",
          infoFiltered: "(filtered from _MAX_ total patients)"
        },
        columnDefs: [
          { responsivePriority: 1, targets: 0 }, // Name column
          { responsivePriority: 2, targets: -1 }, // Actions column
          { orderable: false, targets: -1 } // Disable sorting for actions column
        ],
        initComplete: function() {
          $('.dataTables_filter input').addClass('form-control');
          $('.dataTables_length select').addClass('form-control');
        }
      });

      return () => {
        if ($.fn.DataTable.isDataTable("#patientTable")) {
          $("#patientTable").DataTable().destroy();
        }
      };
    }
  }, [allPatient, loading]);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <Sidebar />
        <div className="content">
          {/* Page Header with Stats */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-4">
                <h3 className="page-title">Patient Records</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">All Patients</li>
                </ul>
              </div>
              <div className="col-sm-8 text-right">
                <div className="col-sm-8 col-9 text-right m-b-20">

                <div className="d-flex justify-content-end">
                  {/* <div className="mr-3">
                    <div className="stats-info">
                      <h6>Total Patients</h6>
                      <h4>{allPatient.length}</h4>
                    </div>
                  </div> */}
                  <Link
                    to="/add-patient-record"
                    className="btn btn btn-primary btn-rounded float-right"
                  >
                    <i className="fa fa-plus"></i> Add New Patient
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <p className="mt-2">Loading patient records...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">
                      <i className="fa fa-exclamation-circle"></i> {error}
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table 
                        id="patientTable" 
                        className="table table-hover table-center mb-0"
                        style={{ width: "100%" }}
                      >
                        <thead className="thead-light">
                          <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Type</th>
                            <th>Last Visit</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allPatient.map((patient) => (
                            <tr key={patient.patient_id}>
                              <td>#{patient.patient_id}</td>
                              <td>
                                <h2 className="table-avatar">
                                  <Link 
                                    to={`/patient-profile/${patient.patient_id}`}
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={patient.profile_pic || "/assets/img/patients/patient1.jpg"}
                                      alt="User"
                                    />
                                  </Link>
                                  <Link to={`/patient-profile/${patient.patient_id}`}>
                                    {patient.first_name} {patient.last_name}
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                <a href={`tel:${patient.phone}`}>
                                  {patient.phone}
                                </a>
                                <br />
                                <small className="text-muted">
                                  {patient.email || 'No email'}
                                </small>
                              </td>
                              <td>{patient.gender}</td>
                              <td>{patient.age}</td>
                              <td>
                                <span className={`badge badge-pill ${
                                  patient.patient_type === 'student' 
                                    ? 'badge-secondary' 
                                    : 'badge-primary'
                                }`}>
                                  {patient.patient_type}
                                </span>
                              </td>
                              <td>
                                {patient.last_visit || 'N/A'}
                              </td>
                              <td className="text-center">
                                <div className="actions">
                                  <Link
                                    to={`/edit-patient/${patient.patient_id}`}
                                    className="btn btn-sm bg-success-light mr-1"
                                  >
                                    <i className="fe fe-pencil"></i> Edit
                                  </Link>
                                  <button
                                    className="btn btn-sm bg-danger-light"
                                    data-toggle="modal"
                                    data-target="#delete_patient"
                                  >
                                    <i className="fe fe-trash"></i> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="delete_patient" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <i className="fa fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <h4>Are you sure you want to delete this patient record?</h4>
                <p className="mb-0">This action cannot be undone.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AllPatientRecord;
