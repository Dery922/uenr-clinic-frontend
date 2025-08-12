const Account = () => {
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container-fluid patient-finance-page">
              <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                  <div className="sidebar-sticky pt-3">
                    <div className="patient-summary text-center p-3 mb-3">
                      <div className="patient-avatar mb-2">
                        <i className="fas fa-user-circle fa-4x text-primary"></i>
                      </div>
                      <h6 className="mb-1">John Doe</h6>
                      <p className="text-muted small mb-2">ID: PT-10025</p>
                      <div className="account-balance">
                        <span className="badge badge-pill badge-light">
                          Balance Due
                        </span>
                        <h4 className="mt-2 text-danger">$245.75</h4>
                      </div>
                    </div>

                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link active" href="#">
                          <i className="fas fa-file-invoice-dollar mr-2"></i>
                          Billing Summary
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-credit-card mr-2"></i>
                          Payment Methods
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-receipt mr-2"></i>
                          Payment History
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-file-alt mr-2"></i>
                          Statements
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fas fa-question-circle mr-2"></i>
                          Billing Help
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Main Content */}
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content"
                >
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Billing & Payments</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <button type="button" className="btn btn-sm btn-primary">
                        <i className="fas fa-plus mr-1"></i> Make Payment
                      </button>
                    </div>
                  </div>

                  {/* Balance Summary */}
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-muted">
                            Total Balance
                          </h6>
                          <h3 className="text-danger">$245.75</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-muted">
                            Due Within 30 Days
                          </h6>
                          <h3>$195.00</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-muted">
                            Future Payments
                          </h6>
                          <h3>$50.75</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outstanding Bills */}
                  <div className="card mb-4">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Outstanding Bills</h5>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary dropdown-toggle"
                          type="button"
                          id="filterDropdown"
                          data-toggle="dropdown"
                        >
                          Filter
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            All Bills
                          </a>
                          <a className="dropdown-item" href="#">
                            Lab Tests
                          </a>
                          <a className="dropdown-item" href="#">
                            Medications
                          </a>
                          <a className="dropdown-item" href="#">
                            Consultations
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Date</th>
                              <th scope="col">Service</th>
                              <th scope="col">Description</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>2023-05-15</td>
                              <td>Lab Test</td>
                              <td>Complete Blood Count (CBC)</td>
                              <td>$85.00</td>
                              <td>
                                <span className="badge badge-warning">
                                  Pending Payment
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary mr-1">
                                  <i className="fas fa-file-invoice"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-success">
                                  <i className="fas fa-credit-card"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>2023-05-10</td>
                              <td>Pharmacy</td>
                              <td>Amoxicillin 500mg (21 capsules)</td>
                              <td>$32.75</td>
                              <td>
                                <span className="badge badge-warning">
                                  Pending Payment
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary mr-1">
                                  <i className="fas fa-file-invoice"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-success">
                                  <i className="fas fa-credit-card"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>2023-05-05</td>
                              <td>Consultation</td>
                              <td>Follow-up Visit</td>
                              <td>$120.00</td>
                              <td>
                                <span className="badge badge-warning">
                                  Pending Insurance
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary mr-1">
                                  <i className="fas fa-file-invoice"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  disabled
                                >
                                  <i className="fas fa-credit-card"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>2023-04-28</td>
                              <td>Lab Test</td>
                              <td>Lipid Panel</td>
                              <td>$65.00</td>
                              <td>
                                <span className="badge badge-success">
                                  Paid on 05/01/2023
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-file-invoice"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="card mb-4">
                    <div className="card-header bg-white">
                      <h5 className="mb-0">Make a Payment</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="payment-options">
                            <h6 className="mb-3">Select Payment Method</h6>
                            <div className="list-group mb-3">
                              <a
                                href="#"
                                className="list-group-item list-group-item-action active"
                              >
                                <div className="d-flex align-items-center">
                                  <i className="fas fa-credit-card fa-2x mr-3"></i>
                                  <div>
                                    <h6 className="mb-0">Credit/Debit Card</h6>
                                    <small className="text-white">
                                      Visa, Mastercard, American Express
                                    </small>
                                  </div>
                                </div>
                              </a>
                              <a
                                href="#"
                                className="list-group-item list-group-item-action"
                              >
                                <div className="d-flex align-items-center">
                                  <i className="fab fa-paypal fa-2x mr-3 text-primary"></i>
                                  <div>
                                    <h6 className="mb-0">PayPal</h6>
                                    <small className="text-muted">
                                      Pay with your PayPal account
                                    </small>
                                  </div>
                                </div>
                              </a>
                              <a
                                href="#"
                                className="list-group-item list-group-item-action"
                              >
                                <div className="d-flex align-items-center">
                                  <i className="fas fa-university fa-2x mr-3 text-success"></i>
                                  <div>
                                    <h6 className="mb-0">Bank Transfer</h6>
                                    <small className="text-muted">
                                      Direct transfer from your bank
                                    </small>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="payment-details">
                            <h6 className="mb-3">Payment Details</h6>
                            <div className="form-group">
                              <label>Amount to Pay</label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">$</span>
                                </div>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="0.00"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Select Bills to Pay</label>
                              <div
                                className="border p-2"
                                style={{
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                }}
                              >
                                <div className="custom-control custom-checkbox mb-2">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="bill1"
                                    checked
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="bill1"
                                  >
                                    Complete Blood Count (CBC) - $85.00
                                  </label>
                                </div>
                                <div className="custom-control custom-checkbox mb-2">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="bill2"
                                    checked
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="bill2"
                                  >
                                    Amoxicillin 500mg - $32.75
                                  </label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="bill3"
                                    disabled
                                  />
                                  <label
                                    className="custom-control-label text-muted"
                                    htmlFor="bill3"
                                  >
                                    Follow-up Visit - $120.00 (Pending
                                    Insurance)
                                  </label>
                                </div>
                              </div>
                            </div>
                            <button className="btn btn-primary btn-block">
                              <i className="fas fa-lock mr-1"></i> Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Payments */}
                  <div className="card">
                    <div className="card-header bg-white">
                      <h5 className="mb-0">Recent Payments</h5>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Date</th>
                              <th scope="col">Payment Method</th>
                              <th scope="col">Reference</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Status</th>
                              <th scope="col">Receipt</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>2023-05-01</td>
                              <td>Visa •••• 4242</td>
                              <td>PAY-78945</td>
                              <td>$65.00</td>
                              <td>
                                <span className="badge badge-success">
                                  Completed
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-download"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>2023-04-15</td>
                              <td>PayPal</td>
                              <td>PAY-78231</td>
                              <td>$120.00</td>
                              <td>
                                <span className="badge badge-success">
                                  Completed
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-download"></i>
                                </button>
                              </td>
                            </tr>
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

export default Account;
