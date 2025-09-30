import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import DatePickerField from "../../components/DatePickerField";
import { useSelector } from "react-redux";
import patientService from "../../services/patientService";
import Loader from "../../components/FullScreenLoader";

// Icons
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaVenusMars,
  FaIdCard,
  FaUniversity,
  FaHome,
  FaPhone,
  FaNotesMedical,
  FaUserGraduate,
  FaUserTie,
  FaUserInjured,
  FaCheckCircle,
  FaAddressCard,
} from "react-icons/fa";

const AddPatientRecord = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatient] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const create_by = useSelector((state) => state.user.user);
  const phoneExg = /^(?:\+233|0)[235][0-9]{8}$/;

  const insuranceNumbers = [12345, 123456, 1234567];

  const patientValidation = Yup.object().shape({
    first_name: Yup.string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed"
      ),
    last_name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Numbers and special characters are not allowed")
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters"),

    date_of_birth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age cannot be negative")
      .max(120, "Please enter a valid age"),
    patient_type: Yup.string().required("Patient type is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(phoneExg, "Phone number is not valid")
      .required("Phone number is required"),
    insurance: Yup.string().required("Insurance field is required"),

    insurance_number: Yup.string().when('insurance', {
      is: (val) => val === 'yes', // must be a function if you're comparing a value
      then: (schema) =>
        schema
          .required('Insurance number is required')
          .test(
            'is-valid-insurance',
            'Invalid insurance number',
            (value) => !value || insuranceNumbers.includes(Number(value))
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    

  });

  const registerRecord = async (values) => {
    console.log(values)
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/create-patient-record"||`${process.env.REACT_APP_API_URL}`,
        values
      );
      toast.success("Patient record created successfully!");
      setFormSubmitted(true);
      // Refresh patient list
      const patientData = await patientService();
      setPatient(patientData);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error creating patient record"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const patientData = await patientService();
        setPatient(patientData);
      } catch (error) {
        toast.error("Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div
                className="alert alert-info alert-dismissible fade show"
                role="alert"
              >
                <FaNotesMedical className="mr-2" />
                <strong>Note!</strong> After creation, the folder number will be
                sent to the patient via email.
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="page-header">
                <h4 className="page-title">
                  <FaUser className="mr-2" />
                  Add New Patient Record
                </h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active">Patients</li>
                    <li className="breadcrumb-item">New Patient</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="card patient-form-card">
                <div className="card-body">
                  <Formik
                    initialValues={{
                      created_by: create_by.username,
                      first_name: "",
                      last_name: "",
                      email: "",
                      date_of_birth: "",
                      gender: "",
                      age: "",
                      patient_type: "",
                      course_of_studies: "",
                      insurance: "",
                      insurance_number: "",
                      address: "",
                      phone: "",
                    }}
                    validationSchema={patientValidation}
                    onSubmit={registerRecord}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      isSubmitting,
                      setFieldValue,
                    }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaUser className="mr-2" />
                                Username
                              </label>
                              <Field
                                type="text"
                                className="form-control"
                                name="created_by"
                                value={create_by.username}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaUser className="mr-2" />
                                First Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className={`form-control ${
                                  errors.first_name && touched.first_name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="first_name"
                                type="text"
                                placeholder="Enter first name"
                              />
                              {errors.first_name && touched.first_name && (
                                <div className="invalid-feedback">
                                  {errors.first_name}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaUser className="mr-2" />
                                Last Name <span className="text-danger">*</span>
                              </label>
                              <Field
                                className={`form-control ${
                                  errors.last_name && touched.last_name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="last_name"
                                type="text"
                                placeholder="Enter last name"
                              />
                              {errors.last_name && touched.last_name && (
                                <div className="invalid-feedback">
                                  {errors.last_name}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaEnvelope className="mr-2" />
                                Email 
                              </label>
                              <Field
                                className="form-control" 
                                name="email"
                                type="email"
                                placeholder="patient@example.com"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaCalendarAlt className="mr-2" />
                                Date of Birth{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <DatePickerField
                                name="date_of_birth"
                                className={`form-control ${
                                  errors.date_of_birth && touched.date_of_birth
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {errors.date_of_birth &&
                                touched.date_of_birth && (
                                  <div className="invalid-feedback">
                                    {errors.date_of_birth}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaVenusMars className="mr-2" />
                                Gender <span className="text-danger">*</span>
                              </label>
                              <div
                                className="btn-group btn-group-toggle w-100"
                                data-toggle="buttons"
                              >
                                <label
                                  className={`btn btn-outline-primary ${
                                    values.gender === "male" ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    setFieldValue("gender", "male")
                                  }
                                >
                                  Male
                                </label>

                                <label
                                  className={`btn btn-outline-primary ${
                                    values.gender === "female" ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    setFieldValue("gender", "female")
                                  }
                                >
                                  Female
                                </label>
                              </div>

                              {errors.gender && touched.gender && (
                                <div className="text-danger small">
                                  {errors.gender}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaIdCard className="mr-2" />
                                Age <span className="text-danger">*</span>
                              </label>
                              <Field
                                className={`form-control ${
                                  errors.age && touched.age ? "is-invalid" : ""
                                }`}
                                name="age"
                                type="number"
                                placeholder="Enter age"
                              />
                              {errors.age && touched.age && (
                                <div className="invalid-feedback">
                                  {errors.age}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaUser className="mr-2" />
                                Patient Type{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div
                                className="btn-group btn-group-toggle w-100"
                                data-toggle="buttons"
                              >
                                <label
                                  className={`btn btn-outline-secondary ${
                                    values.patient_type === "student"
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setFieldValue("patient_type", "student")
                                  }
                                >
                                  <FaUserGraduate className="mr-1" /> Student
                                </label>

                                <label
                                  className={`btn btn-outline-secondary ${
                                    values.patient_type === "staff"
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setFieldValue("patient_type", "staff")
                                  }
                                >
                                  <FaUserTie className="mr-1" /> Staff
                                </label>

                                <label
                                  className={`btn btn-outline-secondary ${
                                    values.patient_type === "out-patient"
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setFieldValue("patient_type", "out-patient")
                                  }
                                >
                                  <FaUserInjured className="mr-1" /> Out-Patient
                                </label>
                              </div>

                              {errors.patient_type && touched.patient_type && (
                                <div className="text-danger small">
                                  {errors.patient_type}
                                </div>
                              )}
                            </div>
                          </div>

                          {values.patient_type === "student" && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  <FaUniversity className="mr-2" />
                                  Course of Study{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  as="select"
                                  name="course_of_studies"
                                  className={`form-control ${
                                    errors.course_of_studies &&
                                    touched.course_of_studies
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">-- Select Course --</option>
                                  <option value="Computer Science">
                                    Computer Science
                                  </option>
                                  <option value="Computer Engineering">
                                    Computer Engineering
                                  </option>
                                </Field>
                                {errors.course_of_studies &&
                                  touched.course_of_studies && (
                                    <div className="invalid-feedback">
                                      {errors.course_of_studies}
                                    </div>
                                  )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaIdCard className="mr-2" />
                                Health Insurance{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <div
                                className="btn-group btn-group-toggle w-100"
                                data-toggle="buttons"
                              >
                                <label
                                  className={`btn btn-outline-info ${
                                    values.insurance === "yes" ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    setFieldValue("insurance", "yes")
                                  }
                                >
                                  <FaCheckCircle className="mr-1" />
                                  Yes
                                </label>

                                <label
                                  className={`btn btn-outline-info ${
                                    values.insurance === "no" ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    setFieldValue("insurance", "no")
                                  }
                                >
                                  No
                                </label>
                              </div>

                              {errors.insurance && touched.insurance && (
                                <div className="text-danger small">
                                  {errors.insurance}
                                </div>
                              )}
                            </div>
                          </div>

                          {values.insurance === "yes" && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  <FaAddressCard className="mr-2" />
                                  Insurance Number{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  className={`form-control ${
                                    errors.insurance_number &&
                                    touched.insurance_number
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  name="insurance_number"
                                  type="text"
                                  placeholder="Enter insurance number"
                                />
                                {errors.insurance_number &&
                                  touched.insurance_number && (
                                    <div className="invalid-feedback">
                                      {errors.insurance_number}
                                    </div>
                                  )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                <FaHome className="mr-2" />
                                Address <span className="text-danger">*</span>
                              </label>
                              <Field
                                className={`form-control ${
                                  errors.address && touched.address
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="address"
                                type="text"
                                placeholder="Enter full address"
                              />
                              {errors.address && touched.address && (
                                <div className="invalid-feedback">
                                  {errors.address}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <FaPhone className="mr-2" />
                                Phone <span className="text-danger">*</span>
                              </label>
                              <Field
                                className={`form-control ${
                                  errors.phone && touched.phone
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="phone"
                                type="tel"
                                placeholder="+233XXXXXXXXX"
                              />
                              {errors.phone && touched.phone && (
                                <div className="invalid-feedback">
                                  {errors.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-center mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm mr-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Creating...
                              </>
                            ) : (
                              <>
                                <FaUser className="mr-2" />
                                Create Patient Record
                              </>
                            )}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientRecord;
