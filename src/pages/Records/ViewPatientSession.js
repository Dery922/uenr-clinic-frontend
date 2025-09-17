import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";

import { FaSignInAlt } from "react-icons/fa";

import axios from "axios";

import {
  setActiveSessions,
  endSession,
  closeSession,
} from "../../redux/actions/sessionAction";

const ActiveSessionsTemplate = () => {
  const dispatch = useDispatch();
  const activeSession = useSelector((state) => state.session.activeSession);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await axios.get("http://localhost:8080/active/session");
      dispatch(setActiveSessions(res.data));
    };
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleClose = async (id) => {
    // Backend API call
    await axios.put(`http://localhost:8080/sessions/${id}/close`);

    // Update Redux
    dispatch(closeSession(id));
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <Sidebar />
        <div className="content">
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
                  {/* Header Section */}
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                      <i className="fas fa-user-md text-primary mr-2"></i>
                      Active Patient Sessions
                    </h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="fas fa-sync-alt mr-1"></i>
                        Refresh
                      </button>
                    </div>
                  </div>

                  {/* Active Sessions Table */}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="fas fa-procedures mr-2"></i>
                        Currently Active Sessions
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="thead-light">
                            <tr>
                              <th>Session ID</th>
                              <th>Patient</th>
                              <th>Doctor</th>
                              <th>Visit Type</th>
                              <th>Start Time</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Sample Session Data - Replace with actual data */}
                            {activeSession.map((session) => (
                              <tr>
                                <td>SES-1001</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="avatar-sm bg-primary rounded-circle text-white d-flex align-items-center justify-content-center mr-2">
                                      <span>{session.patient.first_name.slice(0,1) + session.patient.last_name.slice(0,1)}</span>
                                    </div>
                                    <div>
                                      <div>{session.patient.first_name + " " + session.patient.last_name}</div>
                                      <small className="text-muted">
                                        {session.patient_id}
                                      </small>
                                    </div>
                                  </div>
                                </td>
                                <td>Dr. {session.doctor.first_name}</td>
                                <td>
                                  <span className="badge badge-primary">
                                    {session.reasonForVisit}
                                  </span>
                                </td>
                                <td>Today, 10:30 AM</td>

                                <td>
                                  <span
                                    className={`${
                                      session.status === "open"
                                        ? "badge badge-success"
                                        : "badge badge-warning"
                                    }`}
                                  >
                                    {session.status === "closed"
                                      ? "discharge"
                                      : "in-progress"}
                                  </span>
                                </td>
             
                                {session.status === "closed" ? "":        <td>
                                    <button className="btn btn-warning btn-sm"
                                      onClick={() => handleClose(session._id)}
                                    >
                                      End Session
                                    </button>
                                  </td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <nav className="mt-3">
                        <ul className="pagination justify-content-center">
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

                  {/* Session Statistics Cards */}
                  <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                      <div className="card text-white bg-primary h-100">
                        <div className="card-body">
                          <h6 className="card-title">Active Sessions</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">12</h2>
                            <i className="fas fa-procedures fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                          <h6 className="card-title">Waiting Patients</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">5</h2>
                            <i className="fas fa-user-clock fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card text-white bg-success h-100">
                        <div className="card-body">
                          <h6 className="card-title">Completed Today</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">23</h2>
                            <i className="fas fa-check-circle fa-2x"></i>
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

export default ActiveSessionsTemplate;
