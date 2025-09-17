import { useState, useEffect } from "react";
import DatePickerField from "../../components/DatePickerField";
import Sidebar from "../../components/Sidebar";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";

const PatientLabTest = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const authUser = useSelector((state) => state.user.user);
  const [test, setTest] = useState();

  const currentSessionId = useSelector((state) => state.user.currentSessionId);

  const [activeTab, setActiveTab] = useState("blood");
  const [bloodQuery, setBloodQuery] = useState("");
  const [bloodResults, setBloodResults] = useState([]);
  const [selectedBloodPatient, setSelectedBloodPatient] = useState(null);

  const [imagingQuery, setImagingQuery] = useState("");
  const [imagingResults, setImagingResults] = useState([]);
  const [selectedPatientImaging, setSelectedPatientImaging] = useState(null);

  const [urineQuery, setUrineQuery] = useState("");
  const [urineResults, setUrineResults] = useState([]);
  const [selectedUrinePatient, setSelectedUrinePatient] = useState(null);

  const [quickQuery, setQuickQuery] = useState("");
  const [quickResults, setQuickResults] = useState([]);
  const [selectedQuickPatient, setSelectedQuickPatient] = useState(null);

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
    const delay = setTimeout(
      () => handleSearch(bloodQuery, setBloodResults),
      500
    );
    return () => clearTimeout(delay);
  }, [bloodQuery]);

  useEffect(() => {
    const delay = setTimeout(
      () => handleSearch(urineQuery, setUrineResults),
      500
    );
    return () => clearTimeout(delay);
  }, [urineQuery]);

  useEffect(() => {
    const delay = setTimeout(
      () => handleSearch(quickQuery, setQuickResults),
      500
    );
    return () => clearTimeout(delay);
  }, [quickQuery]);

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

  useEffect(() => {
    const delay = setTimeout(
      () => handleSearch(imagingQuery, setImagingResults),
      500
    );
    return () => clearTimeout(delay);
  }, [imagingQuery]);

  const handleSubmitTest = async (values) => {
    try {
      const valuesData = {
        ...values,
        currentSessionId: currentSessionId,
      };
      const record = await axios.post(
        "http://localhost:8080/create-patient-laptest-record",
        valuesData
      );
      toast.success("Patient Blood Test Save successfully");
    } catch (error) {
      toast.error("Error in saving Test result");
      console.log(error.message);
    }
  };

  const handleSubmitUrineTest = async (values) => {
    try {
      const record = await axios.post(
        "http://localhost:8080/create-patient-laptest-urine-record",
        values
      );
      toast.success("Patient Urine Test Save successfully");
      console.log(values);
    } catch (error) {
      toast.error("Error in saving Test result");
      console.log(error.message);
    }
  };

  const handleSubmitQuickTest = async (values) => {
    try {
      const record = await axios.post(
        "http://localhost:8080/create-patient-laptest-quicktest-record",
        values
      );
      toast.success("Patient quick Test Save successfully");
      console.log(values);
    } catch (error) {
      toast.error("Error in saving Test result");
      console.log(error.message);
    }
  };

  const handleImagingUpload = async (formValues, { setSubmitting }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/imaging",
        formValues,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Image uploaded successfully");
      setSubmitting(false);
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }
  };

  const BloodvalidationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    hemoglobin: Yup.string().required("Hemoglobin is required"),
    wbc_count: Yup.string().required("WBC_Count is required"),
    // blood_pressure: Yup.string().required("Blodd pressure is required"),
  });

  return (
    <div class="main-wrapper">
      <Sidebar />
      <div class="page-wrapper">
        <div class="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="page-title">
                Search for patient with patient id
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="container mt-4">
                <div class="card-body">
                  {/* Tab headers */}
                  <ul class="nav nav-tabs" id="labTabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        id="blood-tab"
                        data-toggle="tab"
                        href="#blood"
                      >
                        <i class="fa fa-tint"></i> Blood Tests
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="urine-tab"
                        data-toggle="tab"
                        href="#urine"
                      >
                        <i class="fa fa-flask"></i> Urine Tests
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="imaging-tab"
                        data-toggle="tab"
                        href="#imaging"
                      >
                        <i class="fa fa-medkit"></i> Imaging
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="quick-tab"
                        data-toggle="tab"
                        href="#quick"
                      >
                        <i class="fa fa-bolt"></i> Quick Tests
                      </a>
                    </li>
                  </ul>

                  <div
                    class="tab-content p-3 border border-top-0 rounded-bottom"
                    id="labTabsContent"
                  >
                    <div
                      class="tab-pane fade show active"
                      id="blood"
                      role="tabpanel"
                    >
                      <div className="card border-0 shadow-sm">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">
                            <i className="fas fa-tint mr-2"></i>
                            Essential Blood Tests
                          </h5>
                        </div>
                        <div class="col-sm-6 col-md-3" style={{ padding: 10 }}>
                          <div class="form-group form-focus">
                            <label class="focus-label">
                              Search by folder number
                            </label>
                            <input
                              placeholder="Search by folder number"
                              type="text"
                              value={bloodQuery}
                              onChange={(e) => setBloodQuery(e.target.value)}
                              className="form-control"
                            />
                            <ul className="list-group mt-2">
                              {bloodResults.map((patient) => (
                                <li
                                  className="list-group-item list-group-item-action"
                                  key={patient.patient_id}
                                  onClick={() =>
                                    setSelectedBloodPatient(patient)
                                  }
                                >
                                  {patient.first_name} {patient.last_name} (
                                  {patient.patient_id})
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {selectedBloodPatient && (
                          <Formik
                            initialValues={{
                              session: selectedBloodPatient._id,
                              patient_name:
                                selectedBloodPatient.first_name +
                                " " +
                                selectedBloodPatient.last_name,
                              patient_id: selectedBloodPatient.patient_id,
                              date: "",
                              hemoglobin: "",
                              hemoglobin_flag: "",
                              hemoglobin_notes: "",
                              wbc_count: "",
                              wbc_flag: "",
                              wbc_notes: "",
                              username: authUser.username,
                            }}
                            enableReinitialize
                            validationSchema={BloodvalidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                              setTest(values);
                              handleSubmitTest(values);

                              setSubmitting(false);
                            }}
                          >
                            {({ errors, touched, values }) => (
                              <Form>
                                <div className="card-body">
                                  {/* Hemoglobin Test */}
                                  <div className="test-card mb-4 p-3 border rounded">
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
                                          {touched.date && errors.date && (
                                            <div className="text-danger">
                                              {" "}
                                              {errors.date}
                                            </div>
                                          )}
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
                                          Select Date
                                        </label>
                                        <div className="input-group">
                                          <DatePickerField name="date" />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                      <h6 className="mb-0 font-weight-bold text-dark flex-grow-1">
                                        Hemoglobin (Hb)
                                      </h6>
                                      <span className="badge badge-danger ml-2">
                                        Low
                                      </span>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-3 mb-2">
                                        <label className="text-muted small">
                                          Result
                                        </label>
                                        <div className="input-group">
                                          <Field
                                            type="number"
                                            name="hemoglobin"
                                            className="form-control"
                                            step="0.1"
                                            defaultValue="10.2"
                                          />

                                          <div className="input-group-append">
                                            <span className="input-group-text">
                                              g/dL
                                            </span>
                                          </div>
                                        </div>
                                        {touched.date && errors.hemoglobin && (
                                          <div className="text-danger">
                                            {" "}
                                            {errors.hemoglobin}
                                          </div>
                                        )}
                                      </div>

                                      <div className="col-md-3 mb-2">
                                        <label className="text-muted small">
                                          Normal Range
                                        </label>
                                        <div className="bg-light p-2 rounded text-center">
                                          12.0 - 16.0 g/dL
                                        </div>
                                      </div>

                                      <div className="col-md-3 mb-2">
                                        <label className="text-muted small">
                                          Flag
                                        </label>
                                        <Field
                                          as="select"
                                          name="hemoglobin_flag"
                                          className="form-control"
                                        >
                                          <option value="Normal">Normal</option>
                                          <option value="Abnormal" selected>
                                            Abnormal
                                          </option>
                                          <option value="Low">Low</option>
                                        </Field>
                                      </div>
                                      {touched.date &&
                                        errors.hemoglobin_flag && (
                                          <div className="text-danger">
                                            {" "}
                                            {errors.hemoglobin_flag}
                                          </div>
                                        )}
                                    </div>

                                    <div className="mt-2">
                                      <label className="text-muted small">
                                        Notes
                                      </label>
                                      <Field
                                        type="text"
                                        name="hemoglobin_notes"
                                        className="form-control"
                                        placeholder="Microcytic anemia..."
                                      />
                                    </div>
                                  </div>

                                  {/* WBC Count Test */}
                                  <div className="test-card p-3 border rounded">
                                    <div className="d-flex align-items-center mb-2">
                                      <h6 className="mb-0 font-weight-bold text-dark flex-grow-1">
                                        WBC Count
                                      </h6>
                                      <span className="badge badge-warning ml-2">
                                        High
                                      </span>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-3 mb-2">
                                        <label className="text-muted small">
                                          Result
                                        </label>
                                        <div className="input-group">
                                          <Field
                                            type="number"
                                            name="wbc_count"
                                            className="form-control"
                                            step="0.1"
                                            defaultValue="15.0"
                                          />
                                          <div className="input-group-append">
                                            <span className="input-group-text">
                                              10³/μL
                                            </span>
                                          </div>
                                        </div>
                                        {touched.date && errors.wbc_count && (
                                            <div className="text-danger">
                                              {" "}
                                              {errors.wbc_count}
                                            </div>
                                          )}
                                      </div>
                                    

                                      <div className="col-md-3 mb-2">
                                        <label className="text-muted small">
                                          Normal Range
                                        </label>
                                        <div className="bg-light p-2 rounded text-center">
                                          4.0 - 11.0 10³/μL
                                        </div>
                                      </div>

                                      <div className="col-md-3 mb-2">
                                        <label className="text-muted small">
                                          Flag
                                        </label>
                                        <Field
                                          as="select"
                                          name="wbc_flag"
                                          className="form-control"
                                        >
                                          <option value="Normal">Normal</option>
                                          <option value="High" selected>
                                            High
                                          </option>
                                          <option value="Low">Low</option>
                                        </Field>
                                      </div>
                                    </div>

                                    <div className="mt-2">
                                      <label className="text-muted small">
                                        Notes
                                      </label>
                                      <Field
                                        type="text"
                                        name="wbc_notes"
                                        className="form-control"
                                        placeholder="Possible infection..."
                                      />
                                    </div>
                                  </div>

                                  <div class="row mt-4">
                                    {/* <div class="col-md-6">
                                    <div class="form-group">
                                      <label>Overall Interpretation</label>
                                      <textarea
                                        class="form-control"
                                        rows="2"
                                        placeholder="Summary of findings..."
                                      ></textarea>
                                    </div>
                                  </div> */}
                                    <div class="col-md-6 text-right">
                                      <button class="btn btn-outline-secondary mr-2">
                                        <i class="fas fa-print"></i> Print
                                        Requisition
                                      </button>
                                      <button
                                        type="submit"
                                        class="btn btn-success"
                                      >
                                        <i class="fas fa-save"></i> Save All
                                        Results
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        )}
                      </div>
                    </div>

                    {/* urine test tab here */}

                    <div class="tab-pane fade" id="urine" role="tabpanel">
                      <div class="col-sm-6 col-md-3" style={{ padding: 10 }}>
                        <div class="form-group form-focus">
                          <label class="focus-label">
                            Search by folder number
                          </label>
                          <input
                            placeholder="Search by folder number"
                            type="text"
                            value={urineQuery}
                            onChange={(e) => setUrineQuery(e.target.value)}
                            className="form-control"
                          />
                          <ul className="list-group mt-2">
                            {urineResults.map((patient) => (
                              <li
                                className="list-group-item list-group-item-action"
                                key={patient.patient_id}
                                onClick={() => setSelectedUrinePatient(patient)}
                              >
                                {patient.first_name} {patient.last_name} (
                                {patient.patient_id})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <h5 class="mb-3 text-primary">
                        <i class="fas fa-flask"></i> Urine Analysis
                      </h5>
                      {selectedUrinePatient && (
                        <Formik
                          initialValues={{
                            session : selectedUrinePatient._id,
                            patient_name:
                              selectedUrinePatient.first_name +
                              " " +
                              selectedUrinePatient.last_name,
                            patient_id: selectedUrinePatient.patient_id,
                            date: "",
                            appearance: "",
                            color: "",
                            protein: "",
                            glucose: "",
                            notes1: "",
                            notes2: "",
                            username: authUser.username,
                          }}
                          enableReinitialize
                          onSubmit={(values, { setSubmitting }) => {
                            setTest(values);
                            handleSubmitUrineTest(values);
                            setSubmitting(false);
                          }}
                        >
                          <Form>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    class="form-control"
                                    placeholder="Patient ID"
                                    readonly
                                    name="patient_id"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    class="form-control"
                                    placeholder="Patient ID"
                                    readonly
                                    name="patient_name"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="form-group">
                                  <label>Appearance</label>
                                  <Field
                                    as="select"
                                    name="appearance"
                                    class="form-control"
                                  >
                                    <option value="Clear">Clear</option>
                                    <option value="Cloudy">Cloudy</option>
                                    <option value="Bloody">Bloody</option>
                                    <option value="Turbid">Turbid</option>
                                  </Field>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="form-group">
                                  <label>Color</label>
                                  <Field
                                    as="select"
                                    name="color"
                                    class="form-control"
                                  >
                                    <option value="Yellow">Yellow</option>
                                    <option value="Amber">Amber</option>
                                    <option value="Red">Red</option>
                                    <option value="Brown">Brown</option>
                                  </Field>
                                </div>
                              </div>
                            </div>
                            <div class="table-responsive">
                              <table class="table table-sm table-bordered">
                                <thead class="thead-light">
                                  <tr>
                                    <th>Parameter</th>
                                    <th>Result</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Protein</td>
                                    <td>
                                      <Field
                                        as="select"
                                        name="protein"
                                        class="form-control form-control-sm"
                                      >
                                        <option value="Negative">
                                          Negative
                                        </option>
                                        <option value="Trace" selected>
                                          Trace
                                        </option>
                                        <option value="1+">1+</option>
                                        <option value="2+">2+</option>
                                      </Field>
                                    </td>
                                    <td>
                                      <Field
                                        type="text"
                                        name="notes1"
                                        class="form-control form-control-sm"
                                        placeholder="Notes for protein if any..."
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Glucose</td>
                                    <td>
                                      <Field
                                        as="select"
                                        name="glucose"
                                        class="form-control form-control-sm"
                                      >
                                        <option value="Negative" selected>
                                          Negative
                                        </option>
                                        <option value="Trace">Trace</option>
                                        <option value="1+">1+</option>
                                      </Field>
                                    </td>
                                    <td>
                                      <Field
                                        type="text"
                                        name="notes2"
                                        class="form-control form-control-sm"
                                        placeholder="Notes for glucose if any...."
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div class="col-md-6 text-right">
                              <button class="btn btn-outline-secondary mr-2">
                                <i class="fas fa-print"></i> Print Requisition
                              </button>
                              <button type="submit" class="btn btn-success">
                                <i class="fas fa-save"></i> Save All Results
                              </button>
                            </div>
                          </Form>
                        </Formik>
                      )}
                    </div>

                    <div class="tab-pane fade" id="imaging" role="tabpanel">
                      <h5 class="mb-3 text-primary">
                        <i class="fas fa-x-ray"></i> Basic Imaging
                      </h5>
                      <div className="form-group form-focus">
                        <label className="focus-label">
                          Search by folder number
                        </label>
                        <input
                          placeholder="Search by folder number"
                          type="text"
                          value={imagingQuery}
                          onChange={(e) => setImagingQuery(e.target.value)}
                          className="form-control"
                        />
                        <ul className="list-group mt-2">
                          {imagingResults.map((patient) => (
                            <li
                              className="list-group-item list-group-item-action"
                              key={patient.patient_id}
                              onClick={() => setSelectedPatientImaging(patient)}
                            >
                              {patient.first_name} {patient.last_name} (
                              {patient.patient_id})
                            </li>
                          ))}
                        </ul>
                      </div>
                      {selectedPatientImaging && (
                        <Formik
                          initialValues={{
                            session : selectedPatientImaging._id,
                            patient_name: `${selectedPatientImaging.first_name} ${selectedPatientImaging.last_name}`,
                            patient_id: selectedPatientImaging.patient_id,
                            registration_date: "",
                            image_type: "",
                            findings: "",
                            image: "",
                            username: authUser.username,
                          }}
                          enableReinitialize
                          onSubmit={handleImagingUpload}
                        >
                          {({ setFieldValue }) => (
                            <Form>
                              <div class="form-group">
                                <label>Patient ID</label>
                                <Field
                                  type="text"
                                  class="form-control"
                                  name="patient_id"
                                  readOnly
                                />
                              </div>
                              <div class="form-group">
                                <label>Patient Name</label>
                                <Field
                                  type="text"
                                  class="form-control"
                                  name="patient_name"
                                  readOnly
                                />
                              </div>
                              <div className="form-group">
                                <DatePickerField name="registration_date" />
                              </div>

                              <div class="form-group">
                                <label>Imaging Type</label>
                                <Field
                                  as="select"
                                  name="image_type"
                                  class="form-control"
                                >
                                  <option value="Chest X-Ray">
                                    Chest X-Ray
                                  </option>
                                  <option value="Abdominal Ultrasound">
                                    Abdominal Ultrasound
                                  </option>
                                  <option value="Pelvic Ultrasound">
                                    Pelvic Ultrasound
                                  </option>
                                  <option value="ECG">ECG</option>
                                </Field>
                              </div>
                              <div class="form-group">
                                <label>Findings</label>
                                <Field
                                  as="textarea"
                                  name="findings"
                                  class="form-control"
                                  rows="3"
                                  placeholder="Describe imaging findings..."
                                ></Field>
                              </div>
                              <div className="form-group">
                                <label>Upload Image</label>
                                <div className="custom-file">
                                  <input
                                    id="imagingUpload"
                                    name="image"
                                    type="file"
                                    className="custom-file-input"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "image",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="imagingUpload"
                                  >
                                    Choose DICOM/image file
                                  </label>
                                </div>
                              </div>

                              <div class="col-md-6 text-right">
                                <button class="btn btn-outline-secondary mr-2">
                                  <i class="fas fa-print"></i>
                                  Print Requisition
                                </button>
                                <button type="submit" class="btn btn-success">
                                  <i class="fas fa-save"></i>
                                  Save All Results
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>

                    <div class="tab-pane fade" id="quick" role="tabpanel">
                      <div class="col-sm-6 col-md-3" style={{ padding: 10 }}>
                        <div class="form-group form-focus">
                          <label class="focus-label">
                            Search by folder number
                          </label>
                          <input
                            placeholder="Search by folder number"
                            type="text"
                            value={quickQuery}
                            onChange={(e) => setQuickQuery(e.target.value)}
                            className="form-control"
                          />
                          <ul className="list-group mt-2">
                            {quickResults.map((patient) => (
                              <li
                                className="list-group-item list-group-item-action"
                                key={patient.patient_id}
                                onClick={() => setSelectedQuickPatient(patient)}
                              >
                                {patient.first_name} {patient.last_name} (
                                {patient.patient_id})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <h5 class="mb-3 text-primary">
                        <i class="fas fa-bolt"></i> Point-of-Care Tests
                      </h5>

                      {selectedQuickPatient && (
                        <Formik
                          initialValues={{
                            patient_name:
                              selectedQuickPatient.first_name +
                              " " +
                              selectedQuickPatient.last_name,
                            patient_id: selectedQuickPatient.patient_id,
                            date: "",
                            malaria: "",
                            covid: "",
                            pregnancy: "",
                            username: authUser.username,
                          }}
                          enableReinitialize
                          onSubmit={(values, { setSubmitting }) => {
                            handleSubmitQuickTest(values);
                            setSubmitting(false);
                          }}
                        >
                          <Form>
                            <div className="row">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
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
                                  <div className="form-group">
                                    <Field
                                      type="text"
                                      class="form-control"
                                      placeholder="Patient ID"
                                      readOnly
                                      name="patient_name"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div className="col-md-3 mb-2">
                                  <label className="text-muted small">
                                    Select Date
                                  </label>
                                  <div className="form-group">
                                    <DatePickerField name="date" />
                                  </div>
                                </div>

                                <div class="col-md-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h6 class="card-title">
                                        <i class="fas fa-virus"></i> Malaria RDT
                                      </h6>
                                      <div class="form-group">
                                        <label>Result</label>
                                        <Field
                                          as="select"
                                          name="malaria"
                                          class="form-control"
                                        >
                                          <option value="Negative">
                                            Negative
                                          </option>
                                          <option value="Positive-p.falciparum">
                                            Positive (P.falciparum)
                                          </option>
                                          <option value="Positive non-falciparum">
                                            Positive (Non-falciparum)
                                          </option>
                                        </Field>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h6 class="card-title">
                                        <i class="fas fa-syringe"></i> COVID-19
                                        Rapid Test
                                      </h6>
                                      <div class="form-group">
                                        <label>Result</label>
                                        <Field
                                          as="select"
                                          name="covid"
                                          class="form-control"
                                        >
                                          <option value="Negative">
                                            Negative
                                          </option>
                                          <option value="Positive">
                                            Positive
                                          </option>
                                          <option value="Invalid">
                                            Invalid
                                          </option>
                                        </Field>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h6 class="card-title">
                                        <i class="fas fa-heartbeat"></i>{" "}
                                        Pregnancy Test
                                      </h6>
                                      <div class="form-group">
                                        <label>Result</label>
                                        <Field
                                          as="select"
                                          name="pregnancy"
                                          class="form-control"
                                        >
                                          <option value="Negative">
                                            Negative
                                          </option>
                                          <option value="Positive">
                                            Positive
                                          </option>
                                        </Field>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-6 text-right">
                              <button class="btn btn-outline-secondary mr-2">
                                <i class="fas fa-print"></i> Print Requisition
                              </button>
                              <button type="submit" class="btn btn-success">
                                <i class="fas fa-save"></i> Save All Results
                              </button>
                            </div>
                          </Form>
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
  );
};

export default PatientLabTest;
