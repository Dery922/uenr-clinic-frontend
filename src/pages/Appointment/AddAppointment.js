import Sidebar from "../../components/Sidebar.js";
import DatePickerField from "../../components/DatePickerField.js";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import patientService from "../../services/patientService.js";
import { EmployeeService } from "../../services/employeesService.js";

import TimePickerField from "../../components/TImePickerField.js";
// import Loader from "../../components/Loader.js"; // New loading component
import Loader from "../../components/FullScreenLoader.js"
import "./style.css"
import api from "../../services/api.js";

const AddAppointment = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const appointmentValidation = Yup.object().shape({
    patient_name: Yup.string().required("Patient name is required"),
    doctor_name: Yup.string().required("Doctor name is required"),
    appointment_date: Yup.string().required("Appointment date is required"),
    appointment_time: Yup.string().required("Appointment time is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits"),
    email: Yup.string().email("Invalid email format"),
    appointment_status: Yup.string().required("Status is required"),
  });

  const registerAppointment = async (values) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/create-appointment",
        values
      );
      toast.success("Appointment created successfully!");
      setFormSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating appointment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [patientData, doctorData] = await Promise.all([
          patientService(),
          EmployeeService()
        ]);
        setPatients(patientData);
        setDoctors(doctorData.filter(d => d.role === "Doctor"));
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !formSubmitted) return <Loader />;

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="alert alert-info alert-dismissible fade show" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                <strong>Note!</strong> Appointment time and date will be sent to the patient via email.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              
              <div className="page-header">
                <h4 className="page-title">
                  <i className="far fa-calendar-plus mr-2"></i>
                  Add New Appointment
                </h4>
                <div className="breadcrumb">
                  <span className="breadcrumb-item active">Appointments</span>
                  <span className="breadcrumb-item">New Appointment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="card appointment-card">
                <div className="card-body">
                  <Formik
                    validationSchema={appointmentValidation}
                    initialValues={{
                      patient_name: "",
                      doctor_name: "",
                      appointment_type: "consultation",
                      appointment_date: "",
                      appointment_time: "",
                      reason: "",
                      email: "",
                      phone: "",
                      appointment_status: "pending",
                    }}
                    onSubmit={registerAppointment}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="fas fa-user-injured mr-2"></i>
                                Patient Name
                              </label>
                              <Field
                                as="select"
                                name="patient_name"
                                className={`form-control ${errors.patient_name && touched.patient_name ? 'is-invalid' : ''}`}
                              >
                                <option value="">Select Patient</option>
                                {patients.map((patient) => (
                                  <option
                                    key={patient._id}
                                    value={`${patient.first_name} ${patient.last_name}`}
                                  >
                                    {patient.first_name} {patient.last_name}
                                  </option>
                                ))}
                              </Field>
                              {errors.patient_name && touched.patient_name && (
                                <div className="invalid-feedback">
                                  {errors.patient_name}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="fas fa-user-md mr-2"></i>
                                Doctor
                              </label>
                              <Field
                                as="select"
                                name="doctor_name"
                                className={`form-control ${errors.doctor_name && touched.doctor_name ? 'is-invalid' : ''}`}
                              >
                                <option value="">Select Doctor</option>
                                {doctors.map((doctor) => (
                                  <option key={doctor._id} value={doctor.username}>
                                    Dr. {doctor.username}
                                  </option>
                                ))}
                              </Field>
                              {errors.doctor_name && touched.doctor_name && (
                                <div className="invalid-feedback">
                                  {errors.doctor_name}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="far fa-calendar-alt mr-2"></i>
                                Date
                              </label>
                              <DatePickerField 
                                name="appointment_date" 
                                className={`form-control ${errors.appointment_date && touched.appointment_date ? 'is-invalid' : ''}`}
                              />
                              {errors.appointment_date && touched.appointment_date && (
                                <div className="invalid-feedback">
                                  {errors.appointment_date}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="far fa-clock mr-2"></i>
                                Time
                              </label>
                              <TimePickerField 
                                name="appointment_time"
                                className={`form-control ${errors.appointment_time && touched.appointment_time ? 'is-invalid' : ''}`}
                              />
                              {errors.appointment_time && touched.appointment_time && (
                                <div className="invalid-feedback">
                                  {errors.appointment_time}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="fas fa-procedures mr-2"></i>
                                Appointment Type
                              </label>
                              <Field
                                as="select"
                                name="appointment_type"
                                className="form-control"
                              >
                                <option value="consultation">Consultation</option>
                                <option value="follow-up">Follow-up</option>
                                <option value="emergency">Emergency</option>
                                <option value="walk-in">Walk-in</option>
                                <option value="pre-operation">Pre-operative</option>
                                <option value="post-operation">Post-operation</option>
                              </Field>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="fas fa-clipboard-check mr-2"></i>
                                Status
                              </label>
                              <Field
                                as="select"
                                name="appointment_status"
                                className="form-control"
                              >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </Field>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-comment-medical mr-2"></i>
                            Reason
                          </label>
                          <Field
                            as="textarea"
                            name="reason"
                            rows="4"
                            className="form-control"
                            placeholder="Please describe the reason for the appointment..."
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="fas fa-envelope mr-2"></i>
                                Patient Email
                              </label>
                              <Field
                                name="email"
                                type="email"
                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                placeholder="patient@example.com"
                              />
                              {errors.email && touched.email && (
                                <div className="invalid-feedback">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                <i className="fas fa-phone mr-2"></i>
                                Phone Number
                              </label>
                              <Field
                                name="phone"
                                type="tel"
                                className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                placeholder="1234567890"
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
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Creating...
                              </>
                            ) : (
                              <>
                                <i className="far fa-calendar-check mr-2"></i>
                                Create Appointment
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

export default AddAppointment;