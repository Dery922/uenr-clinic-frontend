import React from "react";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import getOPDRecordsDaily from "../../services/opdDailyService";
import { Link } from "react-router-dom";

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
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Patient ID</th>
                          <th>Patient Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>BP (mmHg)</th>
                          <th>Temp (°F)</th>
                          <th>Pulse (bpm)</th>
                          <th>Weight (kg)</th>
                          <th>Height (cm)</th>
                          <th>Recorded By</th>
                          <th>Date</th>
                          <th>Blood Pressure</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datar
                          ? datar.map((data) => (
                              <tr>
                                <td>1</td>
                                <td>{data.patient_id}</td>
                                <td>
                                  <h2 className="table-avatar">
                                    <a
                                      href="patient-profile.html"
                                      className="avatar avatar-sm mr-2"
                                    >
                                      <img
                                        className="avatar-img rounded-circle"
                                        src="/assets/img/patients/patient1.jpg"
                                        alt="User"
                                      />
                                    </a>
                                    <a href="patient-profile.html">
                                      {data.patient_name}
                                    </a>
                                  </h2>
                                </td>
                                <td>{data.patient_age}</td>
                                <td>{data.patient_gender}</td>
                                <td>{data.bp}</td>
                                <td>{data.temperature}</td>
                                <td>{data.pulse}</td>
                                <td>{data.weight}</td>
                                <td>{data.height}</td>

                          
                                <td>
                                  <h2 className="table-avatar">
                                    <a
                                      href="profile.html"
                                      className="avatar avatar-sm mr-2"
                                    >
                                      <img
                                        className="avatar-img rounded-circle"
                                        src="/assets/img/nurses/nurse1.jpg"
                                        alt="User"
                                      />
                                    </a>
                                    <a href="profile.html">
                                      Nurse {data.username}
                                    </a>
                                  </h2>
                                </td>
                                <td>{data.createdAt}</td>

                                <td>
                                  <span
                                    className={`badge badge-pill ${
                                      data.blood_pressure === "Normal"
                                        ? "badge-success"
                                        : "" || data.blood_pressure === "Low"
                                        ? "badge-warning"
                                        : " " || data.blood_pressure === "High"
                                        ? "badge-danger"
                                        : ""
                                    }`}
                                  >
                                    {data.blood_pressure}
                                  </span>
                                </td>
                                <td>
                                  <div className="actions">
                                    <Link
                                      to={`/opd-session-view/${data.patient_id}`}
                                      className="btn btn-sm bg-success-light mr-2"
                                    >
                                      <i className="fas fa-eye"></i> View
                                    </Link>
                                    <a
                                      href="#"
                                      className="btn btn-sm bg-primary-light"
                                    >
                                      <i className="fas fa-print"></i> Print
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : "No active session today"}
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
