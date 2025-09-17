import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const FinanceDepartment = () => {
  const [unpaidMedications, setUnpaidMedications] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(selectedBills, "select bills")

  console.log(unpaidMedications, "unpaid medications")


  // Fetch unpaid medications
  const fetchUnpaidMedications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/finance/unpaid-medications");
     
      setUnpaidMedications(response.data);
      console.log(response)
      
    } catch (error) {
      toast.error( error.message || "Failed to load unpaid medications");
    }
  };

  useEffect(() => {
    fetchUnpaidMedications();
  }, []);

  // Process payment
  const processPayment = async () => {
    if (selectedBills.length === 0) {
      toast.error("Please select at least one bill to pay");
      return;
    }

    try {
      setLoading(true);
      
      for (const bill of selectedBills) {
        await axios.post("http://localhost:8080/finance/process-payment", {
          planId: bill.planId,
          drugIndex: bill.drugIndex,
          amount_paid: bill.amount,
          payment_method: "cash",
          transaction_id: `TXN-${Date.now()}-${bill.drugIndex}`,
          cashier_username: "finance_staff" // Would come from auth in real app
        });
      }

      toast.success("Payments processed successfully");
      setSelectedBills([]);
      setPaymentAmount(0);
      fetchUnpaidMedications();
      
    } catch (error) {
      toast.error("Payment processing failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle bill selection
  const handleBillSelection = (bill, isSelected) => {
    console.log(bill, isSelected, "LOGGing param from handleBillSelection")
    if (isSelected) {
      setSelectedBills(prev => [...prev, bill]);
      setPaymentAmount(prev => prev + bill.amount);
    } else {
      setSelectedBills(prev => prev.filter(b => b.planId !== bill.planId || b.drugIndex !== bill.drugIndex));
      setPaymentAmount(prev => prev - bill.amount);
    }
  };

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container-fluid patient-finance-page">
              <div className="row">
                {/* Main Content */}
                <main className="col-md-12 px-4 main-content">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                      <i className="fa fa-money-bill-wave mr-2"></i>
                      Finance Department - Medication Payments
                    </h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <button 
                        type="button" 
                        className="btn btn-sm btn-primary"
                        onClick={fetchUnpaidMedications}
                      >
                        <i className="fa fa-sync-alt mr-1"></i> Refresh
                      </button>
                    </div>
                  </div>

                  {/* Balance Summary */}
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h6 className="card-title text-muted">
                            Total Pending Payments
                          </h6>
                          <h3 className="text-danger">
                            ₵{unpaidMedications.reduce((sum, med) => sum + med.amount, 0)} 
                            {/* i just remove .toFixed(2) */}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h6 className="card-title text-muted">
                            Selected for Payment
                          </h6>
                          <h3 className="text-primary">₵{paymentAmount}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h6 className="card-title text-muted">
                            Pending Medications
                          </h6>
                          <h3>{unpaidMedications.length}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outstanding Medication Bills */}
                  <div className="card mb-4">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <i className="fa fa-pills mr-2"></i>
                        Unpaid Medication Bills
                      </h5>
                      <span className="badge badge-warning">
                        {unpaidMedications.length} pending
                      </span>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Select</th>
                              <th scope="col">Patient ID</th>
                              <th scope="col">Medication</th>
                              <th scope="col">Dosage</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Status</th>
                              <th scope="col">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {unpaidMedications.length > 0 ? (
                              unpaidMedications.map((med, index) => (
                                  
                                <tr key={`${med.planId}-${med.drugIndex}`}>
                      
                                  <td>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={`bill-${index}`}
                                        onChange={(e) => handleBillSelection(med.medications.map((d,s) => (d.amount)), e.target.checked)}
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor={`bill-${index}`}
                                      ></label>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <strong>{med.patient_name}</strong>
                                      <br />
                                      <small className="text-muted">{med.patient}</small>
                                    </div>
                                  </td>
                                  <td>
                                    <strong>{med.medication_name}</strong>
                                    <br />
                                    <small className="text-muted">{med.frequency}</small>
                                  </td>
                                  <td>{med.dose}</td>
                                  <td>
                                    <strong className="text-danger">₵{med.medications.map((am,key) => (am.amount))}</strong>
                                  </td>
                                  <td>
                                    <span className="badge badge-warning">
                                      {med.payment_status || "Pending Payment"}
                                    </span>
                                  </td>
                                  <td>
                                    {new Date(med.registration_date).toLocaleDateString()}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="text-center py-4">
                                  <i className="fa fa-check-circle fa-2x text-success mb-2"></i>
                                  <p className="text-muted">No unpaid medication bills</p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Payment Processing Section */}
                  {selectedBills.length > 0 && (
                    <div className="card mb-4">
                      <div className="card-header bg-success text-white">
                        <h5 className="mb-0">
                          <i className="fa fa-credit-card mr-2"></i>
                          Process Payment
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="mb-3">Selected Bills</h6>
                            <div className="border p-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
                              {selectedBills.map((bill, index) => (
                                <div key={index} className="mb-2 p-2 border-bottom">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>{bill.medication_name}</strong>
                                      <br />
                                      <small>{bill.patient_name}</small>
                                    </div>
                                    <span className="text-danger">₵{bill.amount}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <h6 className="mb-3">Payment Details</h6>
                            <div className="form-group">
                              <label>Total Amount</label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">₵</span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={paymentAmount}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Payment Method</label>
                              <select className="form-control">
                                <option value="cash">Cash</option>
                                <option value="mobile_money">Mobile Money</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="card">Credit/Debit Card</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>Transaction Reference</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter transaction reference"
                              />
                            </div>

                            <button
                              className="btn btn-success btn-block"
                              onClick={processPayment}
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm mr-2"></span>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <i className="fa fa-check-circle mr-2"></i>
                                  Process Payment (₵{paymentAmount})
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="card">
                    <div className="card-header bg-white">
                      <h5 className="mb-0">Quick Actions</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3 text-center">
                          <button className="btn btn-outline-primary btn-block">
                            <i className="fa fa-print fa-2x mb-2"></i>
                            <br />
                            Print Receipts
                          </button>
                        </div>
                        <div className="col-md-3 text-center">
                          <button className="btn btn-outline-info btn-block">
                            <i className="fa fa-chart-line fa-2x mb-2"></i>
                            <br />
                            Financial Reports
                          </button>
                        </div>
                        <div className="col-md-3 text-center">
                          <button className="btn btn-outline-warning btn-block">
                            <i className="fa fa-search fa-2x mb-2"></i>
                            <br />
                            Search Records
                          </button>
                        </div>
                        <div className="col-md-3 text-center">
                          <button className="btn btn-outline-danger btn-block">
                            <i className="fa fa-file-export fa-2x mb-2"></i>
                            <br />
                            Export Data
                          </button>
                        </div>
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

export default FinanceDepartment;