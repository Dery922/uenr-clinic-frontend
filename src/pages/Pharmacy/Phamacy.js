import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import patientService from "../../services/patientService";
import patientPrescription from "../../services/patientPrescription";
import { Link } from "react-router-dom";

const Pharmacy = () => {
  const [pat, setPat] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await patientPrescription();
        setPat(res);
        console.log(pat);
      } catch (error) {
        console.log(error);
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
            <div className="container-fluid pharmacy-page">
              <div className="row">
                {/* Main Content */}
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content"
                >
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Pharmacy Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <div className="btn-group mr-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="fas fa-file-export mr-1"></i> Export
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="fas fa-print mr-1"></i> Print
                        </button>
                      </div>
                      <button type="button" className="btn btn-sm btn-primary">
                        <i className="fas fa-plus mr-1"></i> New Prescription
                      </button>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="row mb-4">
                    <div className="col-md-8">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search medications or prescriptions..."
                          aria-label="Search"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                          >
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-0">
                        <select className="form-control">
                          <option>Filter by Status</option>
                          <option>Pending</option>
                          <option>Approved</option>
                          <option>Ready for Pickup</option>
                          <option>Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Current Prescriptions */}
                  <div className="card mb-4">
                    <div className="card-header bg-white">
                      <h5 className="mb-0">Current Prescriptions</h5>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Patient ID</th>
                              <th scope="col">Patient Name</th>
                              <th scope="col">Medications</th>
                              <th scope="col">Tests</th>
                              <th scope="col">Date</th>
                              <th scope="col">Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pat &&
                              pat.map((data, index) => (
                                <tr key={`patient-${index}`}>
                                  <td>{data.patient_id}</td>
                                  <td>{data.patient_name}</td>

                                  {/* Medications - properly handling array */}
                                  <td>
                                    {data.medications &&
                                    data.medications.length > 0 ? (
                                      <ul className="list-unstyled mb-0">
                                        {data.medications.map(
                                          (med, medIndex) => (
                                            <li
                                              key={`med-${index}-${medIndex}`}
                                            >
                                              {med.dose} {med.medication_name} (
                                              {med.frequency})
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : (
                                      <span className="text-muted">None</span>
                                    )}
                                  </td>

                                  {/* Tests - properly handling array */}
                                  <td>
                                    {data.tests && data.tests.length > 0 ? (
                                      <ul className="list-unstyled mb-0">
                                        {data.tests.map((test, testIndex) => (
                                          <li
                                            key={`test-${index}-${testIndex}`}
                                          >
                                            {test.test_name} - {test.reason}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <span className="text-muted">None</span>
                                    )}
                                  </td>

                                  <td>{data.registration_date}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        data.status === "Active"
                                          ? "badge-success"
                                          : data.status === "Pending"
                                          ? "badge-warning"
                                          : "badge-secondary"
                                      }`}
                                    >
                                      {data.status}
                                    </span>
                                  </td>
                                  <td>
                                    <Link to={`/pharmacy/prescription/${data.patient_id}`}  className="btn btn-sm btn-outline-primary mr-1">
                                      <i className="fa fa-eye"></i>View
                                    </Link>
                                    <button className="btn btn-sm btn-outline-success">
                                      <i className="fa fa-check"></i>Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer bg-white">
                      <nav aria-label="Prescription pagination">
                        <ul className="pagination mb-0">
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

                  {/* Medication Inventory */}
                  {/* <div className="card">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Medication Inventory</h5>
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-sync-alt mr-1"></i> Refresh
                      </button>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Medication</th>
                              <th scope="col">Dosage</th>
                              <th scope="col">Stock</th>
                              <th scope="col">Last Restock</th>
                              <th scope="col">Price</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Amoxicillin</td>
                              <td>500mg Capsule</td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "5px" }}
                                >
                                  <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: "75%" }}
                                  ></div>
                                </div>
                                <small>142 in stock</small>
                              </td>
                              <td>2023-05-10</td>
                              <td>$12.99</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary mr-1">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <i className="fas fa-chart-line"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Lisinopril</td>
                              <td>10mg Tablet</td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "5px" }}
                                >
                                  <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: "35%" }}
                                  ></div>
                                </div>
                                <small>67 in stock</small>
                              </td>
                              <td>2023-05-12</td>
                              <td>$8.50</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary mr-1">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <i className="fas fa-chart-line"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Atorvastatin</td>
                              <td>20mg Tablet</td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "5px" }}
                                >
                                  <div
                                    className="progress-bar bg-danger"
                                    role="progressbar"
                                    style={{ width: "15%" }}
                                  ></div>
                                </div>
                                <small>23 in stock</small>
                              </td>
                              <td>2023-04-28</td>
                              <td>$15.75</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary mr-1">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <i className="fas fa-chart-line"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div> */}
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
