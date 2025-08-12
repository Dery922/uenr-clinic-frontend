import React, {useState, useEffect} from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Button, Card, Row, Col, Table } from "react-bootstrap";
import { Printer } from "react-bootstrap-icons";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Prescription = () => {
   const {patientId} = useParams()
  const handlePrint = () => {
    window.print();
  };


  const [patient, setPatient] = useState(null);
  

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/pharmacy/prescription/${patientId}`);
        setPatient(res.data.plans[0]);
        console.log(res, "getting data from backend");
        
      } catch (err) {
        console.error("Error fetching patient data", err);
      }
    };

    fetchPatient();
  }, [patientId]);

  useEffect(() => {
    if (patient) {
      console.log("Updated patient outside fetch:", patient);
    }
  }, [patient]);
  

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="prescription-container">
              <Card className="mb-6 printable-area">
                <Card.Header className="bg-primary text-white d-flex justify-content-between">
                  <h5>New Prescription</h5>
                  <Button variant="light" size="sm" onClick={handlePrint}>
                    <Printer className="mr-2" /> Print
                  </Button>
                </Card.Header>
                <Card.Body>
                  {/* Patient Info */}
                  <Row className="mb-6">
                    <Col md-6>
                      <div className="patient-info">
                        <h6>Patient Information</h6>
                        <p>
                          <strong>Name:</strong> {patient?.patient_name || "N/A"} 
                        </p>
                        <p>
                          <strong>ID:</strong> {patient?.patient_id || "N/A"}
                          {console.log(patient , "trying to check")}
                        </p>
                        <p>
                          <strong>Age:</strong> {patient?.age || "N/A"}
                        </p>
                      </div>
                    </Col>
                    <Col md-6>
                      <div className="prescription-meta">
                        <h6>Prescription Details</h6>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date().toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Doctor:</strong> Dr. {patient?.username}
                        </p>
                      </div>
                    </Col>
                  </Row>

                  {/* Prescription Form */}
                  <Formik
                    initialValues={{
                      diagnosis: patient?.medications?.map((tl) => tl.medication_name).join(', ') || "",
                      medications: [
                        {
                          name: "", 
                          dosage: "",
                          frequency: "",
                          duration: "",
                          notes: "",
                        },
                      ],
                      instructions: "",
                    }}
                    onSubmit={(values) => {
                      // Handle prescription submission
                      console.log(values);
                    }}
                  >
                    {({ values }) => (
                      <Form>
                        {/* Diagnosis */}
                        <div className="form-group mb-4">
                          <label>Diagnosis</label>
                          <Field
                            as="textarea"
                            name="diagnosis"
                            className="form-control"
                            rows="2"
                            placeholder="Enter diagnosis"
                          />
                        </div>

                        {/* Medications */}
                        <FieldArray name="medications">
                          {({ push, remove }) => (
                            <div className="mb-4">
                              <h6>Medications</h6>
                              <Table bordered className="medication-table">
                                <thead>
                                  <tr>
                                    <th>Drug Name</th>
                                    <th>Dosage</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                    <th>Notes</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {values.medications.map((med, index) => (
                                    <tr key={index}>
                                      <td>
                                        <Field
                                          name={`medications.${med}.medication_name`}
                                          className="form-control form-control-sm"
                                          placeholder="e.g. Paracetamol"
                                          value={med.name}
                                          readOnly
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={`medications.${index}.dosage`}
                                          className="form-control form-control-sm"
                                          placeholder="e.g. 500mg"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={`medications.${index}.frequency`}
                                          className="form-control form-control-sm"
                                          placeholder="e.g. 3 times daily"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={`medications.${index}.duration`}
                                          className="form-control form-control-sm"
                                          placeholder="e.g. 7 days"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={`medications.${index}.notes`}
                                          className="form-control form-control-sm"
                                          placeholder="Special instructions"
                                        />
                                      </td>
                                      <td>
                                        {index > 0 && (
                                          <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => remove(index)}
                                          >
                                            ×
                                          </Button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() =>
                                  push({
                                    name: "",
                                    dosage: "",
                                    frequency: "",
                                    duration: "",
                                    notes: "",
                                  })
                                }
                              >
                                + Add Medication
                              </Button>
                            </div>
                          )}
                        </FieldArray>

                        {/* Additional Instructions */}
                        <div className="form-group mb-4">
                          <label>Additional Instructions</label>
                          <Field
                            as="textarea"
                            name="instructions"
                            className="form-control"
                            rows="3"
                            placeholder="Any special instructions for the patient"
                          />
                        </div>

                        <div className="d-flex justify-content-between">
                          <Button variant="secondary">Cancel</Button>
                          <Button variant="primary" type="submit">
                            Save Prescription
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>

              {/* Print Styles (hidden on screen) */}
              <style jsx global>{`
                @media print {
                  body * {
                    visibility: hidden;
                  }
                  .printable-area,
                  .printable-area * {
                    visibility: visible;
                  }
                  .printable-area {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    border: none;
                    box-shadow: none;
                  }
                  .no-print {
                    display: none !important;
                  }
                  .patient-info,
                  .prescription-meta {
                    margin-bottom: 20px;
                  }
                  .medication-table {
                    width: 100%;
                    margin-bottom: 20px;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
