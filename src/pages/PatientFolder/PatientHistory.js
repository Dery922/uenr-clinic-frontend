import Sidebar from "../../components/Sidebar";
const PatientHistory = () => {
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div class="container mt-4">
            <div class="card shadow-sm">
              <div class="card-header bg-primary text-white">
                <h5>
                  <i class="fas fa-user-injured mr-2"></i> Patient Medical
                  History
                </h5>
              </div>

              <div class="card-body">
                <ul class="nav nav-tabs" id="historyTabs" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="medical-tab"
                      data-toggle="tab"
                      href="#medical"
                      role="tab"
                    >
                      <i class="fas fa-heartbeat mr-1"></i> Medical
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="surgical-tab"
                      data-toggle="tab"
                      href="#surgical"
                      role="tab"
                    >
                      <i class="fas fa-procedures mr-1"></i> Surgical
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="medications-tab"
                      data-toggle="tab"
                      href="#medications"
                      role="tab"
                    >
                      <i class="fas fa-pills mr-1"></i> Medications
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="allergies-tab"
                      data-toggle="tab"
                      href="#allergies"
                      role="tab"
                    >
                      <i class="fas fa-allergies mr-1"></i> Allergies
                    </a>
                  </li>
                </ul>

                <div
                  class="tab-content p-3 border border-top-0"
                  id="historyTabsContent"
                >
                  <div
                    class="tab-pane fade show active"
                    id="medical"
                    role="tabpanel"
                  >
                    <div class="history-section">
                      <h6 class="text-primary">
                        <i class="fas fa-file-medical mr-2"></i>Chronic
                        Conditions
                      </h6>
                      <div class="form-group">
                        <textarea
                          class="form-control"
                          rows="3"
                          placeholder="List any chronic conditions (e.g., Diabetes, Hypertension)..."
                        ></textarea>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="history-section">
                          <h6 class="text-primary">
                            <i class="fas fa-calendar-check mr-2"></i>Last
                            Physical Exam
                          </h6>
                          <input type="date" class="form-control" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="history-section">
                          <h6 class="text-primary">
                            <i class="fas fa-tint mr-2"></i>Blood Type
                          </h6>
                          <select class="form-control">
                            <option value="">Select Blood Type</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="surgical" role="tabpanel">
                    <div class="history-section">
                      <h6 class="text-primary">
                        <i class="fas fa-procedures mr-2"></i>Past Surgeries
                      </h6>
                      <div class="form-group">
                        <textarea
                          class="form-control"
                          rows="3"
                          placeholder="List any past surgeries with approximate dates..."
                        ></textarea>
                      </div>
                    </div>

                    <div class="history-section">
                      <h6 class="text-primary">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Surgical
                        Complications
                      </h6>
                      <div class="form-group">
                        <textarea
                          class="form-control"
                          rows="2"
                          placeholder="Any complications from surgeries..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="medications" role="tabpanel">
                    <div class="history-section">
                      <h6 class="text-primary">
                        <i class="fas fa-pills mr-2"></i>Current Medications
                      </h6>

                      <div class="row mb-3">
                        <div class="col-md-5">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Medication Name"
                          />
                        </div>
                        <div class="col-md-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Dosage"
                          />
                        </div>
                        <div class="col-md-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Frequency"
                          />
                        </div>
                        <div class="col-md-1">
                          <button class="btn btn-outline-primary btn-block">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div id="medicationList">
                        <div class="medication-item">
                          <div class="d-flex justify-content-between">
                            <div>
                              <strong>Metformin</strong> - 500mg (Twice daily)
                            </div>
                            <button class="btn btn-sm btn-link text-danger">
                              <i class="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                        <div class="medication-item">
                          <div class="d-flex justify-content-between">
                            <div>
                              <strong>Lisinopril</strong> - 10mg (Daily)
                            </div>
                            <button class="btn btn-sm btn-link text-danger">
                              <i class="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="allergies" role="tabpanel">
                    <div class="history-section">
                      <h6 class="text-primary">
                        <i class="fas fa-allergies mr-2"></i>Known Allergies
                      </h6>

                      <div class="row mb-3">
                        <div class="col-md-6">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Allergen (e.g., Penicillin)"
                          />
                        </div>
                        <div class="col-md-5">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Reaction (e.g., Rash)"
                          />
                        </div>
                        <div class="col-md-1">
                          <button class="btn btn-outline-primary btn-block">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div id="allergyList">
                        <div class="allergy-item">
                          <div class="d-flex justify-content-between">
                            <div>
                              <strong>Penicillin</strong> - Rash
                            </div>
                            <button class="btn btn-sm btn-link text-danger">
                              <i class="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <button class="btn btn-outline-secondary">
                    <i class="fas fa-print mr-2"></i>Print Form
                  </button>
                  <div>
                    <button class="btn btn-outline-danger mr-2">
                      <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                    <button class="btn btn-primary">
                      <i class="fas fa-save mr-2"></i>Save History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
