import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar";
import { Formik, Form, Field } from "formik";
import DatePickerField from "../../components/DatePickerField";
import axios from "axios";
import { toast } from "react-toastify";

const Inventory = () => {
 const [inventory, setInventory] = useState([]);

  const handleSubmit = async (values) => {
    const updatedValues = {
      ...values,
      isCoveredByInsurance: values.isCoveredByInsurance === "Yes",
    };
    try {
      await axios.post(
        "http://localhost:8080/api/add-inventory",
       updatedValues
      );
      toast.success("Inventory Added succesfully!");
      document.querySelector('#inventoryModal .close').click();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
     const fetchFun = async ()=> {
         const invent = await axios.get("http://localhost:8080/api/all-inventory");
         console.log(invent)
         setInventory(invent.data)
     }
     fetchFun();
  }, []);

  useEffect(() => {
    if(inventory){
      console.log("inventory return", inventory)
    }
  },[inventory])

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container-fluid p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>
                  <span className="mr-2">📦</span>Inventory Management
                </h2>
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#inventoryModal"
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
                        placeholder="Search by name, category or supplier"
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
                    <select className="form-control">
                      <option value="all">All Categories</option>
                      <option value="medication">Medication</option>
                      <option value="supplies">Medical Supplies</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button className="btn btn-outline-secondary">
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
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th>Insurance Convered</th>
                      <th>Supplier</th>
                      <th>Expiry Date</th>
                      <th>In stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((data) => (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.quantity}</td>
                      <td>{data.unit}</td>
                      <td>{data.price}</td>
                      <td>{data.isCoveredByInsurance}</td>
                      <td>{data.supplier}</td>
                      <td>{data.expiryDate}</td>
                      <td>
                        <span className="badge badge-success">In Stock</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary mr-2">
                          ✏️
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          🗑️
                        </button>
                      </td>
                    </tr>
                    ))}
             
                  </tbody>
                </table>
              </div>

              {/* Summary Cards */}
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <div className="card text-white bg-primary h-100">
                    <div className="card-body">
                      <h5 className="card-title">Total Items</h5>
                      <p className="card-text display-4">42</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                      <h5 className="card-title">Low Stock Items</h5>
                      <p className="card-text display-4">7</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card text-white bg-danger h-100">
                    <div className="card-body">
                      <h5 className="card-title">Out of Stock</h5>
                      <p className="card-text display-4">3</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add/Edit Modal */}
              <Formik
                initialValues={{
                  name: "",
                  quantity: "",
                  unit: "",
                  price: "",
                  isCoveredByInsurance: "",
                  supplier: "",
                  expiryDate: "",
                }}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div
                      className="modal fade"
                      id="inventoryModal"
                      tabIndex="-1"
                      role="dialog"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              Add New Inventory Item
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>

                          <div className="modal-body">
                            <div className="form-group">
                              <label>Medicine Name</label>
                              <Field
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter item name"
                                required
                              />
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Quantity</label>
                                  <Field
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    min="0"
                                    defaultValue="0"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Unit</label>
                                  <Field
                                    as="select"
                                    name="unit"
                                    className="form-control"
                                    defaultValue="units"
                                  >
                                    <option value="units">Units</option>
                                    <option value="boxes">Boxes</option>
                                    <option value="packs">Packs</option>
                                    <option value="bottles">Bottles</option>
                                  </Field>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Price</label>
                                  <Field
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    placeholder="Enter price"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Insurance</label>
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
                                  <label>Expiry Date (if applicable)</label>
                                  <DatePickerField name="expiryDate" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Add Item
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
