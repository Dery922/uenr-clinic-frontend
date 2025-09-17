import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import DatePickerField from "../../components/DatePickerField";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Opdward = () => {
  const [OPDQuery, setOPDQuery] = useState("");
  const [OPDresult, setOPDResult] = useState([]);
  const [selectedopdQuery, setSelectedOPDQuery] = useState(null);
   
  console.log(selectedopdQuery)

  const autUser = useSelector((state) => state.user.user);

  const handleSearch = async (query, setResults) => {
    if (query.trim()) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/display/open-sessions?q=${query}`
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
    const delay = setTimeout(() => handleSearch(OPDQuery, setOPDResult), 500);
    return () => clearTimeout(delay);
  }, [OPDQuery]);

  const vitalsVailidation = Yup.object({
    registration_date: Yup.date().required("Date is required"),
    temperature: Yup.number().required("temperature is required"),
    pulse: Yup.number().required("Pulse is required"),
    respiratory_rate: Yup.number().required("Respiratory Rate is required"),
    blood_pressure: Yup.string().required("Blodd pressure is required"),
    height: Yup.number().required("Height is required"),
    weight: Yup.number().required("Weight is required"),
  });

  const handleSubmitVitals = async (values) => {
    try {
      const record = await axios.post(
        "http://localhost:8080/create-patient-opdward-record",
        values
      );
      toast.success("Patient vitals enter successfully");
    } catch (error) {
      toast.error("Error in entrying data try again later");
      console.log(error.message);
    }
  };
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3"></div>
          </div>

          <div className="row">
            <div className="container mt-3">
              <div className="row filter-row">
                <div className="col-sm-8 col-md-3">
                  <div className="form-group position-relative">
                    <label className="focus-label">Search by Patient ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by folder number or phone number"
                      value={OPDQuery}
                      onChange={(e) => setOPDQuery(e.target.value)}
                    />

                    {/* Autocomplete Suggestions */}
                    {OPDQuery && (
                      <ul className="list-group position-absolute w-100 zindex-dropdown">
                        {OPDresult.length > 0 ? (
                          OPDresult.map((patient) => (
                            <li
                              key={patient.patient_id}
                              className="list-group-item list-group-item-action"
                              onClick={() => {
                                setSelectedOPDQuery(patient);
                                setOPDQuery(""); // Clear the search box
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {patient.first_name} {patient.last_name} (
                              {patient.patient_id})
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item text-muted">
                            No results found
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <a href="#" class="btn btn-success btn-block">
                    {" "}
                    Search{" "}
                  </a>
                </div>
              </div>
              <ul className="list-group mt-2">
                {OPDresult.map((patient) => (
                  <li
                    className="list-group-item list-group-item-action"
                    key={patient.patient_id}
                    onClick={() => setSelectedOPDQuery(patient)}
                  >
                    {patient.first_name} {patient.last_name} (
                    {patient.patient_id})
                  </li>
                ))}
              </ul>
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Nursing Vital Signs Assessment</h5>
                </div>

                {selectedopdQuery && (
                  <Formik
                    initialValues={{
                      session_id: selectedopdQuery._id,
                      patient_id: selectedopdQuery.patient_id,
                      patient_name:
                        selectedopdQuery.first_name +
                        " " +
                        selectedopdQuery.last_name,
                      registration_date: "",
                      temperature: "",
                      pulse: "",
                      respiratory_rate: "",
                      blood_pressure: "",
                      height: "",
                      weight: "",
                      username: autUser.username || "",
                      status: 0,
                    }}
                    validationSchema={vitalsVailidation}
                    enableReinitialize
                    onSubmit={(values, { setSubmitting }) => {
                      handleSubmitVitals(values);
                      setSubmitting(false);
                    }}
                  >
                    {({ errors, touched, values }) => (
                      <Form className="p-3">
                        <div className="row mb-4">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Patient Name</label>
                              <Field
                                type="text"
                                className="form-control bg-light"
                                name="patient_name"
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label>MRN</label>
                              <Field
                                type="text"
                                className="form-control bg-light"
                                name="patient_id"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        {/* Vital Signs - Core Metrics */}
                        <div className="vitals-grid">
                          <div className="row">
                            <div className="col-md-2 mb-3">
                              <div className="card h-100">
                                <div className="card-body text-center">
                                  <h6 className="card-title text-primary">
                                    Date
                                  </h6>
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
                            {/* Temperature */}
                            <div className="col-md-2 mb-3">
                              <div className="card h-100">
                                <div className="card-body text-center">
                                  <h6 className="card-title text-primary">
                                    Temperature
                                  </h6>
                                  <Field
                                    type="number"
                                    name="temperature"
                                    className="form-control text-center"
                                    placeholder="0"
                                    step="0.1"
                                  />
                                  {touched.temperature &&
                                    errors.temperature && (
                                      <div className="text-danger">
                                        {" "}
                                        {errors.temperature}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>

                            {/* Heart Rate */}
                            <div className="col-md-2 mb-3">
                              <div className="card h-100">
                                <div className="card-body text-center">
                                  <h6 className="card-title text-primary">
                                    Pulse
                                  </h6>
                                  <Field
                                    type="number"
                                    name="pulse"
                                    className="form-control text-center mb-2"
                                    placeholder="0"
                                  />
                                  {touched.pulse && errors.pulse && (
                                    <div className="text-danger">
                                      {" "}
                                      {errors.pulse}
                                    </div>
                                  )}
                                  <div className="btn-group btn-group-sm">
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                    >
                                      Regular
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                    >
                                      Irregular
                                    </button>
                                  </div>
                                  <small className="text-muted">
                                    Normal: 60-100 bpm
                                  </small>
                                </div>
                              </div>
                            </div>

                            {/* Respiratory Rate */}
                            <div className="col-md-2 mb-3">
                              <div className="card h-100">
                                <div className="card-body text-center">
                                  <h6 className="card-title text-primary">
                                    Respiratory Rate
                                  </h6>
                                  <Field
                                    type="number"
                                    name="respiratory_rate"
                                    className="form-control text-center"
                                    placeholder="0"
                                  />
                                  {touched.respiratory_rate &&
                                    errors.respiratory_rate && (
                                      <div className="text-danger">
                                        {" "}
                                        {errors.respiratory_rate}
                                      </div>
                                    )}
                                  <small className="text-muted">
                                    Normal: 12-20 /min
                                  </small>
                                </div>
                              </div>
                            </div>

                            {/* Blood Pressure */}
                          </div>

                          {/* Second Row - Anthropometrics */}
                          <div className="row">
                            <div className="row mt-2">
                              <div className="col-md-3 mb-2">
                                <div className="card h-100">
                                  <div className="card-body text-center">
                                    <h6 className="card-title text-primary">
                                      Blood Pressure
                                    </h6>
                                    <Field
                                      as="select"
                                      name="blood_pressure"
                                      className="form-control"
                                    >
                                      <option >Select</option>
                                      <option value="Normal">Normal</option>
                                      <option value="High">High</option>
                                      <option value="Low">Low</option>
                                    </Field>
                                    {touched.blood_pressure &&
                                      errors.blood_pressure && (
                                        <div className="text-danger">
                                          {" "}
                                          {errors.blood_pressure}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-2 mb-3">
                                <div className="card h-100">
                                  <div className="card-body text-center">
                                    <h6 className="card-title text-primary">
                                      Height
                                    </h6>
                                    <div className="input-group">
                                      <Field
                                        name="height"
                                        type="number"
                                        className="form-control text-center"
                                        placeholder="170"
                                      />
                                 
                                      <div className="input-group-append">
                                        <span className="input-group-text">
                                          cm
                                        </span>
                                      </div>
                                      {touched.height && errors.height && (
                                        <div className="text-danger">
                                          {" "}
                                          {errors.height}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-2 mb-3">
                                <div className="card h-100">
                                  <div className="card-body text-center">
                                    <h6 className="card-title text-primary">
                                      Weight
                                    </h6>
                                    <div className="input-group">
                                      <Field
                                        type="number"
                                        name="weight"
                                        className="form-control text-center"
                                        placeholder="0"
                                        step="0.1"
                                      />
                             
                                      <div className="input-group-append">
                                        <span className="input-group-text">
                                          kg
                                        </span>
                                      </div>
                                      {touched.weight && errors.weight && (
                                        <div className="text-danger">
                                          {" "}
                                          {errors.weight}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary mr-2"
                          >
                            <i className="fas fa-save mr-2"></i>Save Vitals
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            Cancel
                          </button>
                        </div>
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
  );
};

export default Opdward;
