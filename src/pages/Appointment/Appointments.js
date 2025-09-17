import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import appointmentService from "../../services/appointmentService";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState();
  const [editData, setEditData] = useState({
    _id: '',
    patient_name: '',
    doctor_name: '',
    appointment_date: '',
    appointment_time: '',
    appointment_status: ''
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await appointmentService();
        setAppointments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointment();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete-appointment/${id}`);
      toast.warning("Appointment deleted successfully");
      setAppointments((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete appointment");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/update-appointment/${editData._id}`,
        editData
      );
      toast.info("Appointment updated successfully");
      setShowEditModal(false);
      // Refresh appointments after edit
      const data = await appointmentService();
      setAppointments(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update appointment");
    }
  };

  const handleEditClick = (appointment) => {
    setEditData({
      _id: appointment._id,
      patient_name: appointment.patient_name,
      doctor_name: appointment.doctor_name,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      appointment_status: appointment.appointment_status
    });
    setShowEditModal(true);
  };
 
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
        <div class="row">
          <div class="col-sm-4 col-3"><h4 class="page-title">Patients</h4></div>
          <div class="col-sm-8 col-9 text-right m-b-20">
            <Link class="btn btn btn-primary btn-rounded float-right" 
            to="/add/appointment" data-discover="true">
              <i class="fa fa-plus"></i> Add Appointment
              </Link>
              </div>
              </div>
    
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Doctor Name</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((data) => (
                      <tr key={data._id}>
                        <td>{data.patient_name}</td>
                        <td>
                          <img
                            width="28"
                            height="28"
                            src="assets/img/user.jpg"
                            className="rounded-circle m-r-5"
                            alt=""
                          />{" "}
                          {data.doctor_name}
                        </td>
                        <td>{data.appointment_date}</td>
                        <td>{data.appointment_time}</td>
                        <td>
                          <span className={`custom-badge ${
                            data.appointment_status === "pending" 
                              ? "status-red" 
                              : "status-green"
                          }`}>
                            {data.appointment_status === "pending" 
                              ? "Pending" 
                              : "Accepted"}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a
                                className="dropdown-item"
                                onClick={() => handleEditClick(data)}
                              >
                                <i className="fa fa-pencil m-r-5"></i>Edit
                              </a>
                              <a
                                className="dropdown-item"
                                onClick={() => setSelected(data._id)}
                                data-toggle="modal"
                                data-target="#delete_appointment"
                              >
                                <i className="fa fa-trash-o m-r-5"></i> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
          <div className="col-12 col-md-6 col-lg-8 col-xl-8">
            <div
              className="card"
              style={{ position: "relative", minHeight: "200px" }}
            >
              <div className="card-header">
                <h4 className="card-title d-inline-block">
                  Upcoming Appointments
                </h4>
                <a
                  href="appointments.html"
                  className="btn btn-primary float-right"
                >
                  View all
                </a>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="d-none">
                      <tr>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Timing</th>
                        <th className="text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
          
                          <tr>
                            <td style={{ minWidth: 200 }}>
                              <a className="avatar" href="profile.html">
                                B
                              </a>
                              <h2>
                                <a href="profile.html">
                                    HOPE
                                  <span>Sunyani</span>
                                </a>
                              </h2>
                            </td>
                            <td>
                              <h5 className="time-title p-0">
                                Appointment With
                              </h5>
                              <p>doctor janes</p>
                            </td>
                            <td>
                              <h5 className="time-title p-0">Timing</h5>
                              <p>11:90</p>
                            </td>
                            <td className="text-right">
                              <a
                                href="appointments.html"
                                className="btn btn-outline-primary take-btn"
                              >
                                Take up
                              </a>
                              <a
                                href="/add/appointment"
                                className="btn btn-outline-warning take-btn"
                              >
                                Reschedule
                              </a>
                            </td>
                          </tr>
  
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </div>

        {/* Delete appointment modal (unchanged) */}
        <div
          id="delete_appointment"
          class="modal fade delete-modal"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body text-center">
                <img src="assets/img/sent.png" alt="" width="50" height="46" />
                <h3>Are you sure want to delete this Appointment?</h3>
                <div class="m-t-20">
                  {" "}
                  <a href="#" class="btn btn-white" data-dismiss="modal">
                    Cancel
                  </a>
                  <button
                    data-dismiss="modal"
                    onClick={() => handleDelete(selected)}
                    type="submit"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit appointment modal */}
        {showEditModal && (
          <div className="modal-backdrop fade show"></div>
        )}
        <div 
          className={`modal fade ${showEditModal ? 'show d-block' : ''}`} 
          tabIndex="-1" 
          role="dialog"
          aria-hidden={!showEditModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleEdit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Appointment</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Patient Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.patient_name}
                      onChange={(e) => 
                        setEditData({...editData, patient_name: e.target.value})
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Doctor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.doctor_name}
                      onChange={(e) => 
                        setEditData({...editData, doctor_name: e.target.value})
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={editData.appointment_date}
                      onChange={(e) => 
                        setEditData({...editData, appointment_date: e.target.value})
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={editData.appointment_time}
                      onChange={(e) => 
                        setEditData({...editData, appointment_time: e.target.value})
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-control"
                      value={editData.appointment_status}
                      onChange={(e) => 
                        setEditData({...editData, appointment_status: e.target.value})
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;