import React from "react";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import getOPDRecordsDaily from "../../services/opdDailyService";
import { Link } from "react-router-dom";
import "./styles.css";

const OPDSession = () => {
  const [datar, setDatar] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(datar);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getOPDRecordsDaily();
        setDatar(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Patient Vitals Records</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">OPD Vitals</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}

          {/* Search Filter */}
          <div className="card filter-card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Date Range</label>
                    <div className="cal-icon">
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Patient ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Patient ID"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Status</label>
                    <select className="form-control select">
                      <option>All</option>
                      <option>Normal</option>
                      <option>Abnormal</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-right">
                  <button type="button" className="btn btn-primary mr-2">
                    <i className="fas fa-search"></i> Search
                  </button>
                  <button type="button" className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /Search Filter */}

          {/* Patient Vitals Table */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">OPD Vitals Records</h4>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-center mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>#</th>
                          <th>Patient</th>
                          <th>Vitals</th>
                          <th>Measurements</th>
                          <th>BP Status</th>
                          <th>Recorded By</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datar && datar.length > 0 ? (
                          datar.map((data, index) => (
                           
                            <tr key={data.patient_id || index}>
                              <td>{index + 1}</td>

                              {/* Patient Column - Consolidated */}
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    className="avatar-img rounded-circle mr-3"
                                    src="/img/user.jpg"
                                    alt={data.patient_name}
                                    width="40"
                                    height="40"
                                  />
                                  <div>
                                    <div className="font-weight-600">
                                      {data.patient_name}
                                    </div>
                                    <small className="text-muted">
                                      ID: {data.patient} | {data.patient_age}y |{" "}
                                      {data.patient_gender}
                                    </small>
                                  </div>
                                </div>
                              </td>

                              {/* Vitals Column - Grouped for quick assessment */}
                              <td>
                                <div className="vitals-display">
                                  <div className="vital-item">
                                    <span className="vital-label">BP:</span>
                                    <span className="vital-value">
                                      {data.bp || "N/A"} mmHg
                                    </span>
                                  </div>
                                  <div className="vital-item">
                                    <span className="vital-label">Temp:</span>
                                    <span className="vital-value">
                                      {data.temperature || "N/A"}°F
                                    </span>
                                  </div>
                                  <div className="vital-item">
                                    <span className="vital-label">Pulse:</span>
                                    <span
                                      className={`vital-value ${
                                        data.pulse > 100
                                          ? "text-warning"
                                          : data.pulse < 60
                                          ? "text-info"
                                          : ""
                                      }`}
                                    >
                                      {data.pulse || "N/A"} bpm
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Measurements Column */}
                              <td>
                                <div className="measurements-display">
                                  <div className="measure-item">
                                    <span className="measure-label">Wt:</span>
                                    <span className="measure-value">
                                      {data.weight || "N/A"} kg
                                    </span>
                                  </div>
                                  <div className="measure-item">
                                    <span className="measure-label">Ht:</span>
                                    <span className="measure-value">
                                      {data.height || "N/A"} cm
                                    </span>
                                  </div>
                                  {data.bmi && (
                                    <div className="measure-item">
                                      <span className="measure-label">
                                        BMI:
                                      </span>
                                      <span className="measure-value">
                                        {data.bmi}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Blood Pressure Status with Visual Indicators */}
                              <td>
                                <span
                                  className={`badge badge-pill bp-status ${
                                    data.blood_pressure === "Normal"
                                      ? "badge-success"
                                      : data.blood_pressure === "Low"
                                      ? "badge-warning"
                                      : data.blood_pressure === "High"
                                      ? "badge-danger"
                                      : "badge-secondary"
                                  }`}
                                >
                                  <i
                                    className={`fas ${
                                      data.blood_pressure === "Normal"
                                        ? "fa fa-check-circle"
                                        : data.blood_pressure === "Low"
                                        ? "fa fa-arrow-down" // Simple arrow down
                                        : data.blood_pressure === "High"
                                        ? "fa fa-arrow-up" // Simple arrow up
                                        : "fa-question"
                                    } mr-1`}
                                  ></i>
                                  {data.blood_pressure || "Not Recorded"}
                                </span>
                              </td>

                              {/* Recorded By Column */}
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    className="avatar-img rounded-circle mr-2"
                                    src="/img/user.jpg"
                                    alt={data.username}
                                    width="32"
                                    height="32"
                                  />
                                  <div>
                                    <div className="text-sm">
                                      Nurse {data.username}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Date Column */}
                              <td>
                                <div className="text-nowrap">
                                  <div className="font-weight-500">
                                    {new Date(
                                      data.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                  <small className="text-muted">
                                    {new Date(
                                      data.createdAt
                                    ).toLocaleTimeString()}
                                  </small>
                                </div>
                              </td>

                              {/* Actions Column */}
                              <td>
                                <div className="actions">
                                  <Link
                                    to={`/opd-session-view/${data._id}`}
                                    className="btn btn-sm bg-success-light mr-2"
                                    title="View Full Details"
                                  >
                                    <i className="fa fa-eye"></i> View
                                  </Link>
                                  <button
                                    className="btn btn-sm bg-primary-light"
                                    onClick={() => window.print()}
                                    title="Print Record"
                                  >
                                    <i className="fa fa-print"></i> Print
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center py-4">
                              <div className="text-muted">
                                <i className="fas fa-clipboard-list fa-2x mb-2"></i>
                                <br />
                                No active sessions today
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Patient Vitals Table */}

          {/* Pagination */}
          <div className="row">
            <div className="col-md-12">
              <div className="float-right">
                <ul className="pagination">
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
              </div>
            </div>
          </div>
          {/* /Pagination */}
        </div>
      </div>
    </div>
  );
};

export default OPDSession;
