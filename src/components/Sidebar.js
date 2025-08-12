
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap'; // This imports Bootstrap's JavaScri



const Sidebar = () => {

    const location = useLocation();


    useEffect(() => {
        const handler = (e) => {
          e.preventDefault();
          const $link = $(e.currentTarget);
          $link.next('ul').slideToggle(300);
          $link.parent().toggleClass('active');
        };
      
        // Safely bind once DOM is fully mounted
        $(document).ready(() => {
          $('.sidebar-menu li.submenu > a').on('click', handler);
        });
      
        // Cleanup
        return () => {
          $('.sidebar-menu li.submenu > a').off('click', handler);
        };
      }, [location.pathname]);
      

    return(
        <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                    <li className="menu-title">Main</li>
                    <li className="active">
                        <Link to="/"><i className="fa fa-dashboard"></i> <span>Dashboard</span></Link>
                    </li>
   
      
                    <li>
                        <Link to="/appointment"><i className="fa fa-calendar"></i> <span>Appointments</span></Link>
                    </li>

                    <li>
                        <a href="/message-employee"><i className="fa fa-comments"></i> <span>Send Message</span></a>
                    </li>
               
                    <li className="submenu">
                        <a href="#"><i className="fa fa-wheelchair"></i> <span> Patient Management</span> <span className="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                            <li><Link to="/add-patient-doctor-record">Consultation</Link></li>
                            <li><Link to="/opd-session-today">Todays OPD</Link></li>
                            <li><Link to="/doctor-schedule">Schedule Patients</Link></li>
                            <li><Link to="/all-patient-medical-record">Medical Records</Link></li>
                            
                        </ul>
                    </li>
                    <li className="submenu">
                        <Link to="#"><i className="fa fa-cube"></i> <span> Pharmacy </span> <span className="menu-arrow"></span></Link>
                        <ul style={{display : "none" }}>
                            <li><Link to="/pharmacy">Over The Counter</Link></li>
                            <li><Link to="/inventory">Inventory</Link></li>
                         
                        </ul>
                    </li>
                    <li className="submenu">
                        <a href="#"><i className="fa fa-history"></i> <span> Labboratory </span> <span className="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                            <li><Link to="/add-patient-laptest">Add Lab Test</Link></li>
                            <li><Link to="/all-patient-lab-history">Laboratory History</Link></li>
                        </ul>
                    </li>
                    <li className="submenu">
                        <a href="#"><i className="fa fa-book"></i> <span> Records </span> <span className="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                            <li><Link to="/add-patient-record">Add Patient</Link></li>
                            <li><Link to="/all-patient-record">All Patients</Link></li>
                            <li><Link to="/add-student-record">Add Student</Link></li>
                          
                        </ul>
                    </li>
                    <li className="submenu">
                        <a href="#"><i className="fa fa-user"></i> <span> Employees </span> <span className="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                            <li><Link to="/employee">Employees List</Link></li>

                            {/* <li><Link to="/message-employee">Message Department</Link></li> */}
                        </ul>
                    </li>
                  
                    <li className="submenu">
                        <a href="#"><i className="fa fa-wheelchair"></i> <span> OPD  </span> <span className="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                            <li><Link to="/add-patient-opdward">Add Patient</Link></li>
                            <li><Link to="/all-patient-record-opd">All Patients</Link></li>
                            <li><Link to="/all-patient-record-opd-today">Today Sessions</Link></li>
               
                        </ul>
                    </li>
                    <li className="submenu">
                        <a href="#"><i className="fa fa-bed"></i> <span> Ward </span> <span className="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                           <li><Link to="/patient-ward-dashboard">Dashboard</Link></li>
                            <li><Link to="/patient-add-ward-record">Add Patient Vitals</Link></li>
                            <li><Link to="/all-patient-record-opd">All Patients</Link></li>
                            <li><Link to="/all-patient-record-opd-today">Today Sessions</Link></li>
               
                        </ul>
                    </li>
                    <li className="submenu">
							<Link to="#"><i className="fa fa-money"></i> <span> Accounts </span> <span className="menu-arrow"></span></Link>
							<ul style={{display: "none"}}>
								<li><Link to="/finance">Finance</Link></li>
								<li><a href="payments.html">Payments</a></li>
								<li><a href="expenses.html">Expenses</a></li>
								<li><a href="taxes.html">Taxes</a></li>
								<li><a href="provident-fund.html">Provident Fund</a></li>
							</ul>
						</li>
                        <li className="submenu">
							<Link to="#"><i className="fa fa-money"></i> <span> Administrator </span> <span className="menu-arrow"></span></Link>
							<ul style={{display: "none"}}>
								<li><Link to="/admin-page">Admin</Link></li>
								<li><Link to="/employee">View Users</Link></li>
                                <li><Link to="/add-doctor-schedule">Doctor Schedule</Link></li>
							
							</ul>
						</li>

      

                </ul>
            </div>
        </div>
       </div>
    )
}
export default Sidebar;