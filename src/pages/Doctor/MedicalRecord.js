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
  const [selectedRecord, setSelectedRecord] = useState(null);
  const authToken = useSelector((state) => state.user.token);

  const handleRequestError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setError("Session expired. Please login again.");
          break;
        case 404:
          setError("No medical records found for this patient");
          break;
        default:
          setError("Failed to fetch medical records");
      }
    } else if (error.request) {
      setError("Network error. Please check your connection.");
    } else {
      setError("An unexpected error occurred");
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setError("Please enter a patient ID");
      return;
    }

    if (!authToken) {
      setError("Authentication required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cleanPatientId = searchId.replace(/^:/, "").trim();

      const response = await axios.get(
        `http://localhost:8080/api/patients/${cleanPatientId}/medical-records`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setPatientRecords(response.data || []);
      console.log(response.data, "response data here");
    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };


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
                  <div className="tab-pane fade" id="history" role="tabpanel">
                    {/* Medical History */}

                    <div class="container">
                      <div class="tab-header">
                        <h2>
                          <i class="fa fa-history me-2"></i>Medical History
                        </h2>
                      </div>
                      <div class="tab-content-container">
                        {patientRecords.history &&
                        patientRecords.history.length > 0 ? (
                          <ul class="history-list">
                            {patientRecords.history.map((dt) => (
                              <li class="history-item">
                                <div class="history-date">
                                  <i class="fa fa-calendar-alt"></i>

                                  {new Date(dt.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric", // e.g. 2025
                                      month: "long", // e.g. September
                                      day: "numeric", // e.g. 5
                                      hour: "2-digit", // e.g. 02
                                      minute: "2-digit", // e.g. 23
                                      hour12: true, // 12-hour clock (true) or 24-hour (false)
                                    }
                                  )}
                                </div>

                                <div class="diagnosis-info">
                                  <div class="diagnosis-title">
                                    <i class="fa fa-stethoscope"></i>
                                    Working Diagnosis
                                  </div>
                                  <div class="diagnosis-content">
                                    {dt.working_diagnosis}
                                  </div>
                                </div>

                                <div class="diagnosis-info">
                                  <div class="diagnosis-title">
                                    <i class="fa fa-list-alt"></i>
                                    Differential Diagnosis
                                  </div>
                                  <div class="diagnosis-content">
                                    {dt.differential_diagnosis}
                                  </div>
                                </div>

                                <div class="recorded-by">
                                  <i class="fa fa-user-md"></i>
                                  {dt.recorded_by}
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No history available for this patient.</p>
                        )}
                      </div>
                    </div>
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
                    ) : !patientRecords.soapNotes ||
                      patientRecords.soapNotes.length === 0 ? (
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
                          // Accordion View
                          <div className="accordion" id="soapAccordion">
                            {patientRecords.soapNotes.map((record, index) => (
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
                                      {new Date(
                                        record.date
                                      ).toLocaleDateString()}{" "}
                                      - {record.doctor}
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
                                      {/* Left Column */}
                                      <div className="col-md-6">
                                        <h6>Subjective</h6>
                                        <p>{record.subjective}</p>

                                        <h6>Assessment</h6>
                                        <p>{record.assessment}</p>
                                      </div>

                                      {/* Right Column */}
                                      <div className="col-md-6">
                                        <h6>Objective</h6>
                                        <ul className="list-unstyled">
                                          <li>
                                            <strong>Physical Exam:</strong>{" "}
                                            {record.objective
                                              ?.physical_examination || "N/A"}
                                          </li>
                                          <li>
                                            <strong>Cardiovascular:</strong>{" "}
                                            {record.objective?.cardiovascular ||
                                              "N/A"}
                                          </li>
                                          <li>
                                            <strong>HEENT:</strong>{" "}
                                            {record.objective?.heent || "N/A"}
                                          </li>
                                          <li>
                                            <strong>Respiratory:</strong>{" "}
                                            {record.objective?.respiratory ||
                                              "N/A"}
                                          </li>
                                        </ul>

                                        <h6>Plan</h6>
                                        {record.plan?.medications?.length >
                                        0 ? (
                                          <ul>
                                            {record.plan.medications.map(
                                              (med, i) => (
                                                <li key={i}>
                                                  {med.name} - {med.dosage}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        ) : (
                                          <p>No plan recorded</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Table View
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead className="thead-light">
                                <tr>
                                  <th>Date</th>
                                  <th>Doctor</th>
                                  <th>Chief complaint</th>
                                  <th>Diagnosis</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {patientRecords.soapNotes.map(
                                  (record, index) => (
                                    <tr key={index}>
                                      <td>
                                        {new Date(
                                          record.date
                                        ).toLocaleDateString()}
                                      </td>
                                      <td>{record.doctor}</td>
                                      <td>
                                        {record.subjective?.length > 50
                                          ? `${record.subjective.substring(
                                              0,
                                              50
                                            )}...`
                                          : record.subjective || "NO Data"}
                                      </td>
                                      <td>
                                        {record.assessment?.length > 50
                                          ? `${record.assessment.substring(
                                              0,
                                              50
                                            )}...`
                                          : record.assessment}
                                      </td>
                                      <td>
                                        <button className="btn btn-sm btn-outline-primary">
                                          View
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Lab Results */}
              {/* Lab Results */}
<div className="tab-pane fade" id="lab" role="tabpanel">
  <div className="mb-3">
    <h5>Blood Test Records</h5>
    <ul className="list-group">
      {patientRecords?.bloodhistory?.length > 0 ? (
        patientRecords.bloodhistory.map((test) => (
          <li className="list-group-item" key={test.id}>
            <strong>{new Date(test.date).toLocaleDateString()}:</strong>{" "}
            Hemoglobin: {test.hemoglobin ?? "N/A"}, WBC Count:{" "}
            {test.wbc_count ?? "N/A"}{" "}
            <span className="ml-2">
              {test.wbc_flag ? (
                <span className="badge badge-danger">Abnormal</span>
              ) : (
                <span className="badge badge-success">Normal</span>
              )}
            </span>
            <div className="small text-muted">
              Notes: {test.hemoglobin_notes || "No notes"}
            </div>
          </li>
        ))
      ) : (
        <li className="list-group-item">No Blood Test report for patient</li>
      )}
    </ul>
  </div>

  <div>
    <h5>Urine Test Records</h5>
    <ul className="list-group">
      {patientRecords?.urinetest?.length > 0 ? (
        patientRecords.urinetest.map((test) => (
          <li className="list-group-item" key={test.id}>
            <strong>{new Date(test.date).toLocaleDateString()}:</strong>{" "}
            Appearance: {test.appearance ?? "N/A"}, Color:{" "}
            {test.color ?? "N/A"}{" "}
            <span className="ml-2">
              {test.wbc_flag ? (
                <span className="badge badge-danger">Abnormal</span>
              ) : (
                <span className="badge badge-success">Normal</span>
              )}
            </span>
            <div className="small text-muted">
              Notes: {test.hemoglobin_notes || "No notes"}
            </div>
          </li>
        ))
      ) : (
        <li className="list-group-item">No Urine Test report for patient</li>
      )}
    </ul>
  </div>
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
                          {patientRecords?.prescriptions?.length > 0 ? (
                            patientRecords.prescriptions.map((dts) => 
                            <tr>
                              <td> {new Date(dts.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric", // e.g. 2025
                                      month: "long", // e.g. September
                                      day: "numeric", // e.g. 5
                                      hour: "2-digit", // e.g. 02
                                      minute: "2-digit", // e.g. 23
                                      hour12: true, // 12-hour clock (true) or 24-hour (false)
                                    }
                                  )}</td>
                              <td>{dts.medications.map((med) => med.name)}</td>
                              <td>{dts.medications.map((med) => med.dose)}</td>
                              <td>{dts.medications.map((med) => med.frequency)}</td>
                              <td>{dts.medications.map((med) => med.status)}</td>
                            </tr>
                          )
                          ) : (
                            <p>No prescription available for this patient</p>
                          )}

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
