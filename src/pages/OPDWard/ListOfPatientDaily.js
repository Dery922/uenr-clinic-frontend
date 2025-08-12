import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import getOPDRecordsDaily from "../../services/opdDailyService";
const ListOfPatientDaily = () => {
  const [datar, setDatar] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(datar)
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
                            <i className="fas fa-search"></i>
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
                        <i className="fas fa-plus mr-2"></i> Add New Record
                      </Link>
                    </div>
                  </div>

                  {/* Records Table */}
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th>Date</th>
                          <th>Folder Number</th>
                          <th>Blood Pressure</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datar
                          ? datar.map((d) => (
                              <tr>
                                <td>{d.createdAt}</td>
                                <td>{d.patient_id}</td>
                                <td>{d.blood_pressure}</td>
                                {d.status === 0 ? (
                                  <td>
                                    <span className="badge badge-info">
                                      Pending
                                    </span>
                                  </td>
                                ) : (
                                  <td>
                                    <span className="badge badge-success">
                                      Completed
                                    </span>
                                  </td>
                                )}

                                <td>
                                  <button className="btn btn-sm btn-outline-primary mr-1">
                                    <i className="fas fa-eye"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary">
                                    <i className="fas fa-download"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          : "No active activities today"}
                      </tbody>
                    </table>
                  </div>

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
