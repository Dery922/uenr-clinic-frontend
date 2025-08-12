import Sidebar from "../../components/Sidebar";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [confirmpasswordVisibility, setConfirmPasswordVisibility] = useState(false)



  const togglePasswordV = (prev) => {
    setPasswordVisibility((prev) => !prev);
  };

  const togglePasswordC = (prev) => {
    setConfirmPasswordVisibility((prev) => !prev);
  };

  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
    role: "",
    profile_picture: null,
    department: "",
    specialization: "",
    license_number: "",
    joining_date: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First name is required")
      .trim()
      .min(3, "Minimum 3 characters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed"),
    last_name: Yup.string()
      .trim()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed")
      .required("Last name is required")
      .min(3, "Minimum 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    username: Yup.string()
      .required("Username is required")
      .min(4, "Minimum 4 characters")
      .matches(/^\S*$/, "No spaces allowed"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Only numbers allowed")
      .min(10, "Minimum 10 digits"),
    address: Yup.string().required("Address is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Minimum 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain uppercase, lowercase, number and special character"
      ),
    confirm_password: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    // department: Yup.string().when("role", {
    //   is: (role) => ["Doctor", "Nurse", "Laboratorist"].includes(role),
    //   then: Yup.string().required("Department is required"),
    // }),
    // specialization: Yup.string().when("role", {
    //   is: "Doctor",
    //   then: Yup.string().required("Specialization is required"),
    // }),
    // license_number: Yup.string().when("role", {
    //   is: (role) => ["Doctor", "Nurse", "Pharmacist"].includes(role),
    //   then: Yup.string().required("License number is required"),
    // }),
    // joining_date: Yup.date().when("role", {
    //   is: (role) => role !== "Admin",
    //   then: Yup.date()
    //     .required("Joining date is required")
    //     .max(new Date(), "Joining date cannot be in future"),
    // }),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("profile_picture", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const registerUser = async (values, { resetForm }) => {
    setLoading(true);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (values[key] !== null && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    });

    try {
      await axios.post("http://localhost:8080/createUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Employee added successfully!");
      resetForm();
      setPreviewImage(null);
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed to create employee. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Doctor", label: "Doctor" },
    { value: "Nurse", label: "Nurse" },
    { value: "Laboratorist", label: "Laboratorist" },
    { value: "Pharmacist", label: "Pharmacist" },
    { value: "Record", label: "Record Officer" },
    { value: "Accountant", label: "Accountant" },
    { value: "Receptionist", label: "Receptionist" },
  ];

  const departmentOptions = [
    { value: "Cardiology", label: "Cardiology" },
    { value: "Neurology", label: "Neurology" },
    { value: "Pediatrics", label: "Pediatrics" },
    { value: "Orthopedics", label: "Orthopedics" },
    { value: "Radiology", label: "Radiology" },
    { value: "Laboratory", label: "Laboratory" },
    { value: "Pharmacy", label: "Pharmacy" },
  ];

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h4 className="page-title">Add Employee</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={registerUser}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form>
                    <div className="row">
                      {/* Personal Information Section */}
                      <div className="col-12">
                        <div className="card mb-3">
                          <div className="card-header bg-light">
                            <h5 className="card-title">Personal Information</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    First Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="first_name"
                                    className={`form-control ${
                                      touched.first_name && errors.first_name
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {touched.first_name && errors.first_name && (
                                    <div className="invalid-feedback">
                                      {errors.first_name}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Last Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="last_name"
                                    className={`form-control ${
                                      touched.last_name && errors.last_name
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {touched.last_name && errors.last_name && (
                                    <div className="invalid-feedback">
                                      {errors.last_name}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Username{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="username"
                                    className={`form-control ${
                                      touched.username && errors.username
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {touched.username && errors.username && (
                                    <div className="invalid-feedback">
                                      {errors.username}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Email <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="email"
                                    type="email"
                                    className={`form-control ${
                                      touched.email && errors.email
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {touched.email && errors.email && (
                                    <div className="invalid-feedback">
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Phone <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="phone"
                                    className={`form-control ${
                                      touched.phone && errors.phone
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {touched.phone && errors.phone && (
                                    <div className="invalid-feedback">
                                      {errors.phone}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Address{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="address"
                                    className={`form-control ${
                                      touched.address && errors.address
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {touched.address && errors.address && (
                                    <div className="invalid-feedback">
                                      {errors.address}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Profile Picture</label>
                                  <div className="profile-upload">
                                    <div className="upload-img">
                                      <img
                                        alt="Preview"
                                        src={
                                          previewImage || "assets/img/user.jpg"
                                        }
                                      />
                                    </div>
                                    <div className="upload-input">
                                      <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) =>
                                          handleImageChange(e, setFieldValue)
                                        }
                                        accept="image/*"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Account Information Section */}
                      <div className="col-12">
                        <div className="card mb-3">
                          <div className="card-header bg-light">
                            <h5 className="card-title">Account Information</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Role <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    as="select"
                                    name="role"
                                    className={`form-control ${
                                      touched.role && errors.role
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  >
                                    <option value="">Select Role</option>
                                    {roleOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </Field>
                                  {touched.role && errors.role && (
                                    <div className="invalid-feedback">
                                      {errors.role}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {["Doctor", "Nurse", "Laboratorist"].includes(
                                values.role
                              ) && (
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      Department{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      as="select"
                                      name="department"
                                      className={`form-control ${
                                        touched.department && errors.department
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    >
                                      <option value="">
                                        Select Department
                                      </option>
                                      {departmentOptions.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      ))}
                                    </Field>
                                    {touched.department &&
                                      errors.department && (
                                        <div className="invalid-feedback">
                                          {errors.department}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )}
                              {values.role === "Doctor" && (
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      Specialization{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      name="specialization"
                                      className={`form-control ${
                                        touched.specialization &&
                                        errors.specialization
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                    {touched.specialization &&
                                      errors.specialization && (
                                        <div className="invalid-feedback">
                                          {errors.specialization}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )}
                              {["Doctor", "Nurse", "Pharmacist"].includes(
                                values.role
                              ) && (
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      License Number{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      name="license_number"
                                      className={`form-control ${
                                        touched.license_number &&
                                        errors.license_number
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                    {touched.license_number &&
                                      errors.license_number && (
                                        <div className="invalid-feedback">
                                          {errors.license_number}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )}
                              {values.role !== "Admin" && (
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      Joining Date{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      name="joining_date"
                                      type="date"
                                      className={`form-control ${
                                        touched.joining_date &&
                                        errors.joining_date
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />

                                   
                                    {touched.joining_date &&
                                      errors.joining_date && (
                                        <div className="invalid-feedback" >
                                          {errors.joining_date}
                                        </div>
                                      )}
                                    
                                  </div>
                                </div>
                              )}
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Password{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="password"
                                    type={passwordVisibility ? "text" : "password"}
                                    className={`form-control ${
                                      touched.password && errors.password
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                    <span
                                    onClick={togglePasswordV}
                                    style={{
                                      position: "absolute",
                                      top: "45%",
                                      right: "45px",
                                      transform: "translateY(-50%)",
                                      cursor: "pointer",
                                      zIndex: 2,
                                    }}
                                  >
                                    {passwordVisibility ? (
                                      <FaEyeSlash />
                                    ) : (
                                      <FaEye />
                                    )}
                                  </span>
                                  <div className="" style={{ minHeight: "20px", marginTop: "4px" }}>
                                  {touched.password && errors.password && (
                                    <div className="invalid-feedback" style={{ minHeight: "20px", marginTop: "4px" }}>
                                  
                                      {errors.password}
                                    </div>
                                  )}
                                  </div>


                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>
                                    Confirm Password{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="confirm_password"
                                    type={confirmpasswordVisibility ? "text" : "password"}
                                    className={`form-control ${
                                      touched.confirm_password &&
                                      errors.confirm_password
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  <span
                                    onClick={togglePasswordC}
                                    style={{
                                      position: "absolute",
                                      top: "45%",
                                      right: "45px",
                                      transform: "translateY(-50%)",
                                      cursor: "pointer",
                                      zIndex: 2,
                                    }}
                                  >
                                    {confirmpasswordVisibility ? (
                                      <FaEyeSlash />
                                    ) : (
                                      <FaEye />
                                    )}
                                  </span>
                                  <div className="" style={{ minHeight: "20px", marginTop: "4px" }}>
                                  {touched.confirm_password &&
                                    errors.confirm_password && (
                                      <div className="invalid-feedback">
                                        {errors.confirm_password}
                                      </div>
                                    )}
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>{" "}
                              Processing...
                            </>
                          ) : (
                            "Create Employee"
                          )}
                        </button>
                      </div>
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

export default AddEmployee;
