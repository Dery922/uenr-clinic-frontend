import React, { useState } from "react";
import { Table, Button, Card, Form, Row, Col } from "react-bootstrap";
import { FaFilePdf, FaFileExcel, FaAirbnb, FaSyncAlt ,FaFileAlt } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const Reports = () => {
  // State for filters
  const [filters, setFilters] = useState({
    reportType: "appointments",
    startDate: "",
    endDate: "",
  });

  // Mock report data
  const [reportData, setReportData] = useState([
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "2023-10-15",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. Brown",
      date: "2023-10-16",
      status: "Pending",
    },
  ]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Generate report (mock function)
  const generateReport = () => {
    alert(
      `Generating ${filters.reportType} report from ${filters.startDate} to ${filters.endDate}`
    );
    // In a real app, you would fetch data from an API here
  };

  // Export to PDF (mock function)
  const exportToPDF = () => {
    alert("Exporting to PDF...");
  };

  // Export to Excel (mock function)
  const exportToExcel = () => {
    alert("Exporting to Excel...");
  };

  return (
    <div className="main-wrapper">
        <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container-fluid">
              <div className="row">
                {/* Sidebar would be imported here */}
                <div className="col-md-9 col-lg-10 ml-auto main-content p-4">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>
                      <FaFileAlt className="mr-2" /> Report Generation
                    </h2>
                    <Button variant="primary" onClick={generateReport}>
                      <FaSyncAlt className="mr-2" /> Generate Report
                    </Button>
                  </div>

                  {/* Filter Section */}
                  <Card className="mb-4 filter-section">
                    <Card.Body>
                      <h5>
                        <FaAirbnb className="mr-2" /> Filters
                      </h5>
                      <Form>
                        <Row>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Report Type</Form.Label>
                              <Form.Control
                                as="select"
                                name="reportType"
                                value={filters.reportType}
                                onChange={handleFilterChange}
                              >
                                <option value="appointments">
                                  Appointments
                                </option>
                                <option value="patients">Patients</option>
                                <option value="financial">Financial</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>

                  {/* Report Table */}
                  <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Report Data</h5>
                      <div>
                        <Button
                          variant="danger"
                          className="mr-2"
                          onClick={exportToPDF}
                        >
                          <FaFilePdf className="mr-2" /> PDF
                        </Button>
                        <Button variant="success" onClick={exportToExcel}>
                          <FaFileExcel className="mr-2" /> Excel
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.patient}</td>
                              <td>{item.doctor}</td>
                              <td>{item.date}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    item.status === "Completed"
                                      ? "badge-success"
                                      : "badge-warning"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
