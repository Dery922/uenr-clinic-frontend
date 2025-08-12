import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import DatePickerField from "../../components/DatePickerField";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Opdward = () => { 
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const autUser = useSelector((state) => state.user.user);


  const vitalsInfos = {
    patient_id : "",
    first_name: "",
    last_name: "",
    patient_type: "",
    gender: "",
    age: "",
    phone: "",
    registration_date: "",
    temperature: "",
    pulse: "",
    respiratory_rate: "",
    blood_pressure: "",
    height: "",
    weight: "",
    username: "",
  };

  const [vitals, setVitals] = useState(vitalsInfos);

  const {
    patient_id,
    first_name,
    last_name,
    patient_type,
    gender,
    age,
    phone,
    registration_date,
    temperature,
    pulse,
    respiratory_rate,
    blood_pressure,
    height,
    weight,
    username,
  } = vitals;

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

  const vitalsVailidation = Yup.object({
    registration_date: Yup.string().required("Date is required"),
    temperature: Yup.number().required("temperature is required"),
    pulse: Yup.number().required("Pulse is required"),
    respiratory_rate: Yup.number().required("Respiratory Rate is required"),
    blood_pressure: Yup.string().required("Blodd pressure is required"),
    height: Yup.number().required("Height is required"),
    weight: Yup.number().required("Weight is required"),
  });

  const handleSubmitVitals = async (values) => {
    try {
      const record = await axios.post("http://localhost:8080/create-patient-opdward-record",values);
      toast.success("Data enter successfully");
    } catch (error) {
      toast.error("Error in entrying data try again later")
      console.log(error.message);
    }
  };
  return (
    <div class="main-wrapper">
      <Sidebar />
      <div class="page-wrapper">
        <div class="content">
          <div class="row">
            <div class="col-sm-4 col-3"></div>
          </div>
          <div class="row filter-row">
            <div class="col-sm-6 col-md-3">
              <div class="form-group form-focus">
                <label class="focus-label">
                  Search by folder number or phone number
                </label>
                <input
                  placeholder="Search by folder number or phone number"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  class="form-control floating"
                />
              </div>
            </div>

            <div class="col-sm-6 col-md-3">
              <a href="#" class="btn btn-success btn-block">
                {" "}
                Search{" "}
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th style={{ minWidth: 200 }}>Name</th>
                      <th>Employee ID</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th style={{ minWidth: 110 }}>Join Date</th>
                      <th>Role</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((patient) => (
                      <tr key={patient._id}>
                        <td>{patient.name}</td>
                        <td>{patient.folderNumber}</td>
                        <td>{patient.email}</td>
                        <td>{patient.phone}</td>
                        <td>
                          {patient.createdAt
                            ? new Date(patient.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>{patient.role || "Patient"}</td>
                        <td className="text-right">
                          <a
                            href={`/patient/${patient._id}`}
                            className="btn btn-sm btn-primary"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div class="col-lg-8 offset-lg-2">
              {result.map((data) => (
                <Formik
                    initialValues={{
                      patient_id : data.patient_id,
                      first_name: data.first_name || "",
                      last_name: data.last_name || "",
                      patient_type: data.patient_type || "",
                      gender: data.gender || "",
                      age: data.age || "",
                      phone: data.phone || "",
                      registration_date: "",
                      temperature: "",
                      pulse: "",
                      respiratory_rate: "",
                      blood_pressure: "",
                      height: "",
                      weight: "",
                      username: autUser.username || "",
                    }}
                    
                  
                  validationSchema={vitalsVailidation} //validation
                  enableReinitialize
                  onSubmit={async (values, { setSubmitting }) => {
                    setVitals(values);
                    await handleSubmitVitals(values);
                    setSubmitting(false);
                  }}
                >
                  {({ errors, touched, values }) => (
                    <Form>
                      <h3 class="page-title">
                        Personal Information from Record Office
                      </h3>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              First Name <span class="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              class="form-control"
                              name="first_name"
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Last Name <span class="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              class="form-control"
                              name="last_name"
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Patient Type
                              <span class="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              class="form-control"
                              name="patient_type"
                              
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Gender <span class="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              class="form-control"
                              name="gender"
                             
                               readOnly
                            />
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Age <span class="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              class="form-control"
                              name="age"
                           
                               readOnly
                            />
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Phone Number <span class="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              class="form-control"
                              name="phone"
                              
                               readOnly
                            />
                          </div>
                        </div>
                      </div>

                      <h3 class="page-title">OPD Records Start Here!</h3>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>
                              Registration Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="">
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

                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Temperature <span class="text-danger">*</span>
                            </label>
                            <Field
                              class="form-control"
                              name="temperature"
                              type="text"
                            />
                            {touched.temperature && errors.temperature && (
                              <div className="text-danger">
                                {errors.temperature}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Pulse <span class="text-danger">*</span>
                            </label>
                            <Field
                              name="pulse"
                              class="form-control"
                              type="text"
                            />
                            {touched.pulse && errors.pulse && (
                              <div className="text-danger">{errors.pulse}</div>
                            )}
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Respiratory Rate{" "}
                              <span class="text-danger">*</span>
                            </label>
                            <Field
                              class="form-control"
                              name="respiratory_rate"
                              type="text"
                            />
                            {touched.respiratory_rate &&
                              errors.respiratory_rate && (
                                <div className="text-danger">
                                  {errors.respiratory_rate}
                                </div>
                              )}
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>Blood Pressure</label>
                            <Field
                              as="select"
                              name="blood_pressure"
                              class="form-control select"
                            >
                              <option value="High">High</option>
                              <option value="Low">Low</option>
                              <option value="Normal">Normal</option>
                            </Field>
                            {touched.blood_pressure &&
                              errors.blood_pressure && (
                                <div className="text-danger">
                                  {errors.blood_pressure}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>
                            Height <span class="text-danger">*</span>
                          </label>
                          <Field
                            class="form-control"
                            name="height"
                            type="text"
                          />
                          {touched.height && errors.height && (
                            <div className="text-danger">{errors.height}</div>
                          )}
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>
                            Weight <span class="text-danger">*</span>
                          </label>
                          <Field
                            class="form-control"
                            name="weight"
                            type="text"
                          />
                          {touched.weight && errors.weight && (
                            <div className="text-danger">{errors.weight}</div>
                          )}
                        </div>
                      </div>

                      <div class="col-sm-6">
                          <div class="form-group">
                            <label>
                              Username <span class="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              class="form-control"
                               name="username"
                               readOnly
                            />
                          </div>
                        </div>

                      <div class="m-t-20 text-center">
                        <button
                          type="submit"
                          class="btn btn-primary submit-btn"
                        >
                          Create Vitals for Patient
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opdward;
