import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { EmployeeService } from "../../services/employeesService";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/actions/sessionAction";

import Sidebar from "../../components/Sidebar";

const PatientSession = () => {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();
  console.log(selectedPatient,'bjbj')

  useEffect(() => {
    console.log(doctors.role);
  }, []);
  const [form, setForm] = useState({
     
    visitType: "",
    doctorId: "",
    notes: "",
  });

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/patients/search?q=${query}`
        );
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setPatients([]);
    }
  };

  useEffect(() => {
    // 👨‍⚕️ Load doctors (fetch once)
    const fetchDoctors = async () => {
      const data = await EmployeeService();

      setDoctors(data.filter((d) => d.role === "Doctor"));
    };
    fetchDoctors();
  }, []);

  const createSession = async () => {
    if (!selectedPatient) return;

    const { data } = await axios.post("http://localhost:8080/create/session", {
      patientId: selectedPatient._id,
      patient_id: selectedPatient.patient_id,
      patient_name : selectedPatient.first_name + " " + selectedPatient.last_name,
      ...form,
    });

    // Dispatch the sessionId to Redux
    dispatch(setSession(data));
    toast.success("session created successfully!");
    console.log("Session:", data);
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <Sidebar />
        <div className="content">
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                {/* Main Content */}
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4"
                >
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                      <i className="fas fa-user-md text-primary"></i>
                      Patient Record System
                    </h1>
                  </div>
                  {/* Search Section */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="fas fa-search mr-2"></i>
                        Search Patient Records
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Patient ID/Name</label>
                            <div className="input-group">
                              <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="form-control"
                                placeholder="Enter patient ID or name"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  onClick={handleSearch}
                                  className="btn btn-primary"
                                >
                                  <i className="fa fa-search"></i> Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Date Range</label>
                            <div className="input-group">
                              <input type="date" className="form-control" />
                              <div className="input-group-append">
                                <span className="input-group-text">to</span>
                              </div>
                              <input type="date" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Results */}
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <i className="fa fa-users mr-2"></i>
                        Patient Results
                      </h5>
                      <span className="badge badge-primary">
                        3 records found
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Patient ID</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Age</th>
                              <th>Last Visit</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          {patients.length > 0 && (
                            <tbody>
                              {patients.map((p) => (
                                <tr key={p.patient_Id}>
                                  <td>{p.patient_id}</td>
                                  <td>{p.first_name}</td>
                                  <td>{p.gender}</td>
                                  <td>{p.age}</td>
                                  <td>{p.createdAt}</td>
                                  <td>
                                    <button
                                      className="btn btn-sm btn-primary"
                                      onClick={() => {
                                        setSelectedPatient(p);
                                      }}
                                    >
                                      New Session
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* New Session Form */}
                  {selectedPatient && (
                    <div className="card mt-4">
                      <div className="card-body">
                        <h5>Create Session for {selectedPatient.first_name}</h5>

                    
                          <label>Patient Name</label>
                          <input
                            type="text"
                            className="form-control mb-2"
                            value={selectedPatient.first_name + " " + selectedPatient.last_name}
                            name="patient_name"
                            readOnly
                          />
                     

                        <select
                          className="form-control mb-2"
                          value={form.visitType}
                          onChange={(e) =>
                            setForm({ ...form, visitType: e.target.value })
                          }
                        >
                          <option value="">Select Visit Type</option>
                          <option value="Routine">Routine</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Emergency">Emergency</option>
                        </select>

                        <select
                          className="form-control mb-2"
                          value={form.doctorId}
                          onChange={(e) =>
                            setForm({ ...form, doctorId: e.target.value })
                          }
                        >
                          <option value="">Assign Doctor</option>
                          {doctors.map((doc) => (
                            <option key={doc._id} value={doc._id}>
                              {doc.username}
                            </option>
                          ))}
                        </select>

                        <textarea
                          className="form-control mb-2"
                          placeholder="Initial Notes"
                          value={form.notes}
                          onChange={(e) =>
                            setForm({ ...form, notes: e.target.value })
                          }
                        />
                        <button
                          className="btn btn-primary"
                          onClick={createSession}
                        >
                          Save Session
                        </button>
                      </div>
                    </div>
                  )}
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSession;
