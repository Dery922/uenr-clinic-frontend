import { useEffect, useState } from "react";
import appointmentService from "../services/appointmentService";
import { EmployeeService } from "../services/employeesService";
import DotLoader from "react-spinners/DotLoader";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { LineChart, Line } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  allOutPatientsService,
  allPatientsService,
  allPatientsStudentService,
  allUsersService,
  barChartPatient,
  genderPieChartService,
} from "./dashbaordServices";
import FullScreenLoader from "./FullScreenLoader";
const data = [
  { name: "Malaria", patients: 30 },
  { name: "Tubaclosis", patients: 45 },
  { name: "Covid-19", patients: 10 },
  { name: "Dental", patients: 20 },
  { name: "Body-pains", patients: 80 },
  { name: "Titanus", patients: 10 },
  { name: "rabees", patients: 24 },
];

const pieData = [
  { name: "Male", value: 400 },
  { name: "Female", value: 300 },
];
// const COLORS = ["#0088FE", "#FF8042"];
const COLORS = ["#8884d8", "#FF69B4"];

const Dashboard = () => {
  const [numberOfPatients, setNumberOfPatients] = useState();
  const [numberOfUsers, setNumberOfUsers] = useState();
  const [appointments, setAppointment] = useState();
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [allUsr, setAllUsr] = useState(null);
  const [allP, setAllP] = useState(null);
  const [allS, setAllS] = useState(null);
  const [allO, setAllO] = useState(null);
  const [dataBar, setDataBar] = useState();
  const [gendData, setGendData] = useState([]);


  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const getAppointment = await appointmentService();
        const getDoctors = await EmployeeService();
        setAllDoctors(getDoctors);
        setAppointment(getAppointment);
      } catch (error) {
        setLoading(false);
        console.log("Error on this side");
      }
    };

    fetchAppointment();
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await allUsersService();
      setAllUsr(data);
      const dataP = await allPatientsService();
      setAllP(dataP);
      const dataS = await allPatientsStudentService();
      setAllS(dataS);
      const dataO = await allOutPatientsService();
      setAllO(dataO);
      const barC = await barChartPatient();
      setDataBar(barC);
      const genderData = await genderPieChartService();
      setGendData(genderData);
      console.log(genderData)
    };
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      {/* <FullScreenLoader loading={loading} /> */}
      <div className="content">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg1">
                <i className="fa fa-stethoscope" aria-hidden="true"></i>
              </span>
              <div className="dash-widget-info text-right">
                <h3>{allUsr}</h3>
                <span className="widget-title1">
                  {" "}
                  Users <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg2">
                <i className="fa fa-user-o"></i>
              </span>
              <div className="dash-widget-info text-right">
                <h3>{allP}</h3>
                <span className="widget-title2">
                  Patients <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg2">
                <i className="fa fa-user-o"></i>
              </span>
              <div className="dash-widget-info text-right">
                <h3>{allS}</h3>
                <span className="widget-title2">
                  Students Patients
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg3">
                <i className="fa fa-user-md" aria-hidden="true"></i>
              </span>
              <div className="dash-widget-info text-right">
                <h3>{allO}</h3>
                <span className="widget-title3">
                  Out - Patients{" "}
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg4">
                <i className="fa fa-heartbeat" aria-hidden="true"></i>
              </span>
              <div className="dash-widget-info text-right">
                <h3>618</h3>
                <span className="widget-title4">
                  Pending <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <div className="card">
              <div className="card-body">
                <div className="chart-title">
                  <h4>Patients for Each months</h4>
                  <span className="float-right">
                    <i className="fa fa-caret-up" aria-hidden="true"></i> 15%
                    Higher than Last Month
                  </span>
                </div>
                <canvas id="linegraph"></canvas>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataBar}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Patients" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <div className="card">
              <div className="card-body">
                <div className="chart-title">
                  <h4>Diagnosis Analysis Chart</h4>
                  <span className="float-right">
                    <i className="fa fa-caret-up" aria-hidden="true"></i> 15%
                    Higher than Last Month
                  </span>
                </div>
                <canvas id="linegraph"></canvas>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="patients" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <div className="card">
              <div className="card-body">
                <div className="chart-title">
                  <h4>Gender Patients</h4>
                  <span className="float-right">
                    <i className="fa fa-caret-up" aria-hidden="true"></i> 15%
                    Higher than Last Month
                  </span>
                </div>
                {/* <canvas id="linegraph"></canvas> */}
                <PieChart width={400} height={300}>
                  <Pie
                    data={gendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {gendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
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
                      {loading ? (
                        appointments &&
                        appointments.map((data) => (
                          <tr key={data.id}>
                            <td style={{ minWidth: 200 }}>
                              <a className="avatar" href="profile.html">
                                B
                              </a>
                              <h2>
                                <a href="profile.html">
                                  {data.patient_name}
                                  <span>{data.address}</span>
                                </a>
                              </h2>
                            </td>
                            <td>
                              <h5 className="time-title p-0">
                                Appointment With
                              </h5>
                              <p>{data.doctor_name}</p>
                            </td>
                            <td>
                              <h5 className="time-title p-0">Timing</h5>
                              <p>{data.appointment_time}</p>
                            </td>
                            <td className="text-right">
                              <a
                                href="appointments.html"
                                className="btn btn-outline-primary take-btn"
                              >
                                Take up
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                          }}
                        >
                          <DotLoader color="blue" size={100} />
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-4">
            <div className="card member-panel">
              <div className="card-header bg-white">
                <h4 className="card-title mb-0">Doctors</h4>
              </div>
              <div className="card-body">
                <ul className="contact-list">
                  {allDoctors &&
                    allDoctors.map((data) => (
                      <li>
                        <div className="contact-cont">
                          <div className="float-left user-img m-r-10">
                            <a href="profile.html" title="John Doe">
                              <img
                                src="assets/img/user.jpg"
                                alt=""
                                className="w-40 rounded-circle"
                              />
                              <span className="status online"></span>
                            </a>
                          </div>
                          <div className="contact-info">
                            {data.role === "Doctor" ? (
                              <span></span>
                            ) : (
                              <span className="contact-name text-ellipsis">
                                No Doctors
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="card-footer text-center bg-white">
                <a href="doctors.html" className="text-muted">
                  View all Doctors
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8 col-xl-8">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title d-inline-block">New Patients </h4>{" "}
                <a href="patients.html" className="btn btn-primary float-right">
                  View all
                </a>
              </div>
              <div className="card-block">
                {/* <div className="table-responsive">
                                <table className="table mb-0 new-patient-table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
                                                <h2>John Doe</h2>
                                            </td>
                                            <td>Johndoe21@gmail.com</td>
                                            <td>+1-202-555-0125</td>
                                            <td><button className="btn btn-primary btn-primary-one float-right">Fever</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
                                                <h2>Richard</h2>
                                            </td>
                                            <td>Richard123@yahoo.com</td>
                                            <td>202-555-0127</td>
                                            <td><button className="btn btn-primary btn-primary-two float-right">Cancer</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
                                                <h2>Villiam</h2>
                                            </td>
                                            <td>Richard123@yahoo.com</td>
                                            <td>+1-202-555-0106</td>
                                            <td><button className="btn btn-primary btn-primary-three float-right">Eye</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
                                                <h2>Martin</h2>
                                            </td>
                                            <td>Richard123@yahoo.com</td>
                                            <td>776-2323 89562015</td>
                                            <td><button className="btn btn-primary btn-primary-four float-right">Fever</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-4">
            <div className="hospital-barchart">
              <h4 className="card-title d-inline-block">Hospital Management</h4>
            </div>
            <div className="bar-chart">
              <div className="legend">
                <div className="item">
                  <h4>Level1</h4>
                </div>

                <div className="item">
                  <h4>Level2</h4>
                </div>
                <div className="item text-right">
                  <h4>Level3</h4>
                </div>
                <div className="item text-right">
                  <h4>Level4</h4>
                </div>
              </div>
              <div className="chart clearfix">
                <div className="item">
                  <div className="bar">
                    <span className="percent">16%</span>
                    <div className="item-progress" data-percent="16">
                      <span className="title">OPD Patient</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="bar">
                    <span className="percent">71%</span>
                    <div className="item-progress" data-percent="71">
                      <span className="title">New Patient</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="bar">
                    <span className="percent">82%</span>
                    <div className="item-progress" data-percent="82">
                      <span className="title">Laboratory Test</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="bar">
                    <span className="percent">67%</span>
                    <div class="item-progress" data-percent="67">
                      <span className="title">Treatment</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="bar">
                    <span className="percent">30%</span>
                    <div className="item-progress" data-percent="30">
                      <span className="title">Discharge</span>
                    </div>
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

export default Dashboard;
