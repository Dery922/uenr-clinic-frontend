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

const EditAppointment = () => {
  const [success, setSuccess] = useState();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const appointmentInfos = {
    patient_name: "",
    doctor_name: "",
    appointment_type: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
    email: "",
    phone: "",
    status: "",
  };

  const [appointments, setAppointment] = useState(appointmentInfos);

  const {
    patient_name,
    doctor_name,
    appointment_type,
    appointment_date,
    appointment_time,
    reason,
    email,
    phone,
    status,
  } = appointments;

  const appointmentValidation = Yup.object().shape({
    patient_name: Yup.string().required("Patient name is required"),
    doctor_name: Yup.string().required("Doctor name is required"),
    appointment_date: Yup.string().required("Appointment date is required"),
    appointment_time: Yup.string().required("Appointment time is required"),
    phone: Yup.string().required("Phone number is required"),
    appointment_status: Yup.string().required("Appointment status is required"),
  });

  const registerAppointment = async (values) => {

    try {
      const appoint = await axios.post(
        `${process.env.REACT_APP_API_URL}` || "http://localhost:8080/create-appointment",
        values
      );
      toast.success("Appointment created successfully!!");
    } catch (err) {
      toast.error({ err });
      toast.error("Error in creating appointment");
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const getData = await patientService();
        const getUser = await EmployeeService();
        setPatients(getData);
        setDoctors(getUser);
      } catch (error) {
        console.log("error");
      }
    };
    fetchPatient();
  }, []);

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div
                class="alert alert-info alert-dismissible fade show"
                role="alert"
              >
                <strong>Note!</strong> Please Appointment{" "}
                <a href="#" class="alert-link">
                  Time and Date
                </a>{" "}
                Is sent to patient via email.
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h4 className="page-title">Add Appointment</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <Formik
                validationSchema={appointmentValidation}
                enableReinitialize
                initialValues={{
                  patient_name: patient_name || "",
                  doctor_name: doctor_name || "",
                  appointment_type: appointment_type || "consultation",
                  appointment_date: appointment_date || "",
                  appointment_time: appointment_time || "",
                  reason: reason || "",
                  email: email || "",
                  phone: phone || "",
                  appointment_status: "pending",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        console.log(values)
                        setAppointment(values);
                        await registerAppointment(values);
                        setSubmitting(false);
                    } catch (error) {
                        console.log(error) 
                    }
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Patient Name</label>
                          <Field
                            as="select"
                            type="text"
                            name="patient_name"
                            className="form-control"
                          >
                            {patients.map((patient) => (
                              <option
                                key={patient._id}
                                value={patient.first_name}
                              >
                                {patient.first_name + " " + patient.last_name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Doctor</label>
                          <Field
                            as="select"
                            type="text"
                            name="doctor_name"
                            className="form-control"
                          >
                            <option>Select</option>
                            {doctors.map((data) =>
                              data.role === "Doctor" ? (
                                <option value={data.username}>
                                  {data.username}
                                </option>
                              ) : (
                                ""
                              )
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Appointment Type</label>
                          <Field
                            as="select"
                            type="text"
                            name="appointment_type"
                            className="form-control"
                          >
                            <option value="consultation">Consultation</option>
                            <option value="follow-up">Follow-up</option>
                            <option value="emergency">Emergency</option>
                            <option value="walk-in">Walk-in</option>
                            <option value="pre-operation">Pre-operative</option>
                            <option value="post-operation">
                              Post-operation
                            </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Date</label>
                          <div className="cal-icon">
                            <DatePickerField name="appointment_date" />
                            {touched.appointment_date &&
                              errors.appointment_date && (
                                <div className="text-danger">
                                  {" "}
                                  {errors.appointment_date}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Time</label>
                          <div className="time-icon">
                            <TimePickerField
                              name="appointment_time"
                              className="form-control time-icon"
                            />
                            {touched.appointment_time &&
                              errors.appointment_time && (
                                <div className="text-danger">
                                  {" "}
                                  {errors.appointment_time}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Reason</label>
                      <Field
                        as="textarea"
                        type="text"
                        placeholder="Please Enter reason why patient seek audience"
                        name="reason"
                        cols="30"
                        rows="6"
                        class="form-control"
                      ></Field>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Patient Email</label>
                          <Field
                            name="email"
                            className="form-control"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Patient Phone Number</label>
                          <Field
                            name="phone"
                            type="text"
                            className="form-control"
                          />
                          {touched.phone && errors.phone && (
                            <div className="text-danger"> {errors.phone}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Appointment Status</label>
                          <Field
                            as="select"
                            type="text"
                            name="appointment_status"
                            className="form-control"
                          >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="m-t-20 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Create Appointment
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
  );
};

export default EditAppointment;
