import React,{useState,useEffect} from 'react';
import Sidebar from '../../components/Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatientVitalsView = () => {
  const {patientId} = useParams()
  const handlePrint = () => {
    window.print();
  };


  const [patient, setPatient] = useState([]);

  

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/opd-session-view/${patientId}`);
        // setPatient(res.plans[0]);
        setPatient(res.data.plans[0])
         console.log(res)
        
      } catch (err) {
        console.error("Error fetching patient data", err);
      }
    };

    fetchPatient();
  }, [patientId]);

  useEffect(() => {
    if (patient) {
      console.log("Updated patient outside fetch:", patient);
    }
  }, [patient]);
  return (
    <div className="main-wrapper">
        <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">Patient Vitals Details</h4>
                </div>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                  <li className="breadcrumb-item"><a href="/patient-vitals">OPD Vitals</a></li>
                  <li className="breadcrumb-item active">Vitals Details</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}

          {/* Patient Info Card */}
          <div className="card">
            <div className="card-body">
              <div className="patient-info">
                <div className="row">
                  <div className="col-md-6">
                    <div className="media d-flex align-items-center">
                      <div className="mr-3">
                        <img src="/assets/img/patients/patient1.jpg" alt="Patient" className="rounded-circle" width="100" />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Name</h5>
                        <p className="mb-0">
                          {/* <span className="text-muted">Patient ID:</span> {patient.patient_id}<br /> */}
                          <span className="text-muted">Age:</span> 35 years<br />
                          <span className="text-muted">Gender:</span> Male<br />
                          <span className="text-muted">Blood Group:</span> O+<br />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="patient-meta">
                      <ul className="list-unstyled">
                        <li>
                          <span className="text-muted">Recorded By:</span> 
                          <strong>Nurse {patient?.username }</strong>
                        </li>
                        <li>
                          <span className="text-muted">Recorded On:</span> 
                          <strong>{patient?.registration_date || ""}</strong>
                        </li>
                        <li>
                          <span className="text-muted">Status:</span> 
                          <span className="badge badge-pill badge-success">Normal</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Patient Info Card */}

          {/* Vitals Details */}
          <div className="row">
            {/* Primary Vitals */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Primary Vitals</h5>
                </div>
                <div className="card-body">
                  <div className="vitals-details">
                    <div className="row">
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Blood Pressure</h6>
                          <p>120/80 <small>mmHg</small></p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Temperature</h6>
                          <p>{patient?.temperature || ""}<small>°F</small></p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Pulse Rate</h6>
                          <p>{patient?.pulse || ""}<small>bpm</small></p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Respiratory Rate</h6>
                          <p>{patient?.respiratory_rate || ""}<small>breaths/min</small></p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>SPO2</h6>
                          <p>98 <small>%</small></p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Pain Score</h6>
                          <p>1 <small>/10</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Vitals */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Anthropometric Measurements</h5>
                </div>
                <div className="card-body">
                  <div className="vitals-details">
                    <div className="row">
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Weight</h6>
                          <p>{patient?.weight || ""} <small>kg</small></p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Height</h6>
                          <p>{patient?.height || ""} <small>cm</small></p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>BMI</h6>
                          <p>22.9</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Waist Circumference</h6>
                          <p>85 <small>cm</small></p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>Head Circumference</h6>
                          <p>-</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="vital-item">
                          <h6>MUAC</h6>
                          <p>-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Vitals Details */}

          {/* Additional Notes */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Clinical Notes</h5>
            </div>
            <div className="card-body">
              <div className="notes-info">
                <p>Patient appears well with no acute distress. Vitals within normal limits. No complaints of pain or discomfort.</p>
                <div className="signature mt-4">
                  <p className="mb-1">Recorded by: <strong>Nurse {patient.username}</strong></p>
                  <img src="/assets/img/signature.png" alt="Signature" width="150" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          {/* /Additional Notes */}

          {/* Action Buttons */}
          <div className="row">
            <div className="col-md-12">
              <div className="form-group text-right">
                <button type="button" className="btn btn-primary mr-2">
                  <i className="fas fa-print"></i> Print Vitals
                </button>
                <button type="button" className="btn btn-secondary mr-2">
                  <i className="fas fa-file-pdf"></i> Export as PDF
                </button>
                <button type="button" className="btn btn-light">
                  <i className="fas fa-arrow-left"></i> Back to List
                </button>
              </div>
            </div>
          </div>
          {/* /Action Buttons */}
        </div>
      </div>
    </div>
  );
};

export default PatientVitalsView;