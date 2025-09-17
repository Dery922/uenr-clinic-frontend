import React, { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";

const PatientLabHistory = () => {
  const [labHistory, setLabHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [data, setData] = useState([])
  // Mock data - in a real app, this would come from an API

  // useEffect(() => {
  //   const fetchLab = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/get-all-lab-test");
  //       const backendData = response.data;
  
  //       // Map backend data to match frontend structure
  //       const formattedData = backendData.map((d) => ({
  //         id: d._id,
  //         testName: "Hemoglobin Test", // Or another field if your backend provides test name
  //         testDate: d.date,
  //         orderedBy: d.patient_id, // Adjust if you have a doctor field
  //         status: d.hemoglobin_flag === "Abnormal" ? "completed" : "pending",
  //         results: {
  //           hemoglobin: d.hemoglobin,
  //           flag: d.hemoglobin_flag,
  //         },
  //         notes: d.notes || "",
  //       }));
  
  //       setLabHistory(formattedData);
  //       setFilteredHistory(formattedData);
  //     } catch (err) {
  //       console.error("Error fetching lab data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchLab();
  // }, []);
  


  const handleRequestError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setError("Session expired. Please login again.");
          break;
        case 404:
          setError("No medical records found for this patient");
          break;
        default:
          setError("Failed to fetch medical records");
      }
    } else if (error.request) {
      setError("Network error. Please check your connection.");
    } else {
      setError("An unexpected error occurred");
    }
  };


  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState(null);
  const authToken = useSelector((state) => state.user.token);
  const [patientRecords, setPatientRecords] = useState([]);



  const handleSearch = async () => {
    if (!searchId.trim()) {
      setError("Please enter a patient ID");
      return;
    }

    if (!authToken) {
      setError("Authentication required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cleanPatientId = searchId.replace(/^:/, "").trim();
      console.log(cleanPatientId)

      const response = await axios.get(
        `http://localhost:8080/api/patients/${cleanPatientId}/get-all-lab-test`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setPatientRecords(response.data || []);
      console.log(patientRecords, "lap history")

    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };







  // Filtering logic
  useEffect(() => {
    let results = labHistory;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (test) =>
          test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.orderedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      let cutoffDate = new Date();

      if (dateFilter === "month") {
        cutoffDate.setMonth(now.getMonth() - 1);
      } else if (dateFilter === "year") {
        cutoffDate.setFullYear(now.getFullYear() - 1);
      }

      results = results.filter((test) => new Date(test.testDate) >= cutoffDate);
    }

    setFilteredHistory(results);
  }, [searchTerm, dateFilter, labHistory]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="badge badge-success">Completed</span>;
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "cancelled":
        return <span className="badge badge-danger">Cancelled</span>;
      default:
        return <span className="badge badge-secondary">Unknown</span>;
    }
  };

  // if (loading) {
  //   return (
  //     <div className="account-loading">
  //     <DotLoader color="blue" size={100} />
  //    </div>
  //   );
  // }  

  return (
    <div className="main-wrapper">
        <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container mt-4">
              <div className="row">
                <div className="col">
                  <h2 className="mb-4">Patients Laboratory History</h2>
                </div>
              </div>

              {/* Filters */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                  <div className="form-group">
                  <label>Search by Patient ID</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter patient ID..."
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                  
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label>Time Period</label>
                        <select
                          className="form-control"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                        >
                          <option value="all">All Time</option>
                          <option value="month">Last Month</option>
                          <option value="year">Last Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setSearchTerm("");
                          setDateFilter("all");
                        }}
                      >
                        Reset
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>

          {/* Results */}
{!patientRecords?.bloodhistory || patientRecords.bloodhistory.length === 0 ? (
  <div className="card text-center">
    <div className="card-body">
      <h5>No lab tests found</h5>
      <p>Try adjusting your search filters</p>
    </div>
  </div>
) : (
  <div id="labHistoryAccordion">
    {patientRecords.bloodhistory.map((test) => (
      <div className="card mb-3" key={test.id}>
        <div className="card-header" id={`heading-${test.id}`}>
          <h5 className="mb-0">
            <button
              className="btn btn-link collapsed"
              data-toggle="collapse"
              data-target={`#collapse-${test.id}`}
              aria-expanded="false"
              aria-controls={`collapse-${test.id}`}
            >
              <div className="row w-100">
                <div className="col-md-5 text-left">
                  <strong>Blood Test</strong> {/* fixed name */}
                </div>
                <div className="col-md-3">
                  {new Date(test.date).toLocaleDateString()}
                </div>
                <div className="col-md-4">{test.recorded_by}</div>
                <div className="col-md-2 text-right">
                  {test.wbc_flag ? (
                    <span className="badge badge-danger">Abnormal</span>
                  ) : (
                    <span className="badge badge-success">Normal</span>
                  )}
                </div>
              </div>
            </button>
          </h5>
        </div>

        <div
          id={`collapse-${test.id}`}
          className="collapse"
          aria-labelledby={`heading-${test.id}`}
          data-parent="#labHistoryAccordion"
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h5>Test Results</h5>
                <table className="table table-striped table-bordered table-sm">
                  <thead className="thead-dark">
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Hemoglobin</td>
                      <td>{test.hemoglobin ?? "N/A"}</td>
                    </tr>
                    <tr>
                      <td>WBC Count</td>
                      <td>{test.wbc_count ?? "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-md-4">
                <h5>Notes</h5>
                <div className="card">
                  <div className="card-body">
                    {test.hemoglobin_notes || "No additional notes provided."}
                  </div>
                </div>

                <div className="mt-3">
                  <button className="btn btn-outline-primary mr-2 btn-sm">
                    Print Results
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLabHistory;
