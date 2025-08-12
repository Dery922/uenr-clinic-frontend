import { Line } from "react-bootstrap-icons";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

const Administrator = () => {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
      
              {/* Top Navigation */}
         

              <div className="row">
                {/* Sidebar */}
                <div className="">
                  <div className="">
                    {/* <div className="admin-info text-center p-3 mb-3 border-bottom">
                      <i className="fas fa-user-shield fa-3x mb-2 text-primary"></i>
                      <h6 className="mb-1">Administrator</h6>
                      <p className="text-muted small">
                        Last login: Today, 09:42 AM
                      </p>
                    </div> */}
                     <Sidebar />
                    {/* <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link active" href="#">
                          <i className="fas fa-tachometer-alt mr-2"></i>
                          Dashboard
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-users mr-2"></i>
                          Staff Management
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-procedures mr-2"></i>
                          Patient Records
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-calendar-alt mr-2"></i>
                          Appointments
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-prescription-bottle-alt mr-2"></i>
                          Pharmacy
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-flask mr-2"></i>
                          Lab Tests
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-file-invoice-dollar mr-2"></i>
                          Billing
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-chart-line mr-2"></i>
                          Reports
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-cogs mr-2"></i>
                          System Settings
                        </a>
                      </li>
                    </ul> */}
                  </div>
                </div>

                {/* Main Content */}
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content"
                >
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Admin Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <div className="btn-group mr-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="fas fa-download mr-1"></i> Export
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="fas fa-print mr-1"></i> Print
                        </button>
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          <i className="fas fa-calendar mr-1"></i> This Week
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                          <a className="dropdown-item" href="#">
                            This Week
                          </a>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="card-title">Total Patients</h6>
                              <h2 className="mb-0">1,248</h2>
                            </div>
                            <i className="fas fa-procedures fa-2x"></i>
                          </div>
                          <p className="card-text small mt-2">
                            <i className="fas fa-arrow-up mr-1"></i> 12% from
                            last month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="card-title">
                                Today's Appointments
                              </h6>
                              <h2 className="mb-0">47</h2>
                            </div>
                            <i className="fas fa-calendar-check fa-2x"></i>
                          </div>
                          <p className="card-text small mt-2">
                            <i className="fas fa-arrow-up mr-1"></i> 3 more than
                            yesterday
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="card-title">
                                Pending Prescriptions
                              </h6>
                              <h2 className="mb-0">18</h2>
                            </div>
                            <i className="fas fa-prescription-bottle-alt fa-2x"></i>
                          </div>
                          <p className="card-text small mt-2">
                            <i className="fas fa-arrow-down mr-1"></i> 5 less
                            than yesterday
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card text-white bg-danger mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="card-title">Revenue This Month</h6>
                              <h2 className="mb-0">$28,745</h2>
                            </div>
                            <i className="fas fa-dollar-sign fa-2x"></i>
                          </div>
                          <p className="card-text small mt-2">
                            <i className="fas fa-arrow-up mr-1"></i> 8% from
                            last month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Recent Activity */}
                    <div className="col-md-6">
                      <div className="card mb-4">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Recent Activity</h5>
                          <button className="btn btn-sm btn-outline-secondary">
                            View All
                          </button>
                        </div>
                        <div className="card-body p-0">
                          <div className="list-group list-group-flush">
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <div>
                                  <i className="fas fa-user-plus text-success mr-2"></i>
                                  <strong>New patient</strong> registered: Sarah
                                  Johnson
                                </div>
                                <small className="text-muted">
                                  10 mins ago
                                </small>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <div>
                                  <i className="fas fa-prescription text-primary mr-2"></i>
                                  <strong>Prescription</strong> approved for
                                  Michael Brown
                                </div>
                                <small className="text-muted">
                                  25 mins ago
                                </small>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <div>
                                  <i className="fas fa-vial text-info mr-2"></i>
                                  <strong>Lab results</strong> uploaded for
                                  patient #10042
                                </div>
                                <small className="text-muted">1 hour ago</small>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <div>
                                  <i className="fas fa-credit-card text-warning mr-2"></i>
                                  <strong>Payment</strong> received from John
                                  Smith ($85.00)
                                </div>
                                <small className="text-muted">
                                  2 hours ago
                                </small>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <div>
                                  <i className="fas fa-calendar-times text-danger mr-2"></i>
                                  <strong>Appointment</strong> canceled by
                                  Robert Wilson
                                </div>
                                <small className="text-muted">
                                  3 hours ago
                                </small>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="col-md-6">
                      <div className="card mb-4">
                        <div className="card-header bg-white">
                          <h5 className="mb-0">Quick Actions</h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <Link to="/add-patient-record">
                              <button className="btn btn-outline-primary btn-block py-3">
                                <i className="fas fa-user-plus fa-2x mb-2"></i>
                                <br />
                                Add New Patient
                              </button>
                              </Link>
                            </div>
                            <div className="col-md-6 mb-3">
                              <Link to="/add/appointment">
                              <button className="btn btn-outline-success btn-block py-3">
                                <i className="fas fa-calendar-plus fa-2x mb-2"></i>
                                <br />
                                Schedule Appointment
                              </button>
                              </Link>
                            </div>
                            <div className="col-md-6 mb-3">
                              <button className="btn btn-outline-info btn-block py-3">
                                <i className="fas fa-file-invoice-dollar fa-2x mb-2"></i>
                                <br />
                                Generate Invoice
                              </button>
                            </div>
                            <div className="col-md-6 mb-3">
                              <Link to="/admin-view-report" className="btn btn-outline-warning btn-block py-3">
                                <i className="fas fa-chart-pie fa-2x mb-2"></i>
                                <br />
                                View Reports
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Appointments */}
                  <div className="card mb-4">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Today's Appointments</h5>
                      <button className="btn btn-sm btn-outline-secondary">
                        View All
                      </button>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Time</th>
                              <th scope="col">Patient</th>
                              <th scope="col">Doctor</th>
                              <th scope="col">Purpose</th>
                              <th scope="col">Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>09:00 AM</td>
                              <td>John Smith</td>
                              <td>Dr. Johnson</td>
                              <td>Follow-up</td>
                              <td>
                                <span className="badge badge-success">
                                  Completed
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-eye"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>10:30 AM</td>
                              <td>Sarah Wilson</td>
                              <td>Dr. Chen</td>
                              <td>Annual Checkup</td>
                              <td>
                                <span className="badge badge-success">
                                  Completed
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-eye"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>11:45 AM</td>
                              <td>Michael Brown</td>
                              <td>Dr. Johnson</td>
                              <td>Vaccination</td>
                              <td>
                                <span className="badge badge-info">
                                  In Progress
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-eye"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>02:15 PM</td>
                              <td>Emily Davis</td>
                              <td>Dr. Wilson</td>
                              <td>Consultation</td>
                              <td>
                                <span className="badge badge-warning">
                                  Pending
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-eye"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>03:30 PM</td>
                              <td>Robert Johnson</td>
                              <td>Dr. Chen</td>
                              <td>Lab Results</td>
                              <td>
                                <span className="badge badge-warning">
                                  Pending
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

                  {/* System Alerts */}
                  <div className="card">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">System Alerts</h5>
                      <button className="btn btn-sm btn-outline-secondary">
                        Dismiss All
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="alert alert-warning d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle fa-2x mr-3"></i>
                        <div>
                          <h6 className="alert-heading">Backup Required</h6>
                          <p className="mb-0">
                            System backup hasn't been performed in 6 days.
                            Recommended to perform backup today.
                          </p>
                        </div>
                      </div>
                      <div className="alert alert-info d-flex align-items-center">
                        <i className="fas fa-database fa-2x mr-3"></i>
                        <div>
                          <h6 className="alert-heading">Storage Warning</h6>
                          <p className="mb-0">
                            Database storage is at 85% capacity. Consider
                            archiving old records.
                          </p>
                        </div>
                      </div>
                      <div className="alert alert-light d-flex align-items-center">
                        <i className="fas fa-sync-alt fa-2x mr-3"></i>
                        <div>
                          <h6 className="alert-heading">
                            System Update Available
                          </h6>
                          <p className="mb-0">
                            New version v2.3.1 is available. Update can be
                            scheduled during off-hours.
                          </p>
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
    
  );
};

export default Administrator;
