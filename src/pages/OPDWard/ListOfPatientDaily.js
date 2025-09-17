import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import getOPDRecordsDaily from "../../services/opdDailyService";
const ListOfPatientDaily = () => {
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
        <div className="content">
          <div className="row">
            <div className="container-fluid p-0">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Today Pending Patients List</h5>
                </div>

                <div className="card-body">
                  {/* Search and Filter Bar */}
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search records..."
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                          >
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <select className="form-control">
                        <option>Filter by record type</option>
                        <option>Consultations</option>
                        <option>Lab Results</option>
                        <option>Prescriptions</option>
                        <option>Imaging</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <Link
                        to="/add-patient-opdward"
                        className="btn btn-success float-right"
                      >
                        <i className="fa fa-plus mr-2"></i> Add New Record
                      </Link>
                    </div>
                  </div>

                  {/* Records Table */}
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th>Patient</th>
                          <th>Vitals</th>
                          <th>Measurements</th>
                          <th>Nurse</th>
                          <th>Created</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datar ? (
                          datar.map((d, index) => (
                            <tr key={d._id || index}>
                              {/* Patient Column */}
                              <td>
                                <div className="patient-info">
                                  <div className="font-weight-bold">
                                    {d.patient}
                                  </div>
                                  <small className="text-muted">
                                    ID: {d.patient_id || "N/A"}
                                  </small>
                                </div>
                              </td>

                              {/* Vitals Group */}
                              <td>
                                <div className="vitals-container">
                                  <div className="vital-item">
                                    <span className="vital-label">Temp:</span>
                                    <span className="vital-value">
                                      {d.temperature}°C
                                    </span>
                                  </div>
                                  <div className="vital-item">
                                    <span className="vital-label">Pulse:</span>
                                    <span className="vital-value">
                                      {d.pulse} bpm
                                    </span>
                                  </div>
                                  <div className="vital-item">
                                    <span className="vital-label">Resp:</span>
                                    <span className="vital-value">
                                      {d.respiratory_rate} rpm
                                    </span>
                                  </div>
                                  <div className="vital-item">
                                    <span className="vital-label">BP:</span>
                                    <span className="vital-value">
                                      {d.blood_pressure}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Measurements Group */}
                              <td>
                                <div className="measurements-container">
                                  <div className="measurement-item">
                                    <span className="measurement-label">
                                      Height:
                                    </span>
                                    <span className="measurement-value">
                                      {d.height} cm
                                    </span>
                                  </div>
                                  <div className="measurement-item">
                                    <span className="measurement-label">
                                      Weight:
                                    </span>
                                    <span className="measurement-value">
                                      {d.weight} kg
                                    </span>
                                  </div>
                                  {d.bmi && (
                                    <div className="measurement-item">
                                      <span className="measurement-label">
                                        BMI:
                                      </span>
                                      <span className="measurement-value">
                                        {d.bmi}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Nurse Column */}
                              <td>
                                <div className="nurse-info">
                                  <div className="font-weight-small">
                                    {d.username}
                                  </div>
                                  <small className="text-muted">Nurse</small>
                                </div>
                              </td>

                              {/* Timestamp Column */}
                              <td>
                                <div className="timestamp">
                                  <div className="date">
                                    {new Date(d.createdAt).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      }
                                    )}
                                  </div>
                                  <div className="time text-muted">
                                    {new Date(d.createdAt).toLocaleTimeString(
                                      "en-GB",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Status Column */}
                              <td>
                                <span
                                  className={`badge badge-${
                                    d.status === 0 ? "info" : "success"
                                  } status-badge`}
                                >
                                  {d.status === 0 ? "Pending" : "Completed"}
                                </span>
                              </td>

                              {/* Actions Column */}
                              <td>
                                <div className="action-buttons">
                                  <button
                                    className="btn btn-sm btn-outline-primary mr-1"
                                    title="View Details"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-secondary"
                                    title="Download Report"
                                  >
                                    <i className="fa fa-download"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="11" className="text-center py-4">
                              <div className="text-muted">
                                <i className="fa fa-clipboard-list fa-2x mb-2"></i>
                                <p>No active activities today</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Add this CSS to your styles */}

                  {/* Pagination */}
                  <nav aria-label="Records navigation">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfPatientDaily;
