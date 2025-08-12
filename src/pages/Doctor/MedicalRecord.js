import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";

const MedicalRecord = () => {
  const [searchId, setSearchId] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);;
  const authToken = useSelector(state => state.user.token);
  console.log(authToken)

  const handleRequestError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setError('Session expired. Please login again.');
          break;
        case 404:
          setError('No medical records found for this patient');
          break;
        default:
          setError('Failed to fetch medical records');
      }
    } else if (error.request) {
      setError('Network error. Please check your connection.');
    } else {
      setError('An unexpected error occurred');
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setError('Please enter a patient ID');
      return;
    }

    if (!authToken) {
      setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cleanPatientId = searchId.replace(/^:/, '').trim();
      
      const response = await axios.get(
        `http://localhost:8080/api/patients/${cleanPatientId}/medical-records`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      setPatientRecords(response.data || []);
      
    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };


  // const handleSearch = async () => {
  //   if (!searchId.trim()) {
  //     setError("Please enter a valid patient ID");
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/patients/${searchId}/medical-records`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`, //not storing token in localStorage
  //         },
  //         timeout: 10000, // 10 second timeout
  //       }
  //     );

  //     if (response.data && response.data.length > 0) {
  //       setPatientRecords(response.data);
  //       console.log(response);
  //     } else {
  //       setError("No medical records found for this patient");
  //       setPatientRecords([]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching records:", err);
  //     setError(
  //       err.response?.data?.error ||
  //         err.message ||
  //         "Failed to fetch medical records"
  //     );
  //     setPatientRecords([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    // Export handler function
    // const handleExport = async () => {
    //   if (!searchId.trim()) {
    //     setError("Please search for a patient first");
    //     return;
    //   }
  
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:8080/api/patients/${searchId}/medical-records/export`,
    //       { 
    //         responseType: 'blob',
    //         headers: {
    //           'Authorization': `Bearer ${authToken}`
    //         }
    //       }
    //     );
        
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `medical-records-${searchId}.pdf`);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //   } catch (err) {
    //     setError("Failed to export records: " + (err.message || "Unknown error"));
    //   }
    // };
  
    // View full record handler
    // const viewFullRecord = (record) => {
    //   setSelectedRecord(record);
    //   setShowDetails(true);
    // };

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Patient Medical Records</h5>
              </div>
              <div className="card-body">
                {/* Tabs for record sections */}
                <div className="form-group">
                  <label>Search by Patient ID</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter patient ID..."
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <ul
                  className="nav nav-tabs mb-3"
                  id="recordTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="history-tab"
                      data-toggle="tab"
                      href="#history"
                      role="tab"
                    >
                      Medical History
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="soap-tab"
                      data-toggle="tab"
                      href="#soap"
                      role="tab"
                    >
                      SOAP Notes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="lab-tab"
                      data-toggle="tab"
                      href="#lab"
                      role="tab"
                    >
                      Lab Results
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="prescription-tab"
                      data-toggle="tab"
                      href="#prescription"
                      role="tab"
                    >
                      Prescriptions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="imaging-tab"
                      data-toggle="tab"
                      href="#imaging"
                      role="tab"
                    >
                      Imaging
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="recordTabsContent">
                  {/* Medical History */}
                  <div
                    className="tab-pane fade show active"
                    id="history"
                    role="tabpanel"
                  >
                    <h6>Chronic Conditions</h6>
                    <ul>
                      <li>Diabetes (diagnosed 2021)</li>
                      <li>Hypertension</li>
                    </ul>
                    <h6>Allergies</h6>
                    <p>Penicillin, Dust</p>
                    <h6>Family History</h6>
                    <p>Mother - Heart Disease, Father - Type 2 Diabetes</p>
                  </div>

                  {/* SOAP Notes */}
                  <div className="tab-pane fade" id="soap" role="tabpanel">
                    {loading ? (
                      <div className="text-center py-4">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                        <p>Loading medical records...</p>
                      </div>
                    ) : error ? (
                      <div className="alert alert-danger">{error}</div>
                    ) : patientRecords.length === 0 ? (
                      <div className="alert alert-info">No records found</div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <button
                            className="btn btn-sm btn-outline-primary mr-2"
                            onClick={() => setShowDetails(!showDetails)}
                          >
                            {showDetails
                              ? "Hide Details"
                              : "Show Detailed View"}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            // onClick={handleExport}
                          >
                            Export to PDF
                          </button>
                        </div>

                        {showDetails ? (
                          <div className="accordion" id="soapAccordion">
                            {patientRecords.map((record, index) => (
                              <div
                                className="card"
                                key={`${record.date}-${index}`}
                              >
                                <div
                                  className="card-header"
                                  id={`heading-${index}`}
                                >
                                  <h5 className="mb-0">
                                    <button
                                      className="btn btn-link"
                                      type="button"
                                      data-toggle="collapse"
                                      data-target={`#collapse-${index}`}
                                    >
                                      {record.date} - {record.doctor}
                                    </button>
                                  </h5>
                                </div>
                                <div
                                  id={`collapse-${index}`}
                                  className="collapse"
                                  data-parent="#soapAccordion"
                                >
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <h6>Subjective</h6>
                                        <p>{record.subjective}</p>

                                        <h6>Assessment</h6>
                                        <p>{record.assessment}</p>
                                      </div>
                                      <div className="col-md-6">
                                        <h6>Objective</h6>
                                        <ul className="list-unstyled">
                                          <li>
                                            <strong>Physical Exam:</strong>{" "}
                                            {
                                              record.objective
                                                .physical_examination
                                            }
                                          </li>
                                          <li>
                                            <strong>Cardiovascular:</strong>{" "}
                                            {record.objective.cardiovascular}
                                          </li>
                                          <li>
                                            <strong>HEENT:</strong>{" "}
                                            {record.objective.heent}
                                          </li>
                                          <li>
                                            <strong>Respiratory:</strong>{" "}
                                            {record.objective.respiratory}
                                          </li>
                                        </ul>

                                        <h6>Plan</h6>
                                        <ul>
                                          {record.plan.medications.map(
                                            (med, i) => (
                                              <li key={i}>
                                                {med.name} - {med.dosage}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead className="thead-light">
                                <tr>
                                  <th>Date</th>
                                  <th>Doctor</th>
                                  <th>Chief Complaint</th>
                                  <th>Diagnosis</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {patientRecords.map((record, index) => (
                                  <tr key={index}>
                                    <td>
                                      {new Date(
                                        record.date
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>{record.doctor}</td>
                                    <td>
                                      {record.subjective.length > 50
                                        ? `${record.subjective.substring(
                                            0,
                                            50
                                          )}...`
                                        : record.subjective}
                                    </td>
                                    <td>
                                      {record.assessment.length > 50
                                        ? `${record.assessment.substring(
                                            0,
                                            50
                                          )}...`
                                        : record.assessment}
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-sm btn-outline-primary"
                                        // onClick={() => viewFullRecord(record)}
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Lab Results */}
                  <div className="tab-pane fade" id="lab" role="tabpanel">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>2025-07-10:</strong> CBC - Normal
                      </li>
                      <li className="list-group-item">
                        <strong>2025-06-15:</strong> Fasting Glucose - 120 mg/dL
                      </li>
                    </ul>
                  </div>

                  {/* Prescriptions */}
                  <div
                    className="tab-pane fade"
                    id="prescription"
                    role="tabpanel"
                  >
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Medication</th>
                            <th>Dosage</th>
                            <th>Frequency</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2025-07-20</td>
                            <td>Amoxicillin</td>
                            <td>500mg</td>
                            <td>3 times a day</td>
                            <td>
                              <span className="badge badge-warning">
                                Active
                              </span>
                            </td>
                          </tr>
                          {/* More rows */}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Imaging */}
                  <div className="tab-pane fade" id="imaging" role="tabpanel">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>2025-07-01:</strong> Chest X-Ray - No
                        abnormality detected
                      </li>
                      <li className="list-group-item">
                        <strong>2025-05-10:</strong> CT Scan - Normal
                      </li>
                    </ul>
                  </div>
                </div>{" "}
                {/* End of tab content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
