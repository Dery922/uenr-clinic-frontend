import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar";
import { Formik, Form, Field } from "formik";
import DatePickerField from "../../components/DatePickerField";
import axios from "axios";
import { toast } from "react-toastify";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (values) => {
    console.log("Submitting values:", values); // 👈 Add this
    try {
      await axios.post("http://localhost:8080/api/add-inventory"||`${process.env.REACT_APP_API_URL}`, {
        ...values,

        isCoveredByInsurance: values.isCoveredByInsurance === "Yes",
      });
      toast.success("Inventory Added successfully!");
      fetchInventory();
      setShowModal(false);
    } catch (err) {
      toast.error("Error adding inventory");
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/all-inventory");
      setInventory(response.data);
      setFilteredInventory(response.data);
    } catch (err) {
      toast.error("Failed to load inventory");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    let results = inventory;
    
    if (searchTerm) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    setFilteredInventory(results);
  }, [searchTerm, selectedCategory, inventory]);

  const getStockStatus = (quantity, minStockLevel = 5) => {
    if (quantity === 0) return { text: "Out of Stock", class: "danger" };
    if (quantity <= minStockLevel) return { text: "Low Stock", class: "warning" };
    return { text: "In Stock", class: "success" };
  };

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container-fluid p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><span className="mr-2">📦</span>Inventory Management</h2>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowModal(true)}
                >
                  <span className="mr-1">+</span> Add New Item
                </button>
              </div>

              {/* Filters */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Search Inventory</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search medication name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">🔍</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Filter by Category</label>
                    <select 
                      className="form-control"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="medication">Medication</option>
                      <option value="supplies">Medical Supplies</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}>
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Medicine Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Price (₵)</th>
                      <th>Insurance Covered</th>
                      <th>Supplier</th>
                      <th>Expiry Date</th>
                      <th>Stock Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((data) => {
                      const stockStatus = getStockStatus(data.quantity);
                      return (
                        <tr key={data._id}>
                          <td className="font-weight-bold">{data.name}</td>
                          <td>
                            <span className="badge badge-info text-capitalize">
                              {data.category || 'medication'}
                            </span>
                          </td>
                          <td>{data.quantity}</td>
                          <td>{data.unit}</td>
                          <td>₵{data.price?.toFixed(2)}</td>
                          <td>
                            <span className={`badge badge-${data.isCoveredByInsurance ? 'success' : 'secondary'}`}>
                              {data.isCoveredByInsurance ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td>{data.supplier}</td>
                          <td>
                            {data.expiryDate ? new Date(data.expiryDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td>
                            <span className={`badge badge-${stockStatus.class}`}>
                              {stockStatus.text}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary mr-2" title="Edit">
                              ✏️
                            </button>
                            <button className="btn btn-sm btn-outline-danger" title="Delete">
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredInventory.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">No inventory items found</p>
                  </div>
                )}
              </div>

              {/* Summary Cards */}
              <div className="row mt-4">
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-primary h-100">
                    <div className="card-body text-center">
                      <h6 className="card-title">Total Items</h6>
                      <p className="card-text display-4">{inventory.length}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-warning h-100">
                    <div className="card-body text-center">
                      <h6 className="card-title">Low Stock</h6>
                      <p className="card-text display-4">
                        {inventory.filter(item => item.quantity > 0 && item.quantity <= 5).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-danger h-100">
                    <div className="card-body text-center">
                      <h6 className="card-title">Out of Stock</h6>
                      <p className="card-text display-4">
                        {inventory.filter(item => item.quantity === 0).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-white bg-success h-100">
                    <div className="card-body text-center">
                      <h6 className="card-title">In Stock</h6>
                      <p className="card-text display-4">
                        {inventory.filter(item => item.quantity > 5).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Item Modal */}
              {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add New Inventory Item</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => setShowModal(false)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      
                      <Formik
                        initialValues={{
                          name: "",
                          quantity: "",
                          unit: "units",
                          price: "",
                          isCoveredByInsurance: "No",
                          supplier: "",
                          expiryDate: "",
                          category: "medication"
                        }}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <div className="modal-body">
                              <div className="form-group">
                                <label>Medicine Name *</label>
                                <Field
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Enter medicine name"
                                  required
                                />
                              </div>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Quantity *</label>
                                    <Field
                                      type="number"
                                      name="quantity"
                                      className="form-control"
                                      min="0"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Unit *</label>
                                    <Field
                                      as="select"
                                      name="unit"
                                      className="form-control"
                                      required
                                    >
                                      <option value="units">Units</option>
                                      <option value="boxes">Boxes</option>
                                      <option value="packs">Packs</option>
                                      <option value="bottles">Bottles</option>
                                      <option value="tablets">Tablets</option>
                                      <option value="capsules">Capsules</option>
                                    </Field>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Price (₵) *</label>
                                    <Field
                                      type="number"
                                      name="price"
                                      className="form-control"
                                      placeholder="0.00"
                                      step="0.01"
                                      min="0"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Insurance Covered</label>
                                    <Field
                                      as="select"
                                      name="isCoveredByInsurance"
                                      className="form-control"
                                    >
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </Field>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Supplier</label>
                                    <Field
                                      type="text"
                                      name="supplier"
                                      className="form-control"
                                      placeholder="Enter supplier name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Category</label>
                                    <Field
                                      as="select"
                                      name="category"
                                      className="form-control"
                                    >
                                      <option value="medication">Medication</option>
                                      <option value="supplies">Medical Supplies</option>
                                      <option value="equipment">Equipment</option>
                                    </Field>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <label>Expiry Date (if applicable)</label>
                                <DatePickerField name="expiryDate" />
                              </div>
                            </div>

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? 'Adding...' : 'Add Item'}
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;