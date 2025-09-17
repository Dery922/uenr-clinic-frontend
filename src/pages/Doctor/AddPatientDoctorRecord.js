import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Field, Formik, Form, FieldArray } from "formik";
import DatePickerField from "../../components/DatePickerField";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";
const AddPatientDoctorRecord = () => {
  const [medicationResults, setMedicationResults] = useState([]);
  const diagnosisOptions = [
    { value: "malaria", label: "Malaria" },
    { value: "typhoid", label: "Typhoid" },
    { value: "covid-19", label: "COVID-19" },
  ];
  const [activeTab, setActiveTab] = useState("subjective");

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const authUser = useSelector((state) => state.user.user);

  // Add these state variables at the top of your component

  const [medicationSearchTerm, setMedicationSearchTerm] = useState(""); // For medication search

  const [subjectiveQuery, setSubjectiveQuery] = useState("");
  const [subjectiveResults, setSubjectiveResults] = useState([]);
  const [selectedPatientSubjective, setSelectedPatientSubjective] =
    useState(null);
  console.log(subjectiveQuery);

  const [planQuery, setPlanQuery] = useState("");
  const [planResults, setPlanResults] = useState([]);
  const [selectedPatientPlan, setSelectedPatientPlan] = useState(null);
  console.log(selectedPatientPlan, "all plan data")

  {
    /* Inside your Plan Tab Component */
  }
  const [inventory, setInventory] = useState([]);

  const [medications, setMedications] = useState([
    { name: "", dose: "", frequency: "" },
  ]);
  const [tests, setTests] = useState([{ name: "", reason: "" }]);

  const handleAddMedication = () => {
    setMedications([...medications, { name: "", dose: "", frequency: "" }]);
  };

  const handleAddTest = () => {
    setTests([...tests, { name: "", reason: "" }]);
  };

  const handleDeleteMedication = (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
  };

  const handleDeleteTest = (index) => {
    const updated = tests.filter((_, i) => i !== index);
    setTests(updated);
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleTestChange = (index, field, value) => {
    const updated = [...tests];
    updated[index][field] = value;
    setTests(updated);
  };

  const [objectiveQuery, setObjectiveQuery] = useState("");
  const [objectiveResults, setObjectiveResults] = useState([]);
  const [selectedPatientObjective, setSelectedPatientObjective] =
    useState(null);

  const [assessmentQuery, setAssessmentQuery] = useState("");
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [selectedPatientAssessement, setSelectedPatientAssessment] =
    useState(null);

  const handleSearch = async (query, setResults) => {
    if (query.trim()) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/display/open-sessions?q=${query}`
        );
        setResults(res.data);
        console.log(res.data);
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
    const delay = setTimeout(
      () => handleSearch(objectiveQuery, setObjectiveResults),
      500
    );
    return () => clearTimeout(delay);
  }, [objectiveQuery]);

  useEffect(() => {
    const delay = setTimeout(
      () => handleSearch(assessmentQuery, setAssessmentResults),
      500
    );
    return () => clearTimeout(delay);
  }, [assessmentQuery]);

  useEffect(() => {
    const delay = setTimeout(
      () => handleSearch(planQuery, setPlanResults),
      500
    );
    return () => clearTimeout(delay);
  }, [planQuery]);

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
      await axios.post("http://localhost:8080/api/doctor-subjective", values);
      console.log(values);
      toast.success("Subjective saved successfully");
      setSubmitting(false);
    } catch (error) {
      toast.error("Error saving result");
      console.error(error.message);
      console.log({ error: error.message });
      setSubmitting(false);
    }
  };

  const handleSubmitObjective = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:8080/api/doctor-objective", values);
      toast.success("Objective saved successfully");
      setSubmitting(false);
    } catch (error) {
      toast.error("Error saving result");
      console.error(error.message);
      setSubmitting(false);
    }
  };

  const handleSubmitAssessment = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:8080/api/doctor-assessment", values);
      toast.success("Assessment saved successfully");
      setSubmitting(false);
    } catch (error) {
      toast.error("Error saving result");
      console.error(error.message);
      setSubmitting(false);
    }
  };
  const handleSubmitPlan = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("http://localhost:8080/api/doctor-plan", values);
      toast.success("Plan saved successfully");
      resetForm(); // Optional: Clear the form after submission
    } catch (error) {
      toast.error("Error saving plan");
      console.error("❌ Submission Error:", error);
      console.log({ error: error.message });
    } finally {
      setSubmitting(false); // Always stop submitting
    }
  };

  const patienSubjectivetValidationSchema = Yup.object().shape({
    registration_date: Yup.string().required(
      "Date of registration is required"
    ),
    complaint: Yup.string().required("complaint is required"),
    illness: Yup.string().required("illness is required"),
    review: Yup.string().required("review is required"),
  });

  const patienObjectiveValidationSchema = Yup.object().shape({
    registration_date: Yup.string().required(
      "Date of registration is required"
    ),
    appearance: Yup.string().required("Appearance is required"),
    cardiovascular: Yup.string().required("Cardiovascular is required"),
    heent: Yup.string().required("heent is required"),
    respiratory: Yup.string().required("Respiratory is required"),
  });

  const patienAssessmentValidationSchema = Yup.object().shape({
    registration_date: Yup.string().required(
      "Date of registration is required"
    ),
    differential_diagnosis: Yup.string().required(
      "Differential Diagnosis is required"
    ),
    working_diagnosis: Yup.string().required("Working Diagnosis is required"),
  });
  const planValidationSchema = Yup.object().shape({
    
  })

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/all-inventory");
        setInventory(res.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      }
    };
    fetchInventory();
  }, []);

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
                        className={`nav-link ${
                          activeTab === "subjective" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("subjective")}
                        type="button"
                      >
                        Subjective
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "objective" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("objective")}
                        type="button"
                      >
                        Objective
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "assessment" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("assessment")}
                        type="button"
                      >
                        Assessment
                      </button>
                    </li>
                    <li className="nav-item">
                      <button


                        className={`nav-link ${
                          activeTab === "plan" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("plan")}
                        type="button"
                      >
                        Plan
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content p-3 border border-top-0 rounded-bottom">
                    <div
                      className={`tab-pane fade ${
                        activeTab === "subjective" ? "show active" : ""
                      }`}
                    >
                      <div
                        className="col-sm-6 col-md-3"
                        style={{ padding: 10 }}
                      >
                        <div className="form-group form-focus">
                          <label className="focus-label">
                            Search by folder number
                          </label>
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
                                onClick={() =>
                                  setSelectedPatientSubjective(patient)
                                }
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
                            session_id: selectedPatientSubjective._id,
                            patient_id: selectedPatientSubjective.patient_id,
                            registration_date: "",
                            complaint: "",
                            illness: "",
                            review: "",
                            username: authUser.username,
                          }}
                          enableReinitialize
                          onSubmit={handleSubmitSubjective}
                          validationSchema={patienSubjectivetValidationSchema}
                        >
                          {({ isSubmitting, errors, touched }) => (
                            <Form>
                              <h5>Subjective</h5>

                              <div class="row mb-4">
                                <div class="col-md-6">
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text">
                                        <i class="fas fa-user"></i>
                                      </span>
                                    </div>
                                    <Field
                                      type="text"
                                      class="form-control"
                                      placeholder="Patient ID"
                                      readOnly
                                      name="patient_id"
                                    />
                                  </div>
                                </div>

                                <div class="col-md-6">
                         
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-3 mb-2">
                                  <label className="text-muted small">
                                    Select Date{" "}
                                  </label>
                                  <div className="form-group">
                                    <DatePickerField name="registration_date" />
                                    {touched.registration_date &&
                                      errors.registration_date && (
                                        <div className="text-danger">
                                          {" "}
                                          {errors.registration_date}
                                        </div>
                                      )}
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
                                {touched.complaint && errors.complaint && (
                                  <div className="text-danger">
                                    {" "}
                                    {errors.complaint}
                                  </div>
                                )}
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
                                {touched.illness && errors.illness && (
                                  <div className="text-danger">
                                    {" "}
                                    {errors.illness}
                                  </div>
                                )}
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
                                {touched.review && errors.review && (
                                  <div className="text-danger">
                                    {" "}
                                    {errors.review}
                                  </div>
                                )}
                              </div>

                              <div className="card-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary mr-2"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting
                                    ? "Saving..."
                                    : "Save Consultation"}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                >
                                  Cancel
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>

                    <div
                      className={`tab-pane fade ${
                        activeTab === "objective" ? "show active" : ""
                      }`}
                    >
                      <div
                        className="col-sm-6 col-md-3"
                        style={{ padding: 10 }}
                      >
                        <div className="form-group form-focus">
                          <label className="focus-label">
                            Search by folder number
                          </label>
                          <input
                            placeholder="Search by folder number"
                            type="text"
                            value={objectiveQuery}
                            onChange={(e) => setObjectiveQuery(e.target.value)}
                            className="form-control"
                          />
                          <ul className="list-group mt-2">
                            {objectiveResults.map((patient) => (
                              <li
                                className="list-group-item list-group-item-action"
                                key={patient.patient_id}
                                onClick={() =>
                                  setSelectedPatientObjective(patient)
                                }
                              >
                                {patient.first_name} {patient.last_name} (
                                {patient.patient_id})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
                        {selectedPatientObjective && (
                          <Formik
                            initialValues={{
                              session_id: selectedPatientObjective._id,
                              patient_name: `${selectedPatientObjective.first_name} ${selectedPatientObjective.last_name}`,
                              patient_id: selectedPatientObjective.patient_id,
                              registration_date: "",
                              physical_examination: "",
                              cardiovascular: "",
                              heent: "",
                              respiratory: "",
                              username: authUser.username,
                            }}
                            enableReinitialize
                            validationSchema={patienObjectiveValidationSchema}
                            FieldArray
                            onSubmit={handleSubmitObjective}
                          >
                            {({ touched, errors }) => (
                              <Form>
                                <div className="row">
                                  <div class="col-md-6">
                                    <label>Patient Name</label>
                                    <div class="form-group">
                                      <Field
                                        type="text"
                                        class="form-control"
                                        placeholder="Patient Name"
                                        name="patient_name"
                                        readOnly
                                      />
                                    </div>
                                    <label>Patient ID</label>
                                    <div class="form-group">
                                      <Field
                                        type="text"
                                        class="form-control"
                                        placeholder="Patient ID"
                                        readOnly
                                        name="patient_id"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <label className="text-muted small">
                                      Select Date{" "}
                                    </label>
                                    <div className="form-group">
                                      <DatePickerField name="registration_date" />
                                      {touched.registration_date &&
                                        errors.registration_date && (
                                          <div className="text-danger">
                                            {" "}
                                            {errors.registration_date}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>General Appearance</label>
                                      <Field
                                        as="textarea"
                                        className="form-control"
                                        name="physical_examination"
                                        rows="2"
                                        placeholder="Appearance, distress level, hygiene"
                                      />
                                      {touched.appearance &&
                                        errors.appearance && (
                                          <div className="text-danger">
                                            {" "}
                                            {errors.appearance}
                                          </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                      <label>HEENT</label>
                                      <Field
                                        as="textarea"
                                        name="heent"
                                        className="form-control"
                                        rows="2"
                                        placeholder="Head, Eyes, Ears, Nose, Throat"
                                      />
                                      {touched.heent && errors.heent && (
                                        <div className="text-danger">
                                          {" "}
                                          {errors.heent}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Cardiovascular</label>
                                      <Field
                                        as="textarea"
                                        name="cardiovascular"
                                        className="form-control"
                                        rows="2"
                                        placeholder="Heart sounds, murmurs, pulses"
                                      />
                                      {touched.cardiovascular &&
                                        errors.cardiovascular && (
                                          <div className="text-danger">
                                            {" "}
                                            {errors.cardiovascular}
                                          </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                      <label>Respiratory</label>
                                      <Field
                                        as="textarea"
                                        name="respiratory"
                                        className="form-control"
                                        rows="2"
                                        placeholder="Breath sounds, wheezing"
                                      />
                                      {touched.respiratory &&
                                        errors.respiratory && (
                                          <div className="text-danger">
                                            {" "}
                                            {errors.respiratory}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  className="btn btn-primary mr-2"
                                >
                                  Save Consultation
                                </button>
                              </Form>
                            )}
                          </Formik>
                        )}
                      </div>
                    </div>

                    <div
                      className={`tab-pane fade ${
                        activeTab === "assessment" ? "show active" : ""
                      }`}
                    >
                      <div className="tab-section">
                        <div
                          className="col-sm-6 col-md-3"
                          style={{ padding: 10 }}
                        >
                          <div className="form-group form-focus">
                            <label className="focus-label">
                              Search by folder number
                            </label>
                            <input
                              placeholder="Search by folder number"
                              type="text"
                              value={assessmentQuery}
                              onChange={(e) =>
                                setAssessmentQuery(e.target.value)
                              }
                              className="form-control"
                            />
                            <ul className="list-group mt-2">
                              {assessmentResults.map((patient) => (
                                <li
                                  className="list-group-item list-group-item-action"
                                  key={patient.patient_id}
                                  onClick={() =>
                                    setSelectedPatientAssessment(patient)
                                  }
                                >
                                  {patient.first_name} {patient.last_name} (
                                  {patient.patient_id})
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <h5>Assessment</h5>
                        {selectedPatientAssessement && (
                          <Formik
                            initialValues={{
                              session_id: selectedPatientAssessement._id,
                              patient_name: `${selectedPatientAssessement.first_name} ${selectedPatientAssessement.last_name}`,
                              patient_id: selectedPatientAssessement.patient_id,
                              registration_date: "",
                              differential_diagnosis: "",
                              working_diagnosis: "",
                              username: authUser.username,
                            }}
                            enableReinitialize
                            validationSchema={patienAssessmentValidationSchema}
                            onSubmit={handleSubmitAssessment}
                          >
                            {({ touched, errors, setFieldValue, values }) => (
                              <Form>
                                <div class="col-md-6">
                                  <label>Patient Name</label>
                                  <div class="form-group">
                                    <Field
                                      type="text"
                                      class="form-control"
                                      placeholder="Patient Name"
                                      name="patient_name"
                                      readOnly
                                    />
                                  </div>
                                  <label>Patient ID</label>
                                  <div class="form-group">
                                    <Field
                                      type="text"
                                      class="form-control"
                                      placeholder="Patient ID"
                                      readOnly
                                      name="patient_id"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <label className="text-muted small">
                                    Select Date{" "}
                                  </label>
                                  <div className="form-group">
                                    <DatePickerField name="registration_date" />
                                    {touched.registration_date &&
                                      errors.registration_date && (
                                        <div className="text-danger">
                                          {" "}
                                          {errors.registration_date}
                                        </div>
                                      )}
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label>Differential Diagnosis</label>
                                  <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        1.
                                      </span>
                                    </div>
                                    <div className="flex-grow-1">
                                      <CreatableSelect
                                        isClearable
                                        options={diagnosisOptions}
                                        placeholder="Possible diagnosis"
                                        onChange={(selectedOption) =>
                                          setFieldValue(
                                            "differential_diagnosis",
                                            selectedOption?.value || ""
                                          )
                                        }
                                      />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                    // onClick={handleAddDifferential} ← add logic if you want multiple inputs
                                  >
                                    + Add Differential
                                  </button>
                                </div>

                                <div className="form-group">
                                  <label>Working Diagnosis</label>
                                  <Field
                                    type="text"
                                    name="working_diagnosis"
                                    className="form-control"
                                    placeholder="working diagnosis"
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-primary mr-2"
                                >
                                  Save Consultation
                                </button>
                              </Form>
                            )}
                          </Formik>
                        )}
                      </div>
                    </div>

                    {/* Plan Tab */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "plan" ? "show active" : ""
                      }`}
                    >
                      <div className="tab-section">
                        <div className="row mb-4">
                          {/* Patient Search */}
                          <div
                            className="col-sm-6 col-md-3"
                            style={{ padding: 10 }}
                          >
                            <div className="form-group form-focus">
                              <label className="focus-label">
                                Search by folder number
                              </label>
                              <input
                                placeholder="Search by folder number"
                                type="text"
                                value={planQuery}
                                onChange={(e) => setPlanQuery(e.target.value)}
                                className="form-control"
                              />
                              <ul className="list-group mt-2">
                                {planResults.map((patient) => (
                                  <li
                                    className="list-group-item list-group-item-action"
                                    key={patient.patient_id}
                                    onClick={() =>
                                      setSelectedPatientPlan(patient)
                                    }
                                  >
                                    {patient.first_name} {patient.last_name} (
                                    {patient.patient_id})
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {selectedPatientPlan && (
                          <Formik
                            initialValues={{
                              session: selectedPatientPlan._id,
                              patient_name: `${selectedPatientPlan.first_name} ${selectedPatientPlan.last_name}`,
                              patient: selectedPatientPlan.patient_id,
                              registration_date: "",
                              patient_education: "",
                              username: authUser.username,
                              medications: [],
                              tests: [],
                            }}
                            enableReinitialize
                            onSubmit={handleSubmitPlan}
                          >
                            {({ touched, errors, values, setFieldValue }) => (
                              <Form>
                                {/* Read-only header info */}
                                <div className="row mb-4">
                                  <div className="col-md-6">
                                    <label>MRN</label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="patient"
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Patient Name</label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="patient_name"
                                      readOnly
                                    />
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label>Date</label>
                                  <DatePickerField name="registration_date" />
                                  {touched.registration_date &&
                                    errors.registration_date && (
                                      <div className="text-danger">
                                        {errors.registration_date}
                                      </div>
                                    )}
                                </div>

                                {/* Medication Search Section */}
                                <div className="card mb-4">
                                  <div className="card-header">
                                    <h6 className="mb-0">
                                      <i className="fas fa-search mr-2"></i>
                                      Search Medication from Inventory
                                    </h6>
                                  </div>
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-8">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search medication by name..."
                                          value={medicationSearchTerm}
                                          onChange={async (e) => {
                                            const searchTerm = e.target.value;
                                            setMedicationSearchTerm(searchTerm);

                                            if (searchTerm.length > 2) {
                                              try {
                                                const response =
                                                  await axios.get(
                                                    `http://localhost:8080/api/inventory/search?query=${searchTerm}`
                                                  );
                                                setMedicationResults(
                                                  response.data
                                                );
                                              } catch (error) {
                                                console.error(
                                                  "Search error:",
                                                  error
                                                );
                                                toast.error(
                                                  "Failed to search medications"
                                                );
                                              }
                                            } else {
                                              setMedicationResults([]);
                                            }
                                          }}
                                        />
                                      </div>
                                      <div className="col-md-4">
                                        <select
                                          className="form-control"
                                          onChange={async (e) => {
                                            const category = e.target.value;
                                            if (
                                              category &&
                                              medicationSearchTerm
                                            ) {
                                              try {
                                                const response =
                                                  await axios.get(
                                                    `http://localhost:8080/api/inventory/search?query=${medicationSearchTerm}&category=${category}`
                                                  );
                                                setMedicationResults(
                                                  response.data
                                                );
                                              } catch (error) {
                                                console.error(
                                                  "Category filter error:",
                                                  error
                                                );
                                              }
                                            }
                                          }}
                                        >
                                          <option value="">
                                            All Categories
                                          </option>
                                          <option value="medication">
                                            Medication
                                          </option>
                                          <option value="supplies">
                                            Supplies
                                          </option>
                                          <option value="equipment">
                                            Equipment
                                          </option>
                                        </select>
                                      </div>
                                    </div>

                                    {/* Search Results */}
                                    {medicationResults.length > 0 && (
                                      <div className="mt-3">
                                        <h6>Available Medications:</h6>
                                        <div className="list-group">
                                          {medicationResults.map((med) => (
                                            <button
                                              type="button"
                                              key={med._id}
                                              className="list-group-item list-group-item-action"
                                              onClick={() => {
                                                const currentMeds =
                                                  values.medications || [];
                                                setFieldValue("medications", [
                                                  ...currentMeds,
                                                  {
                                                    medication_name: med.name,
                                                    dose: med.unit,
                                                    frequency: "",
                                                    covered_by_insurance:
                                                      med.isCoveredByInsurance,
                                                    amount:
                                                      med.isCoveredByInsurance
                                                        ? 0
                                                        : med.price,
                                                    inventory_id: med._id,
                                                    quantity_available:
                                                      med.quantity,
                                                  },
                                                ]);
                                                setMedicationResults([]);
                                                setMedicationSearchTerm("");
                                              }}
                                            >
                                              <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                  <strong>{med.name}</strong> -{" "}
                                                  {med.unit}
                                                  <br />
                                                  <small className="text-muted">
                                                    Stock: {med.quantity} |
                                                    Price: ₵
                                                    {med.price?.toFixed(2)} |
                                                    Insurance:{" "}
                                                    {med.isCoveredByInsurance
                                                      ? "Covered"
                                                      : "Not Covered"}
                                                  </small>
                                                </div>
                                                <span className="badge badge-success">
                                                  Add
                                                </span>
                                              </div>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {medicationSearchTerm.length > 2 &&
                                      medicationResults.length === 0 && (
                                        <div className="mt-2 text-center text-muted">
                                          <small>
                                            No medications found for "
                                            {medicationSearchTerm}"
                                          </small>
                                        </div>
                                      )}
                                  </div>
                                </div>

                                {/* Medications */}
                                <div className="card mb-4">
                                  <div className="card-header">
                                    <h6 className="mb-0">
                                      <i className="fas fa-pills mr-2"></i>
                                      Prescribed Medications
                                    </h6>
                                  </div>
                                  <div className="card-body">
                                    <FieldArray name="medications">
                                      {({ push, remove, form }) => (
                                        <>
                                          {form.values.medications &&
                                            form.values.medications.map(
                                              (med, index) => (
                                                <div
                                                  className="row mb-3 border-bottom pb-3"
                                                  key={index}
                                                >
                                                  <div className="col-md-3">
                                                    <label>Medication</label>
                                                    <Field
                                                      name={`medications[${index}].medication_name`}
                                                      className="form-control"
                                                      placeholder="Medication"
                                                      readOnly={
                                                        med.inventory_id
                                                      }
                                                    />
                                                  </div>
                                                  <div className="col-md-2">
                                                    <label>Dose</label>
                                                    <Field
                                                      name={`medications[${index}].dose`}
                                                      className="form-control"
                                                      placeholder="Dose"
                                                    />
                                                  </div>
                                                  <div className="col-md-2">
                                                    <label>Frequency</label>
                                                    <Field
                                                      name={`medications[${index}].frequency`}
                                                      className="form-control"
                                                      placeholder="e.g., 2x daily"
                                                    />
                                                  </div>

                                                  <div className="col-md-2">
                                                    <label>Insurance</label>
                                                    <div className="form-check">
                                                      <Field
                                                        type="checkbox"
                                                        name={`medications[${index}].covered_by_insurance`}
                                                        className="form-check-input"
                                                        disabled={
                                                          med.inventory_id
                                                        }
                                                      />
                                                      <label className="form-check-label">
                                                        Covered
                                                      </label>
                                                    </div>
                                                  </div>

                                                  {(!form.values.medications[
                                                    index
                                                  ].covered_by_insurance ||
                                                    !form.values.medications[
                                                      index
                                                    ].inventory_id) && (
                                                    <div className="col-md-2">
                                                      <label>Amount (₵)</label>
                                                      <Field
                                                        type="number"
                                                        name={`medications[${index}].amount`}
                                                        className="form-control"
                                                        placeholder="0.00"
                                                        min="0"
                                                        step="0.01"
                                                        disabled={
                                                          form.values
                                                            .medications[index]
                                                            .covered_by_insurance &&
                                                          form.values
                                                            .medications[index]
                                                            .inventory_id
                                                        }
                                                      />
                                                    </div>
                                                  )}

                                                  <div className="col-md-1 d-flex align-items-end">
                                                    <button
                                                      type="button"
                                                      className="btn btn-danger btn-sm"
                                                      onClick={() =>
                                                        remove(index)
                                                      }
                                                    >
                                                      ×
                                                    </button>
                                                  </div>

                                                  {/* Stock Warning */}
                                                  {med.quantity_available !==
                                                    undefined &&
                                                    med.quantity_available <
                                                      10 && (
                                                      <div className="col-12 mt-2">
                                                        <div
                                                          className={`alert alert-${
                                                            med.quantity_available ===
                                                            0
                                                              ? "danger"
                                                              : "warning"
                                                          } alert-sm mb-0 py-2`}
                                                        >
                                                          <i className="fas fa-exclamation-triangle mr-2"></i>
                                                          {med.quantity_available ===
                                                          0
                                                            ? "Out of stock! Please choose alternative medication"
                                                            : `Low stock: Only ${med.quantity_available} remaining`}
                                                        </div>
                                                      </div>
                                                    )}
                                                </div>
                                              )
                                            )}

                                          <button
                                            type="button"
                                            onClick={() =>
                                              push({
                                                medication_name: "",
                                                dose: "",
                                                frequency: "",
                                                covered_by_insurance: false,
                                                amount: 0,
                                              })
                                            }
                                            className="btn btn-sm btn-outline-secondary mt-2"
                                          >
                                            <i className="fas fa-plus mr-1"></i>{" "}
                                            Add Custom Medication
                                          </button>
                                        </>
                                      )}
                                    </FieldArray>
                                  </div>
                                </div>

                                {/* Tests Ordered */}
                                <div className="card mb-4">
                                  <div className="card-header">
                                    <h6 className="mb-0">
                                      <i className="fas fa-flask mr-2"></i>
                                      Tests Ordered
                                    </h6>
                                  </div>
                                  <div className="card-body">
                                    <FieldArray name="tests">
                                      {({ push, remove, form }) => (
                                        <>
                                          {form.values.tests &&
                                            form.values.tests.map(
                                              (test, index) => (
                                                <div
                                                  className="row mb-2"
                                                  key={index}
                                                >
                                                  <div className="col-md-5">
                                                    <Field
                                                      name={`tests[${index}].test_name`}
                                                      className="form-control"
                                                      placeholder="Test name"
                                                    />
                                                  </div>
                                                  <div className="col-md-4">
                                                    <Field
                                                      name={`tests[${index}].reason`}
                                                      className="form-control"
                                                      placeholder="Reason for test"
                                                    />
                                                  </div>
                                                  <div className="col-md-3">
                                                    <button
                                                      type="button"
                                                      className="btn btn-danger btn-sm"
                                                      onClick={() =>
                                                        remove(index)
                                                      }
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          <button
                                            type="button"
                                            onClick={() =>
                                              push({
                                                test_name: "",
                                                reason: "",
                                              })
                                            }
                                            className="btn btn-sm btn-outline-secondary"
                                          >
                                            <i className="fas fa-plus mr-1"></i>{" "}
                                            Add Test
                                          </button>
                                        </>
                                      )}
                                    </FieldArray>
                                  </div>
                                </div>

                                {/* Patient Education */}
                                <div className="form-group">
                                  <label>
                                    Patient Education & Instructions
                                  </label>
                                  <Field
                                    className="form-control"
                                    as="textarea"
                                    rows="4"
                                    name="patient_education"
                                    placeholder="Enter instructions, follow-up details, and patient education information..."
                                  />
                                </div>

                                {/* patient admission */}
                                <div className="form-group">
                                  <label>
                                    Patient Admission
                                  </label>
                                   <Field as="select" name="admit">
                                     <option value="normal">Normal</option>
                                     <option value="admit">Admit Patient</option>
                                   </Field>
                                </div>

                                <div className="d-flex gap-2">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    <i className="fa fa-save mr-1"></i> Save
                                    Consultation
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                  >
                                    <i className="fa fa-times mr-1"></i> Cancel
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        )}

                        {!selectedPatientPlan && (
                          <div className="text-center py-5">
                            <i className="fa fa-user-injured fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">
                              Select a patient to create treatment plan
                            </h5>
                            <p className="text-muted">
                              Search for a patient using their folder number
                              above
                            </p>
                          </div>
                        )}
                      </div>
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
