import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Form,
  Row,
  Col,
  InputGroup,
  Dropdown,
  Pagination,
} from "react-bootstrap";
import {
  FaSearch,
  FaFilePdf,
  FaFileExcel,
  FaFilter,
  FaSort,
  FaEye,
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const ViewReports = () => {
  // State for reports data
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters/Search
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  // Mock data fetch (replace with API call)
  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        name: "Monthly Appointments (Oct 2023)",
        type: "appointments",
        date: "2023-10-31",
        generatedBy: "Admin User",
        downloadCount: 24,
      },
      {
        id: 2,
        name: "Patient Demographics",
        type: "patients",
        date: "2023-09-30",
        generatedBy: "Dr. Smith",
        downloadCount: 56,
      },
      {
        id: 3,
        name: "Q3 Financial Summary",
        type: "financial",
        date: "2023-10-15",
        generatedBy: "Admin User",
        downloadCount: 18,
      },
    ];

    setReports(mockReports);
    setFilteredReports(mockReports);
    setLoading(false);
  }, []);

  // Apply filters/search
  useEffect(() => {
    let results = reports.filter((report) => {
      const matchesSearch = report.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || report.type === typeFilter;
      return matchesSearch && matchesType;
    });

    // Sorting
    if (sortConfig.key) {
      results.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredReports(results);
    setCurrentPage(1); // Reset pagination on filter
  }, [searchTerm, typeFilter, sortConfig, reports]);

  // Sort handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Mock actions
  const viewReport = (id) => alert(`Viewing report #${id}`);
  const downloadReport = (format, id) =>
    alert(`Downloading report #${id} as ${format}`);

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
                      <FaEye className="mr-2" /> View Generated Reports
                    </h2>
                    <div>
                      <Button variant="primary" className="mr-2">
                        <FaFilter className="mr-2" /> Advanced Filters
                      </Button>
                    </div>
                  </div>

                  {/* Search/Filter Bar */}
                  <Card className="mb-4">
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>
                                <FaSearch />
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="text"
                              placeholder="Search reports..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <Form.Control
                            as="select"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                          >
                            <option value="all">All Types</option>
                            <option value="appointments">Appointments</option>
                            <option value="patients">Patients</option>
                            <option value="financial">Financial</option>
                          </Form.Control>
                        </Col>
                        <Col md={3}>
                          <Dropdown className="float-right">
                            <Dropdown.Toggle variant="outline-secondary">
                              Actions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => alert("Bulk export selected")}
                              >
                                <FaFileExcel className="mr-2" /> Export Selected
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  {/* Reports Table */}
                  <Card>
                    <Card.Body className="p-0">
                      {loading ? (
                        <div className="text-center p-5">
                          Loading reports...
                        </div>
                      ) : (
                        <>
                          <Table striped hover responsive className="mb-0">
                            <thead>
                              <tr>
                                <th
                                  className="cursor-pointer"
                                  onClick={() => requestSort("name")}
                                >
                                  Report Name <FaSort />
                                </th>
                                <th
                                  className="cursor-pointer"
                                  onClick={() => requestSort("type")}
                                >
                                  Type <FaSort />
                                </th>
                                <th
                                  className="cursor-pointer"
                                  onClick={() => requestSort("date")}
                                >
                                  Generated On <FaSort />
                                </th>
                                <th>Generated By</th>
                                <th
                                  className="cursor-pointer"
                                  onClick={() => requestSort("downloadCount")}
                                >
                                  Downloads <FaSort />
                                </th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentReports.length > 0 ? (
                                currentReports.map((report) => (
                                  <tr key={report.id}>
                                    <td>{report.name}</td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          report.type === "appointments"
                                            ? "badge-primary"
                                            : report.type === "patients"
                                            ? "badge-success"
                                            : "badge-warning"
                                        }`}
                                      >
                                        {report.type}
                                      </span>
                                    </td>
                                    <td>{report.date}</td>
                                    <td>{report.generatedBy}</td>
                                    <td>{report.downloadCount}</td>
                                    <td>
                                      <Button
                                        variant="info"
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => viewReport(report.id)}
                                      >
                                        <FaEye />
                                      </Button>
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          variant="secondary"
                                          size="sm"
                                        >
                                          Download
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item
                                            onClick={() =>
                                              downloadReport("pdf", report.id)
                                            }
                                          >
                                            <FaFilePdf className="mr-2" /> PDF
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                            onClick={() =>
                                              downloadReport("excel", report.id)
                                            }
                                          >
                                            <FaFileExcel className="mr-2" />{" "}
                                            Excel
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="text-center py-4">
                                    No reports found matching your criteria.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>

                          {/* Pagination */}
                          {filteredReports.length > reportsPerPage && (
                            <div className="d-flex justify-content-center mt-3">
                              <Pagination>
                                <Pagination.Prev
                                  disabled={currentPage === 1}
                                  onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                  }
                                />
                                {[...Array(totalPages)].map((_, i) => (
                                  <Pagination.Item
                                    key={i + 1}
                                    active={i + 1 === currentPage}
                                    onClick={() => setCurrentPage(i + 1)}
                                  >
                                    {i + 1}
                                  </Pagination.Item>
                                ))}
                                <Pagination.Next
                                  disabled={currentPage === totalPages}
                                  onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                  }
                                />
                              </Pagination>
                            </div>
                          )}
                        </>
                      )}
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

export default ViewReports;
