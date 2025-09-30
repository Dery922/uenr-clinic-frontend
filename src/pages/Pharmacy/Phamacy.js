import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import patientService from "../../services/patientService";
import patientPrescription from "../../services/patientPrescription";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Pharmacy = () => {
  const [pat, setPat] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const loggedInUser = useSelector((state) => state.user.user.username);

  console.log(pendingData, "pending data dispense")


//  const [formData, setFormData] = useState();

        const [saving, setSaving] = useState(false);
        const [saved, setSaved] = useState(false)

  const savePrescriptionInfo = async (formData) => {
      try {
        
        setSaving(true)
        const res = await axios.post(
          "http://localhost:8080/save-prescription-info"||`${process.env.REACT_APP_API_URL}`,formData
          
        );
        toast.success("Data save successfully!");
      
        setSaved(true);
      } catch (error) {
        console.log(error)
      }finally{
        setSaving(false)
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await patientPrescription();
        const response = await axios.get(
          "http://localhost:8080/pharmacy/pending/prescription"||`${process.env.REACT_APP_API_URL}`
        );
        setPendingData(response.data);
        console.log("dispense data coming", response.data);
        setPat(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDispense = async (planId, pharmacist_username, drugIndex) => {
    console.log("all that is clearn", planId, pharmacist_username, drugIndex);
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await axios.patch(
        `http://localhost:8080/pharmacy/dispense/${planId}`||`${process.env.REACT_APP_API_URL}`,
        {
          pharmacist_username,
          drugIndex,
        }
      );

      toast.success(response.data.message);
      return response.data.plan;
    } catch (err) {
      console.log("error checking here", err);
      toast.info(
        err.response?.data?.error || "Failed to dispense medications check!"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (plan) => {
    console.log("Viewing details for:", plan);
    // You can open a modal, redirect to a details page, or display more info here
  };

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
                              <th scope="col">Dr</th>
                              <th scope="col">Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pat &&
                              pat.map((data, index) => (
                                <tr key={`patient-${index}`}>
                                  <td>{data.patient}</td>
                                  <td>{data.patient}</td>

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

                                  <td>
                                    {new Date(
                                      data.registration_date
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </td>
                                  <td>{data.username}</td>
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
                                    <Link
                                      to={`/pharmacy/prescription/${data.patient}`}
                                      className="btn btn-sm btn-outline-primary mr-1"
                                    >
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

                  <div className="card mb-4">
                    <div className="card-header bg-white">
                      <h5 className="mb-0">Dispension of Medications</h5>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th>Patient Name</th>
                              <th>Medications</th>
                              <th>Insurance Covered</th>
                              <th>Payment Status</th>
                              <th>Tests</th>
                              <th>Dispense Medication</th>
                              <th>Date</th>
                              <th>Doctor</th>
                              <th>Overall Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(pendingData || []).length > 0 ? (
                              pendingData.map((plan) => (
                                <tr key={plan._id}>
                                  {/* Patient Name */}
                                  <td>{plan.patient || "N/A"}</td>

                                  {/* Medications */}
                                  <td>
                                    {(plan.medications || []).length > 0 ? (
                                      plan.medications.map((drug, index) => (
                                        <div key={index}>
                                          {drug.medication_name} ({drug.dose},{" "}
                                          {drug.frequency})
                                        </div>
                                      ))
                                    ) : (
                                      <span>No Medications</span>
                                    )}
                                  </td>

                                  {/* Insurance Covered */}
                                  <td>
                                    {(plan.medications || []).length > 0 ? (
                                      plan.medications.map((med, i) => (
                                        <div key={i}>
                                          {med.covered_by_insurance
                                            ? "Yes"
                                            : `No (₵${med.amount})`}
                                        </div>
                                      ))
                                    ) : (
                                      <span>No Data</span>
                                    )}
                                  </td>

                                  {/* payment status */}
                                  <td>
                                    {(plan.medications || []).length > 0 ? (
                                      plan.medications.map((med, i) => (
                                        <div key={i}>
                                          {med.covered_by_insurance
                                            ? "Not applicable"
                                            : `${med.payment_status}`}
                                        </div>
                                      ))
                                    ) : (
                                      <span>No Data</span>
                                    )}
                                  </td>

                                  {/* Tests */}
                                  <td>
                                    {(plan.tests || []).length > 0 ? (
                                      plan.tests.map((test, i) => (
                                        <div key={i}>{test.test_name}</div>
                                      ))
                                    ) : (
                                      <span>No Tests</span>
                                    )}
                                  </td>

                                  {/* Dispense Medication */}
                                  <td>
                                    {(plan.medications || []).map(
                                      (drug, index) => (
                                        console.log("checking drug", drug),
                                        (
                                          <button
                                            key={index}
                                            className="btn btn-sm btn-outline-success mb-1"
                                            disabled={
                                              drug.dispense_status ===
                                              "dispensed"
                                            }
                                            onClick={() =>
                                              handleDispense(
                                                plan._id,
                                                loggedInUser,
                                                index
                                              )
                                            }
                                          >
                                            {drug.dispense_status ===
                                            "dispensed"
                                              ? "Dispensed"
                                              : "Dispense"}
                                          </button>
                                        )
                                      )
                                    )}
                                  </td>

                                  {/* Date */}
                                  <td>
                                    {new Date(
                                      plan.createdAt
                                    ).toLocaleDateString()}
                                  </td>

                                  {/* Doctor */}
                                  <td>{plan.username || "N/A"}</td>

                                  {/* Overall Status */}
                                  <td>
                                    <span
                                      className={`badge ${
                                        plan.status === "dispatched"
                                          ? "badge-success"
                                          : "badge-warning"
                                      }`}
                                    >
                                      {plan.status}
                                    </span>
                                  </td>

                                  {/* Actions */}
                                  <td>
                                    <button
                                      className="btn btn-sm btn-primary"
                                      onClick={() => viewDetails(plan)}
                                    >
                                      View
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-success"
                           
                                      onClick={() =>
                                        savePrescriptionInfo({
                                          patient: plan.patient,
                                          amount : plan.medications.amount,
                                          registration_date:
                                          plan.registration_date,
                                          dispense_by: loggedInUser,
                                          username : plan.username,
                                        
                                        })
                                      }
                                      disabled={saving || saved} 
                                    >
                                      <i className="fa fa-check"></i> 
                                      
                                      {saving ? "Saving..." : saved ? "Saved" : "Save"}
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="9" className="text-center">
                                  No pending data available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
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

export default Pharmacy;
