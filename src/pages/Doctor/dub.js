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

  const handleSubmitSubjective = async (values, { setSubmitting }) => {
    try {
      await axios.post(
        "http://localhost:8080/api/doctor-subjective",
        values
      );
      toast.success("Subjective saved successfully");
      setSubmitting(false);
    } catch (error) {
      toast.error("Error saving result");
      console.error(error.message);
      setSubmitting(false);
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

                <div className="card-body">
                  {/* Tab headers */}
                  <ul className="nav nav-tabs" id="consultationTabs">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "subjective" ? "active" : ""}`}
                        onClick={() => setActiveTab("subjective")}
                        type="button"
                      >
                        Subjective
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "objective" ? "active" : ""}`}
                        onClick={() => setActiveTab("objective")}
                        type="button"
                      >
                        Objective
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "assessment" ? "active" : ""}`}
                        onClick={() => setActiveTab("assessment")}
                        type="button"
                      >
                        Assessment
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "plan" ? "active" : ""}`}
                        onClick={() => setActiveTab("plan")}
                        type="button"
                      >
                        Plan
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content p-3 border border-top-0 rounded-bottom">
                    {/* Subjective Tab */}
                    <div className={`tab-pane fade ${activeTab === "subjective" ? "show active" : ""}`}>
                      <div className="col-sm-6 col-md-3" style={{ padding: 10 }}>
                        <div className="form-group form-focus">
                          <label className="focus-label">Search by folder number</label>
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
                            patient_name: `${selectedPatientSubjective.first_name} ${selectedPatientSubjective.last_name}`,
                            patient_id: selectedPatientSubjective.patient_id,
                            registration_date: "",
                            complaint: "",
                            illness: "",
                            review: "",
                            username: authUser.username,
                          }}
                          enableReinitialize
                          onSubmit={handleSubmitSubjective}
                        >
                          {({ isSubmitting }) => (
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
                                <Field
                                  as="textarea"
                                  className="form-control"
                                  name="illness"
                                  rows="4"
                                  placeholder="Onset, Location, Duration, Character, Aggravating/Alleviating, Radiation, Timing, Severity"
                                />
                              </div>

                              <div className="form-group">
                                <label>Review of Systems</label>
                                <Field
                                  as="textarea"
                                  className="form-control"
                                  rows="4"
                                  name="review"
                                  placeholder="Constitutional, HEENT, Respiratory, Cardiovascular, etc."
                                />
                              </div>
                              
                              <div className="card-footer">
                                <button 
                                  type="submit" 
                                  className="btn btn-primary mr-2"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Saving...' : 'Save Consultation'}
                                </button>
                                <button type="button" className="btn btn-secondary">
                                  Cancel
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>

                    {/* Objective Tab */}
                    <div className={`tab-pane fade ${activeTab === "objective" ? "show active" : ""}`}>
                      <h5>Objective</h5>
                      {/* Add your objective form content here */}
                    </div>

                    {/* Assessment Tab */}
                    <div className={`tab-pane fade ${activeTab === "assessment" ? "show active" : ""}`}>
                      <h5>Assessment</h5>
                      {/* Add your assessment form content here */}
                    </div>

                    {/* Plan Tab */}
                    <div className={`tab-pane fade ${activeTab === "plan" ? "show active" : ""}`}>
                      <h5>Plan</h5>
                      {/* Add your plan form content here */}
                    </div>
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

export default AddPatientDoctorRecord;
