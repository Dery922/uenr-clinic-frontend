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
  const diagnosisOptions = [
    { value: "malaria", label: "Malaria" },
    { value: "typhoid", label: "Typhoid" },
    { value: "covid-19", label: "COVID-19" },
  ];
  const [activeTab, setActiveTab] = useState("subjective");

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const authUser = useSelector((state) => state.user.user);

  const [subjectiveQuery, setSubjectiveQuery] = useState("");
  const [subjectiveResults, setSubjectiveResults] = useState([]);
  const [selectedPatientSubjective, setSelectedPatientSubjective] =
    useState(null);

  const [planQuery, setPlanQuery] = useState("");
  const [planResults, setPlanResults] = useState([]);
  const [selectedPatientPlan, setSelectedPatientPlan] = useState(null);

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

      // Then update OPD status to 1 (consultation complete)
      await axios.patch(
        `http://localhost:8080/api/opd/complete/${values.patient_id}`
      );
      console.log(values.patient_id);
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
      console.log(values);
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
                            patient_name: `${selectedPatientSubjective.first_name} ${selectedPatientSubjective.last_name}`,
                            patient_id: selectedPatientSubjective.patient_id,
                            registration_date: "",
                            complaint: "",
                            illness: "",
                            review: "",
                            username: authUser.username,
                          }}
                          validationSchema={patienSubjectivetValidationSchema}
                          enableReinitialize
                          onSubmit={handleSubmitSubjective}
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
                                      readonly
                                      name="patient_id"
                                    />
                                  </div>
                                </div>

                                <div class="col-md-6">
                                  <div class="input-group">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text">
                                        <i class="fas fa-id-card"></i>
                                      </span>
                                    </div>
                                    <Field
                                      type="text"
                                      class="form-control"
                                      placeholder="Patient Name"
                                      name="patient_name"
                                      readonly
                                    />
                                  </div>
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
                              patient_name: `${selectedPatientAssessement.first_name} ${selectedPatientAssessement.last_name}`,
                              patient_id: selectedPatientAssessement.patient_id,
                              registration_date: "",
                              differential_diagnosis: "",
                              working_diagnosis: "",
                              username: authUser.username,
                            }}
                            enableReinitialize
                            onSubmit={handleSubmitAssessment}
                          >
                            {({ touched, errors,setFieldValue,values }) => (
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
                        <h5>Plan</h5>

                        {selectedPatientPlan && (
                          <Formik
                            initialValues={{
                              patient_name: `${selectedPatientPlan.first_name} ${selectedPatientPlan.last_name}`,
                              patient_id: selectedPatientPlan.patient_id,
                              registration_date: "",
                              patient_education: "",
                              username: authUser.username,
                              medications: [],
                              tests: [],
                            }}
                            enableReinitialize
                            onSubmit={handleSubmitPlan}
                          >
                            {({ touched, errors }) => (
                              <Form>
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
                                    <div class="input-group">
                                      <div class="input-group-prepend">
                                        <span class="input-group-text">
                                          <i class="fas fa-id-card"></i>
                                        </span>
                                      </div>
                                      <Field
                                        type="text"
                                        class="form-control"
                                        placeholder="Patient Name"
                                        name="patient_name"
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="focus-label">
                                    <label>Date</label>
                                  </div>
                                  <DatePickerField name="registration_date" />
                                  {touched.registration_date &&
                                    errors.registration_date && (
                                      <div className="text-danger">
                                        {errors.registration_date}
                                      </div>
                                    )}
                                </div>
                                {/* Medications */}
                                <FieldArray name="medications">
                                  {({ push, remove, form }) => (
                                    <>
                                      {form.values.medications.map(
                                        (med, index) => (
                                          <div className="row mb-2" key={index}>
                                            <div className="col-md-3">
                                              <Field
                                                name={`medications[${index}].medication_name`}
                                                className="form-control"
                                                placeholder="Medication name"
                                              />
                                            </div>
                                            <div className="col-md-3">
                                              <Field
                                                name={`medications[${index}].dose`}
                                                className="form-control"
                                                placeholder="Dose"
                                              />
                                            </div>
                                            <div className="col-md-3">
                                              <Field
                                                name={`medications[${index}].frequency`}
                                                className="form-control"
                                                placeholder="Frequency"
                                              />
                                            </div>
                                            <div className="col-md-3">
                                            <button
                                              type="button"
                                              className="btn btn-danger btn-sm"
                                              onClick={() => remove(index)}
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
                                            medication_name: "",
                                            dose: "",
                                            frequency: "",
                                          })
                                        }
                                        className="btn btn-sm btn-outline-secondary"
                                      >
                                        + Add Medication
                                      </button>
                                    </>
                                  )}
                                </FieldArray>

                                {/* Tests Ordered */}
                                <FieldArray name="tests">
                                  {({ push, remove, form }) => (
                                    <>
                                      {form.values.tests.map((test, index) => (
                                        <div className="row mb-2" key={index}>
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
                                              placeholder="Reason"
                                            />
                                          </div>
                                          <div className="col-md-3">
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => remove(index)}
                                          >
                                            ×
                                          </button>
                                          </div>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          push({ test_name: "", reason: "" })
                                        }
                                        className="btn btn-sm btn-outline-secondary"
                                      >
                                        + Add Test
                                      </button>
                                    </>
                                  )}
                                </FieldArray>

                                {/* Patient Education */}
                                <Field
                                  className="form-control"
                                  as="textarea"
                                  rows="3"
                                  name="patient_education" // ← Add this!
                                  placeholder="Instructions given to patient"
                                />
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
