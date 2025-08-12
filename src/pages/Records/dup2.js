import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import * as Yup from "yup";
import { Formik, Form, Field, useFormikContext } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import DatePickerField from "../../components/DatePickerField";
import { useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";

import $ from "jquery";
// Old (causing the error):
// import "datatables.net-dt/css/jquery.dataTables.css";

// ✅ New (correct for your version):
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons/js/buttons.print.js";

import "datatables.net-buttons-dt/css/buttons.dataTables.css";

import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import patientService from "../../services/patientService";

// Required for PDF export

pdfMake.vfs = pdfFonts.vfs; // ✅ This is the correct way

window.JSZip = jszip;

const AddPatientRecord = () => {
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [patient, setPatient]= useState([]);
  const [currentUser, setCurrentUser] = useState(false);

  const [isInsturance, setIsInsurance] = useState(false);
  const [patientTypes, setPatientTypes] = useState(false);

  const phoneExg = /^(?:\+233|0)[235][0-9]{8}$/;


  const create_by = useSelector((state) => state.user.user);

  const patientInfos = {
    created_by : "",
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
  };

  const [user, setUser] = useState(patientInfos);
  const {
    created_by,
    first_name,
    last_name,
    email,
    date_of_birth,
    gender,
    age,
    patient_type,
    course_of_studies,
    insurance,
    insurance_number,
    address,
    phone,
  } = user;

  const patientValidation = Yup.object().shape({
    first_name: Yup.string()
      .required("First name is required!")
      .min(3, "First name must be 3 characters at minimum")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allow"),
    last_name: Yup.string()
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allow")
      .required("Last name is required!")
      .min(3, "Last name must be 3 characters at minimum"),
    email: Yup.string()
      .required("Email address is required")
      .min(3, "first name must be 3 characters at minimum"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number().required("Age is required"),
    insurance: Yup.string().required("Insurance field is required"),
    // insurance_number : Yup.string().required("Insurance number is required"),
    patient_type: Yup.string().required("Patient type is requried"),
    address: Yup.string().required("Address  is required"),
    phone: Yup.string().matches(phoneExg, "Phone number is not valid").required("Phone number is required"),
  });
  const registerRecord = async (values) => {
    try {
      const record = await axios.post(
        "http://localhost:8080/create-patient-record",
        values
      );
      toast.success("Patient Record added successfully!!");
      setError("");
      setSuccess(record.message);
    } catch (err) {
      toast.error("Error in adding record check ");
      
    }
  };

  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await patientService();
        setPatient(patientData);
      } catch (error) {
        console.log("Fetch error:", error.message);
      }
    };

    fetchPatient();
  }, []);

  // Initialize DataTable AFTER patient data is set
  useEffect(() => {
    if (patient.length > 0) {
      // Destroy existing DataTable (if it exists)
      const table = $("#table-4").DataTable();
      if (table) {
        table.destroy();
      }

          // Remove empty rows before initialization
    $("#table-4 tbody tr.odd").remove();
  
      // Initialize new DataTable
      $("#table-4").DataTable({
        dom: "Bfrtip",
        buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5", "print"],
        // Optional: Handle missing data gracefully
        columnDefs: [
          { defaultContent: "-", targets: "_all" } // Show "-" if data is missing
        ]
      });
  
      // Cleanup on unmount
      return () => {
        if ($.fn.DataTable.isDataTable("#table-4")) {
          $("#table-4").DataTable().destroy();
        }
      };
    }
  }, [patient]);



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
                <strong>Note!</strong> Please after creation{" "}
                <a href="#" class="alert-link">
                  Folder
                </a>{" "}
                Number is sent to the patient via email address, so notify
                patient.
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h4 className="page-title">Add Patient Record</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <Formik
                enableReinitialize
                initialValues={{
                  created_by,
                  first_name,
                  last_name,
                  email,
                  date_of_birth,
                  gender,
                  age,
                  patient_type,
                  course_of_studies : null,
                  insurance,
                  insurance_number : null,
                  address,
                  phone,
                }}
                validationSchema={patientValidation}
                onSubmit={async (values, { setSubmitting }) => {
                    const payload = {
                      ...values,
                      course_of_studies: values.patient_type === "student" ? values.course_of_studies : null,
                      insurance_number: values.insurance === "yes" ? values.insurance_number : null,
                    };
                  
                    try {
                      setUser(payload); // Optional
                      await registerRecord(payload);
                    } catch (error) {
                      console.error("Submission failed:", error);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  
              >
                {({ errors, touched, values }) => (
                  <Form>
 
                    <div className="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>
                          Username <span class="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          class="form-control"
                          name="created_by"
                          value={create_by.username}
                          readonly="readonly"
                        />
                      </div>
                    </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            First Name <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="first_name"
                            type="text"
                          />
                          {touched.first_name && errors.first_name && (
                            <div className="text-danger">
                              {" "}
                              {errors.first_name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="last_name"
                            type="text"
                          />
                          {touched.last_name && errors.last_name && (
                            <div className="text-danger">
                              {" "}
                              {errors.last_name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Email </label>
                          <Field
                            className="form-control"
                            name="email"
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Registration Date{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <DatePickerField name="date_of_birth" />
                            {touched.date_of_birth && errors.date_of_birth && (
                              <div className="text-danger">
                                {" "}
                                {errors.date_of_birth}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group gender-select">
                          <label className="gen-label">
                            Gender: <span className="text-danger">*</span>
                          </label>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="gender"
                                value="male"
                                className="form-check-input"
                              />
                              Male
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="gender"
                                value="female"
                                className="form-check-input"
                              />
                              Female
                              {touched.gender && errors.gender && (
                                <div className="text-danger">
                                  {" "}
                                  {errors.gender}
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Age <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control-custom"
                            name="age"
                            type="text"
                          />
                          {touched.age && errors.age && (
                            <div className="text-danger"> {errors.age}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group gender-select">
                          <label className="gen-label">
                            Select Patient Type:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="patient_type"
                                value="student"
                                className="form-check-input"
                              />
                              Student
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="patient_type"
                                value="staff"
                                className="form-check-input"
                              />
                              Staff
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="patient_type" 
                                value="out-patient"
                                className="form-check-input"
                              />
                              Out-Patient
                              {touched.patient_type && errors.patient_type && (
                                <div className="text-danger">
                                  {" "}
                                  {errors.patient_type}
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>

                      {values.patient_type === "student" && (
                        <div className="col-sm-6">
                          <div class="form-group row">
                            <label class="col-form-label col-md-2">
                              Course of study
                            </label>
                            <div class="col-md-10">
                              <Field as="select" name="course_of_studies" class="form-control">
                                <option>-- Course --</option>
                                <option value="Computer Science">
                                  Computer Science
                                </option>
                                <option value="Computer Engineering">
                                  Computer Engineering
                                </option>
                              </Field>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="col-sm-6">
                        <div className="form-group gender-select">
                          <label className="gen-label">
                            National Health Insurance:{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="insurance"
                                value="yes"
                                className="form-check-input"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="">
                            <div></div>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="insurance"
                                value="no"
                                className="form-check-input"
                              />
                              No
                              {touched.insurance && errors.insurance && (
                                <div className="text-danger">
                                  {" "}
                                  {errors.insurance}
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                      {values.insurance === "yes" && (
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>
                              Health Insurance Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control-custom"
                              name="insurance_number"
                              type="text"
                            />
                            {touched.insurance_number &&
                              errors.insurance_number && (
                                <div className="text-danger">
                                  {" "}
                                  {errors.insurance_number}
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                      <div className="col-sm-12">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>
                                Address <span className="text-danger">*</span>
                              </label>
                              <Field
                                name="address"
                                type="text"
                                className="form-control "
                              />
                              {touched.address && errors.address && (
                                <div className="text-danger">
                                  {" "}
                                  {errors.address}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Phone <span className="text-danger">*</span>
                          </label>
                          <Field
                            name="phone"
                            className="form-control"
                            type="text"
                          />
                          {touched.phone && errors.phone && (
                            <div className="text-danger"> {errors.phone}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="m-t-20 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Create Patient
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <h3>List of All Patients</h3>
              <br />
              <table class="table table-bordered datatable" id="table-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Folder Number</th>
                    <th>Gender</th>
                    <th>Patient Type</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                    {patient.map((data,index) => (
                    <tr class="gradeU" key={index}>
                    <td>{data.first_name} {data.last_name}</td>
                    <td>{data.phone}</td>
                    <td>{data.patient_id}</td>
                    <td>{data.gender}</td>
                    <td>{data.patient_type}</td>
                    <td>{data.age}</td>
                   
                </tr>
                ))}
         
                </tbody>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Folder Number</th>
                    <th>Gender</th>
                    <th>Patient Type</th>
                    <th>Age</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientRecord;
