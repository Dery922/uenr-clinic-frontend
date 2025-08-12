
import { useEffect, useState } from "react";
import patientService from "../../services/patientService";
import patientOPDService from "../../services/opdService";
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
import Sidebar from "../../components/Sidebar";
const OPDPatientsVitals = () => {

        const [allPatient, setAllPatient] = useState([]);
    
        useEffect(() => {
            const fetchData = async () => {
                const data = await patientOPDService();
                console.log(data)
                setAllPatient(data);
            }
    
            fetchData()
        },[])
    


  useEffect(() => {
    // Initialize DataTable after component mounts
    $("#patientsTable").DataTable({
      responsive: true,
      pageLength: 10,
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"],
      ],
      order: [[0, "asc"]], // Default sort by first column
    });

    // Cleanup function to destroy DataTable when component unmounts
    return () => {
      const table = $("#patientsTable").DataTable();
      if (table) {
        table.destroy();
      }
    };
  }, []);

  return (
    <div className="main-wrapper">
        <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                  <h6 className="m-0 font-weight-bold text-primary">
                    OPD Patients Vitals
                  </h6>
                  <div>
                    <button className="btn btn-sm btn-primary mr-2">
                      <i className="fas fa-plus"></i> Add New
                    </button>
                    <button className="btn btn-sm btn-success">
                      <i className="fas fa-file-excel"></i> Export
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="patientsTable"
                      className="table table-bordered table-hover"
                      width="100%"
                      cellSpacing="0"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th>Patient Number.</th>
                          <th>Patient Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Temp (°F)</th>
                          <th>BP</th>
                          <th>Pulse</th>
                          <th>SpO2</th>
                          <th>Weight (kg)</th>
                          <th>Height (cm)</th>
                          <th>BMI</th>
                          <th>Visit Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allPatient.map((patient) => (
                          <tr key={patient.id}>
                            <td>{patient.patient_id}</td>
                            <td>{patient.patient_name}</td>
                            <td>32</td>
                            <td>female</td>
                            <td>{patient.temperature}</td>
                            <td>bp</td>
                            <td>{patient.pulse}</td>
                            <td>{patient.respiratory_rate}%</td>
                            <td>{patient.weight}</td>
                            <td>{patient.height}</td>
                            <td>{patient.blood_pressure}</td>
                            <td>{patient.registration_date}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-info mr-1"
                                title="View"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-warning mr-1"
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                title="Delete"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>OPD No.</th>
                          <th>Patient Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Temp (°F)</th>
                          <th>BP</th>
                          <th>Pulse</th>
                          <th>SpO2</th>
                          <th>Weight (kg)</th>
                          <th>Height (cm)</th>
                          <th>BMI</th>
                          <th>Visit Date</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OPDPatientsVitals;
