import React, { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import Sidebar from "../../components/Sidebar";

const PatientLabHistory = () => {
  const [labHistory, setLabHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          testName: "Complete Blood Count",
          testDate: "2023-05-15",
          orderedBy: "Dr. Smith",
          status: "completed",
          results: {
            hemoglobin: "14.2 g/dL",
            hematocrit: "42%",
            wbc: "6.5 x10³/μL",
            platelets: "250 x10³/μL",
          },
          notes: "Results within normal range",
        },
        {
          id: 2,
          testName: "Lipid Panel",
          testDate: "2023-03-10",
          orderedBy: "Dr. Johnson",
          status: "completed",
          results: {
            cholesterol: "180 mg/dL",
            hdl: "55 mg/dL",
            ldl: "110 mg/dL",
            triglycerides: "120 mg/dL",
          },
          notes: "Slightly elevated LDL",
        },
        {
          id: 3,
          testName: "Thyroid Stimulating Hormone",
          testDate: "2023-01-05",
          orderedBy: "Dr. Williams",
          status: "completed",
          results: {
            tsh: "2.5 mIU/L",
          },
          notes: "Normal thyroid function",
        },
      ];
      setLabHistory(mockData);
      setFilteredHistory(mockData);
      setLoading(false);
    }, 1000);
  }, []);

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

  if (loading) {
    return (
      <div className="account-loading">
      <DotLoader color="blue" size={100} />
     </div>
    );
  }

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
                  {/* <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Search Tests</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by test name or doctor..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
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
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Results */}
              {filteredHistory.length === 0 ? (
                <div className="card text-center">
                  <div className="card-body">
                    <h5>No lab tests found</h5>
                    <p>Try adjusting your search filters</p>
                  </div>
                </div>
              ) : (
                <div id="labHistoryAccordion">
                  {filteredHistory.map((test) => (
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
                                <strong>{test.testName}</strong>
                              </div>
                              <div className="col-md-3">
                                {new Date(test.testDate).toLocaleDateString()}
                              </div>
                              <div className="col-md-2">{test.orderedBy}</div>
                              <div className="col-md-2 text-right">
                                {getStatusBadge(test.status)}
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
                                  {Object.entries(test.results).map(
                                    ([key, value]) => (
                                      <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-4">
                              <h5>Notes</h5>
                              <div className="card">
                                <div className="card-body">
                                  {test.notes ||
                                    "No additional notes provided."}
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
