import { Link } from "react-router-dom";
// import "../assets/css/bootstrap.min.css";
// import "../assets/css/font-awesome.min.css";
// import "../assets/css/style.css";

import "./newStyle.css";

import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Form, Formik, useField, ErrorMessage, Field } from "formik";
import { use, useState } from "react";
import { toast } from "react-toastify"; 
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API_BASE_URL from "../config";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordV = (prev) => {
    setPasswordVisibility((prev) => !prev);
  };

  // const loginSubmit = async (values) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.post("http://localhost:8080/login",
  //       values
  //     );
  //     console.log("Login response:", data); // DEBUG

  //     // Properly extract user and token if data is flat
  //     const { token, ...user } = data;

  //     // Set in redux
  //     dispatch({ type: "LOGIN", payload: { user, token } });

  //     // Save in cookies
  //     Cookies.set("user", JSON.stringify(user));
  //     Cookies.set("token", token);

  //     toast.success("Login successful!");

  //     navigate("/");
  //   } catch (error) {
  //     setError(error.response?.data?.message || "Login failed");
  //     toast.error("Login failed, check your credentials and try again");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  console.log("API Base URL:", API_BASE_URL);


  const loginValidation = Yup.object().shape({
    username: Yup.string()
      .min(5, "username must be 8 characters at minimum")
      .required("Username is required")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allow"),
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required"),
  });

  return (
    <>
      {loading ? (
        <div className="account-loading">
          <DotLoader color="blue" size={100} />
        </div>
      ) : (
        <div className="main-wrapper account-wrapper">
          <div className="account-page">
            <div className="account-center">
              <div className="account-box">
                <Formik
                  enableReinitialize
                  initialValues={{ username: "", password: "" }}
                  validationSchema={loginValidation}
                  onSubmit={async (values) => {
                    // values = { username, password }
                    setLoading(true);
                    try {
                      const { data } = await axios.post(
                        `${API_BASE_URL}/login`,
                        values
                      );
                      console.log("Login response:", data);

                      // const { token, ...user } = data;

                      // dispatch({ type: "LOGIN", payload: { user, token } });

                      // Cookies.set("user", JSON.stringify(user));
                      // Cookies.set("token", token);

                      const { user, token } = data;

dispatch({ type: "LOGIN", payload: { user, token } });

Cookies.set("user", JSON.stringify(user), { sameSite: "None", secure: true });
Cookies.set("token", token, { sameSite: "None", secure: true });


                      toast.success("Login successful!");
                      navigate("/");
                    } catch (error) {
                      setError(error.response?.data?.message || "Login failed");
                      toast.error(
                        "Login failed, check your credentials and try again"
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="account-logo">
                        <img src="/img/logo-dark.png" alt="" />
                      </div>
                      <div className="form-group">
                        <label>Username </label>
                        <Field
                          type="text"
                          name="username"
                          autoFocus
                          className="form-control"
                        />
                        <div
                          className=""
                          style={{ minHeight: "20px", marginTop: "4px" }}
                        >
                          {touched.username && errors.username && (
                            <div className="text-danger">{errors.username}</div>
                          )}
                        </div>
                      </div>
                      <div
                        className="form-group"
                        style={{ position: "relative" }}
                      >
                        <label>Password</label>
                        <Field
                          type={passwordVisibility ? "text" : "password"}
                          name="password"
                          className="form-control"
                          style={{
                            paddingRight: "40px",
                          }}
                        />
                        <span
                          onClick={togglePasswordV}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          {passwordVisibility ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        <div style={{ minHeight: "20px", marginTop: "4px" }}>
                          {touched.password && errors.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}
                        </div>
                      </div>

                      <div className="form-group text-right">
                        <Link to="/forgot-password">Forgot your password?</Link>
                      </div>
                      <div className="form-group text-center">
                        <button
                          type="submit"
                          className="btn btn-primary account-btn"
                        >
                          Login
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
