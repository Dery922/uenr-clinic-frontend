import { Link } from "react-router-dom";

const Sidebar = () => {
    return(
        <div class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
            <div id="sidebar-menu" class="sidebar-menu">
                <ul>
                    <li class="menu-title">Main</li>
                    <li class="active">
                        <Link to="/"><i class="fa fa-dashboard"></i> <span>Dashboard</span></Link>
                    </li>
                    <li>
                        <Link to="/doctors"><i class="fa fa-user-md"></i> <span>Doctors</span></Link>
                    </li>
                    <li>
                        <Link to="/patients"><i class="fa fa-wheelchair"></i> <span>Patients</span></Link>
                    </li>
                    <li>
                        <Link to="/appointment"><i class="fa fa-calendar"></i> <span>Appointments</span></Link>
                    </li>
                    <li>
                        <Link to="/schedule"><i class="fa fa-calendar-check-o"></i> <span>Doctor Schedule</span></Link>
                    </li>
                    <li>
                        <Link to="/department"><i class="fa fa-hospital-o"></i> <span>Departments</span></Link>
                    </li>
                    <li class="submenu">
                        <a href="#"><i class="fa fa-user"></i> <span> Employees </span> <span class="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                            <li><a href="employees.html">Employees List</a></li>
                            <li><a href="leaves.html">Leaves</a></li>
                            <li><a href="holidays.html">Holidays</a></li>
                            <li><a href="attendance.html">Attendance</a></li>
                        </ul>
                    </li>
                    <li class="submenu">
                        <a href="#"><i class="fa fa-cube"></i> <span> Records </span> <span class="menu-arrow"></span></a>
                        <ul style={{display : "none" }}>
                            <li><a href="employees.html">Employees List</a></li>
                            <li><a href="leaves.html">Leaves</a></li>
                            <li><a href="holidays.html">Holidays</a></li>
                            <li><a href="attendance.html">Attendance</a></li>
                        </ul>
                    </li>
                    <li class="submenu">
							<Link to="#"><i class="fa fa-money"></i> <span> Accounts </span> <span class="menu-arrow"></span></Link>
							<ul style={{display: "none"}}>
								<li><a href="invoices.html">Invoices</a></li>
								<li><a href="payments.html">Payments</a></li>
								<li><a href="expenses.html">Expenses</a></li>
								<li><a href="taxes.html">Taxes</a></li>
								<li><a href="provident-fund.html">Provident Fund</a></li>
							</ul>
						</li>

      

                </ul>
            </div>
        </div>
    </div>
    )
}
export default Sidebar;