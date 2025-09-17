import React, { useState, useEffect } from "react";
import { Tab, Tabs, Card, Table, Badge, Button } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const WardDashboard = () => {
  const [wards, setWards] = useState([]);
  const [activePatients, setActivePatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wardsRes, patientsRes] = await Promise.all([
          axios.get("/api/wards"),
          axios.get("/api/admissions/active"),
        ]);
        setWards(wardsRes.data);
        setActivePatients(patientsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getWardOccupancy = (wardId) => {
    const wardPatients = activePatients.filter((p) => p.ward === wardId);
    const ward = wards.find((w) => w._id === wardId);
    if (!ward) return { occupied: 0, total: 0 };
    return {
      occupied: wardPatients.length,
      total: ward.bedCount,
      percentage: Math.round((wardPatients.length / ward.bedCount) * 100),
    };
  };

  if (loading)
    return <div className="text-center py-5">Loading ward data...</div>;

  return (
    <div className="main-wrapper">
    <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4"
                >
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                      <i className="fas fa-procedures text-primary"></i>
                      Ward Management Dashboard
                    </h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="fas fa-print"></i> Print
                      </button>
                    </div>
                  </div>

                  <ul className="nav nav-tabs" id="wardTabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="overview-tab"
                        data-toggle="tab"
                        href="#overview"
                        role="tab"
                      >
                        <i className="fas fa-chart-pie mr-1"></i> Overview
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="patients-tab"
                        data-toggle="tab"
                        href="#patients"
                        role="tab"
                      >
                        <i className="fas fa-user-injured mr-1"></i> Admitted
                        Patients
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="wards-tab"
                        data-toggle="tab"
                        href="#wards"
                        role="tab"
                      >
                        <i className="fas fa-bed mr-1"></i> Ward Status
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="wards-tab"
                        data-toggle="tab"
                        href="#vitals"
                        role="tab"
                      >
                        <i className="fa fa-bed mr-1"></i> Check Patients Vitals
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content" id="wardTabsContent">
                    <div
                      className="tab-pane fade show active"
                      id="overview"
                      role="tabpanel"
                    >
                      <div className="row mt-4">
                        <div className="col-xl-3 col-md-6 mb-4">
                          <div className="card ward-card h-100">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-0">
                                  General Ward
                                </h5>
                                <span className="badge badge-info">
                                  12 Beds
                                </span>
                              </div>
                              <p className="text-muted mb-2">
                                Medicine Department
                              </p>
                              <div className="progress mb-2">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "75%" }}
                                >
                                  75%
                                </div>
                              </div>
                              <p className="mb-0">
                                <span className="font-weight-bold">9</span>{" "}
                                occupied,
                                <span className="font-weight-bold">3</span>{" "}
                                available
                              </p>
                            </div>
                            <div className="card-footer bg-transparent">
                              <a
                                href="#"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Ward
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                          <div className="card ward-card h-100">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-0">
                                  Pediatric Ward
                                </h5>
                                <span className="badge badge-info">8 Beds</span>
                              </div>
                              <p className="text-muted mb-2">
                                Pediatrics Department
                              </p>
                              <div className="progress mb-2">
                                <div
                                  className="progress-bar bg-warning"
                                  role="progressbar"
                                  style={{ width: "50%" }}
                                >
                                  50%
                                </div>
                              </div>
                              <p className="mb-0">
                                <span className="font-weight-bold">4</span>{" "}
                                occupied,
                                <span className="font-weight-bold">4</span>{" "}
                                available
                              </p>
                            </div>
                            <div className="card-footer bg-transparent">
                              <a
                                href="#"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Ward
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                          <div className="card ward-card h-100">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-0">
                                  Surgical Ward
                                </h5>
                                <span className="badge badge-info">
                                  10 Beds
                                </span>
                              </div>
                              <p className="text-muted mb-2">
                                Surgery Department
                              </p>
                              <div className="progress mb-2">
                                <div
                                  className="progress-bar bg-danger"
                                  role="progressbar"
                                  style={{ width: "90%" }}
                                >
                                  90%
                                </div>
                              </div>
                              <p className="mb-0">
                                <span className="font-weight-bold">9</span>{" "}
                                occupied,
                                <span className="font-weight-bold">1</span>{" "}
                                available
                              </p>
                            </div>
                            <div className="card-footer bg-transparent">
                              <a
                                href="#"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Ward
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                          <div className="card ward-card h-100">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-0">ICU</h5>
                                <span className="badge badge-info">6 Beds</span>
                              </div>
                              <p className="text-muted mb-2">Critical Care</p>
                              <div className="progress mb-2">
                                <div
                                  className="progress-bar bg-info"
                                  role="progressbar"
                                  style={{ width: "66%" }}
                                >
                                  66%
                                </div>
                              </div>
                              <p className="mb-0">
                                <span className="font-weight-bold">4</span>{" "}
                                occupied,
                                <span className="font-weight-bold">2</span>{" "}
                                available
                              </p>
                            </div>
                            <div className="card-footer bg-transparent">
                              <a
                                href="#"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Ward
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mb-4">
                        <div className="card-header">
                          <h5 className="mb-0">
                            <i className="fas fa-history mr-2"></i>
                            Recent Admissions
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Patient</th>
                                  <th>Admitted To</th>
                                  <th>Date</th>
                                  <th>Doctor</th>
                                  <th>Priority</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <img
                                      src="https://via.placeholder.com/30"
                                      className="patient-avatar mr-2"
                                      alt="Patient"
                                    />
                                    John Doe
                                  </td>
                                  <td>General Ward - Bed 5</td>
                                  <td>2023-11-15</td>
                                  <td>Dr. Smith</td>
                                  <td>
                                    <span className="badge badge-priority badge-warning">
                                      High
                                    </span>
                                  </td>
                                  <td>
                                    <button className="btn btn-sm btn-outline-primary">
                                      <i className="fas fa-eye"></i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img
                                      src="https://via.placeholder.com/30"
                                      className="patient-avatar mr-2"
                                      alt="Patient"
                                    />
                                    Jane Smith
                                  </td>
                                  <td>Surgical Ward - Bed 3</td>
                                  <td>2023-11-14</td>
                                  <td>Dr. Johnson</td>
                                  <td>
                                    <span className="badge badge-priority badge-danger">
                                      Emergency
                                    </span>
                                  </td>
                                  <td>
                                    <button className="btn btn-sm btn-outline-primary">
                                      <i className="fas fa-eye"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="patients"
                      role="tabpanel"
                    >
                      <div className="card mt-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">
                            <i className="fas fa-user-injured mr-2"></i>
                            Currently Admitted Patients
                          </h5>
                          <div>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Search patients..."
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  type="button"
                                >
                                  <i className="fas fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead className="thead-light">
                                <tr>
                                  <th>Patient ID</th>
                                  <th>Name</th>
                                  <th>Ward/Bed</th>
                                  <th>Admission Date</th>
                                  <th>Diagnosis</th>
                                  <th>Doctor</th>
                                  <th>Priority</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>PT1001</td>
                                  <td>
                                    <img
                                      src="https://via.placeholder.com/30"
                                      className="patient-avatar mr-2"
                                      alt="Patient"
                                    />
                                    John Doe
                                  </td>
                                  <td>General Ward - Bed 5</td>
                                  <td>2023-11-15</td>
                                  <td>Pneumonia</td>
                                  <td>Dr. Smith</td>
                                  <td>
                                    <span className="badge badge-priority badge-warning">
                                      High
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-sm btn-info mr-1"
                                      title="View"
                                    >
                                      <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-primary"
                                      title="Medical Chart"
                                    >
                                      <i className="fas fa-file-medical"></i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>PT1002</td>
                                  <td>
                                    <img
                                      src="https://via.placeholder.com/30"
                                      className="patient-avatar mr-2"
                                      alt="Patient"
                                    />
                                    Jane Smith
                                  </td>
                                  <td>Surgical Ward - Bed 3</td>
                                  <td>2023-11-14</td>
                                  <td>Appendectomy</td>
                                  <td>Dr. Johnson</td>
                                  <td>
                                    <span className="badge badge-priority badge-danger">
                                      Emergency
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-sm btn-info mr-1"
                                      title="View"
                                    >
                                      <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-primary"
                                      title="Medical Chart"
                                    >
                                      <i className="fas fa-file-medical"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mt-3">
                              <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1">
                                  Previous
                                </a>
                              </li>
                              <li className="page-item active">
                                <a className="page-link" href="#">
                                  1
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  2
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  3
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  Next
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="wards" role="tabpanel">
                      <div className="card mt-4">
                        <div className="card-header">
                          <h5 className="mb-0">
                            <i className="fas fa-bed mr-2"></i>
                            Ward Status Overview
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead className="thead-dark">
                                <tr>
                                  <th>Ward Name</th>
                                  <th>Department</th>
                                  <th>Total Beds</th>
                                  <th>Occupied</th>
                                  <th>Available</th>
                                  <th>Occupancy Rate</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>General Ward</td>
                                  <td>Medicine</td>
                                  <td>12</td>
                                  <td>9</td>
                                  <td>3</td>
                                  <td>
                                    <div
                                      className="progress"
                                      style={{ height: "20px" }}
                                    >
                                      <div
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        style={{ width: "75%" }}
                                      >
                                        75%
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-success">
                                      Normal
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Pediatric Ward</td>
                                  <td>Pediatrics</td>
                                  <td>8</td>
                                  <td>4</td>
                                  <td>4</td>
                                  <td>
                                    <div
                                      className="progress"
                                      style={{ height: "20px" }}
                                    >
                                      <div
                                        className="progress-bar bg-warning"
                                        role="progressbar"
                                        style={{ width: "50%" }}
                                      >
                                        50%
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-success">
                                      Normal
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Surgical Ward</td>
                                  <td>Surgery</td>
                                  <td>10</td>
                                  <td>9</td>
                                  <td>1</td>
                                  <td>
                                    <div
                                      className="progress"
                                      style={{ height: "20px" }}
                                    >
                                      <div
                                        className="progress-bar bg-danger"
                                        role="progressbar"
                                        style={{ width: "90%" }}
                                      >
                                        90%
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-danger">
                                      Full
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="tab-pane fade" id="vitals" role="tabpanel">
                      <div className="card mt-4">
                        <div className="card-header">
                          <h5 className="mb-0">
                            <i className="fas fa-bed mr-2"></i>
                            Ward Status Overview
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead className="thead-dark">
                                <tr>
                                  <th>Ward Name</th>
                                  <th>Department</th>
                                  <th>Total Beds</th>
                                  <th>Occupied</th>
                                  <th>Available</th>
                                  <th>Occupancy Rate</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>General Ward</td>
                                  <td>Medicine</td>
                                  <td>12</td>
                                  <td>9</td>
                                  <td>3</td>
                                  <td>
                                    <div
                                      className="progress"
                                      style={{ height: "20px" }}
                                    >
                                      <div
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        style={{ width: "75%" }}
                                      >
                                        75%
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-success">
                                      Normal
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Pediatric Ward</td>
                                  <td>Pediatrics</td>
                                  <td>8</td>
                                  <td>4</td>
                                  <td>4</td>
                                  <td>
                                    <div
                                      className="progress"
                                      style={{ height: "20px" }}
                                    >
                                      <div
                                        className="progress-bar bg-warning"
                                        role="progressbar"
                                        style={{ width: "50%" }}
                                      >
                                        50%
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-success">
                                      Normal
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Surgical Ward</td>
                                  <td>Surgery</td>
                                  <td>10</td>
                                  <td>9</td>
                                  <td>1</td>
                                  <td>
                                    <div
                                      className="progress"
                                      style={{ height: "20px" }}
                                    >
                                      <div
                                        className="progress-bar bg-danger"
                                        role="progressbar"
                                        style={{ width: "90%" }}
                                      >
                                        90%
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge badge-danger">
                                      Full
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardDashboard;
