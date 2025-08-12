import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Field, Formik, Form } from "formik";
import DatePickerField from "../../components/DatePickerField";
import { toast } from "react-toastify";
const AddPatientDoctorRecord = () => {
  const [activeTab, setActiveTab] = useState("subjective");

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const authUser = useSelector((state) => state.user.user);

  const [subjectiveQuery, setSubjectiveQuery] = useState("");
  const [subjectiveResults, setSubjectiveResults] = useState([]);
  const [selectedPatientSubjective, setSelectedPatientSubjective] =
    useState(null);

  // const [urineQuery, setUrineQuery] = useState("");
  // const [urineResults, setUrineResults] = useState([]);
  // const [selectedUrinePatient, setSelectedUrinePatient] = useState(null);

  // const [quickQuery, setQuickQuery] = useState("");
  // const [quickResults, setQuickResults] = useState([]);
  // const [selectedQuickPatient, setSelectedQuickPatient] = useState(null);

  const handleSearch = async (query, setResults) => {
    if (query.trim()) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/patients/search?q=${query}`
        );
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const delay = setTimeout(
      () => handleSearch(subjectiveQuery, setSubjectiveResults),
      500
    );
    return () => clearTimeout(delay);
  }, [subjectiveQuery]);

  // useEffect(() => {
  //   const delay = setTimeout(
  //     () => handleSearch(urineQuery, setUrineResults),
  //     500
  //   );
  //   return () => clearTimeout(delay);
  // }, [urineQuery]);

  // useEffect(() => {
  //   const delay = setTimeout(
  //     () => handleSearch(quickQuery, setQuickResults),
  //     500
  //   );
  //   return () => clearTimeout(delay);
  // }, [quickQuery]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        axios
          .get(`http://localhost:8080/api/patients/search?q=${query}`)
          .then((res) => setResult(res.data))
          .catch((err) => console.error(err));
      } else {
        setResult([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmitSubjective = async (values, ) => {
    try {
      
      const record = await axios.post(
        "http://localhost:8080/api/doctor-subjective",
        values
      );
      toast.success("Subjective save successfully");
      setSubmitting(false)
    } catch (error) {
      toast.error("Error in saving  result");
      console.log(error.message);
      setSubmitting(false)
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "subjective":
        return (
          <div className="tab-section">
            <div class="col-sm-6 col-md-3" style={{ padding: 10 }}>
              <div class="form-group form-focus">
                <label class="focus-label">Search by folder number</label>
                <input
                  placeholder="Search by folder number"
                  type="text"
                  value={subjectiveQuery}
                  onChange={(e) => setSubjectiveQuery(e.target.value)}
                  className="form-control"
                />
                <ul className="list-group mt-2">
                  {subjectiveResults.map((patient) => (
                    <li
                      className="list-group-item list-group-item-action"
                      key={patient.patient_id}
                      onClick={() => setSelectedPatientSubjective(patient)}
                    >
                      {patient.first_name} {patient.last_name} (
                      {patient.patient_id})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {selectedPatientSubjective && (
              <Formik
                initialValues={{
                  patient_name:
                    selectedPatientSubjective.first_name +
                    " " +
                    selectedPatientSubjective.last_name,
                  patient_id: selectedPatientSubjective.patient_id,
                  registration_date: "",
                  complaint: "",
                  illness: "",
                  review: "",
                  username: authUser.username,
                }}
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmitSubjective(values);
                  setSubmitting(false);
                }}
              >
                <Form>
                  <h5>Subjective</h5>

                  <div className="row">
                    <div className="col-md-3 mb-2">
                      <label className="text-muted small">Select Date</label>
                      <div className="input-group">
                        <DatePickerField name="date" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Chief Complaint (CC)</label>
                    <Field
                      type="text"
                      name="complaint"
                      className="form-control"
                      placeholder="Patient's primary concern in their own words"
                    />
                  </div>

                  <div className="form-group">
                    <label>History of Present Illness (HPI)</label>
                    <textarea
                      as="textarea"
                      className="form-control"
                      name="illness"
                      rows="4"
                      placeholder="Onset, Location, Duration, Character, Aggravating/Alleviating, Radiation, Timing, Severity"
                    />
                  </div>

                  <div className="form-group">
                    <label>Review of Systems</label>
                    <textarea
                      as="textarea"
                      className="form-control"
                      rows="4"
                      name="review"
                      placeholder="Constitutional, HEENT, Respiratory, Cardiovascular, etc."
                    />
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary mr-2">
                      Save Consultation
                    </button>
                    <button type="button" className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
          </div>
        );

      case "objective":
        return (
          <div className="tab-section">
            <h5>Objective</h5>

            <div className="card mb-4">
              <div className="card-header bg-light">
                <h6>Vital Signs</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <p>
                      <strong>BP:</strong> --/-- mmHg
                    </p>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <strong>HR:</strong> -- bpm
                    </p>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <strong>RR:</strong> -- /min
                    </p>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <strong>Temp:</strong> -- °C
                    </p>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <strong>SpO₂:</strong> --%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h6>Physical Examination</h6>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>General Appearance</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Appearance, distress level, hygiene"
                  />
                </div>
                <div className="form-group">
                  <label>HEENT</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Head, Eyes, Ears, Nose, Throat"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Cardiovascular</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Heart sounds, murmurs, pulses"
                  />
                </div>
                <div className="form-group">
                  <label>Respiratory</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Breath sounds, wheezing"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "assessment":
        return (
          <div className="tab-section">
            <h5>Assessment</h5>
            <div className="form-group">
              <label>Differential Diagnosis</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">1.</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Possible diagnosis"
                />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                + Add Differential
              </button>
            </div>

            <div className="form-group">
              <label>Working Diagnosis</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        );

      case "plan":
        return (
          <div className="tab-section">
            <h5>Plan</h5>
            <div className="form-group">
              <label>Medications</label>
              <div className="row mb-2">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Medication name"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dose"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Frequency"
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                + Add Medication
              </button>
            </div>

            <div className="form-group">
              <label>Tests Ordered</label>
              <div className="row mb-2">
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Test name"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reason"
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                + Add Test
              </button>
            </div>

            <div className="form-group">
              <label>Patient Education</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Instructions given to patient"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container mt-4">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h4>Doctor's Consultation Form</h4>
                  <p className="mb-0">SOAP Note Documentation</p>
                </div>

                <form>
                  {/* Navigation Tabs */}
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === "subjective" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("subjective")}
                      >
                        Subjective
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === "objective" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("objective")}
                      >
                        Objective
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === "assessment" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("assessment")}
                      >
                        Assessment
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === "plan" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("plan")}
                      >
                        Plan
                      </button>
                    </li>
                  </ul>

                  <div className="card-body">{renderTabContent()}</div>

     
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientDoctorRecord;
