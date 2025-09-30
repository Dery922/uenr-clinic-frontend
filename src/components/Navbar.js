import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import socket from "../services/socketService";
import { io } from "socket.io-client";



<<<<<<< HEAD
// const sockets = io("http://localhost:8080");
=======
>>>>>>> b89360a296e2e4f3149a886b8fc83e0f2768029b


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const doctorName = useSelector((state) => state.user.username);
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  console.log(notifications);

  useEffect(() => {
    if (!doctorName) return;
  
    socket.emit("joinDoctor", doctorName);

    console.log(`Doctor room joined: ${doctorName}, Socket ID: ${socket.id}`);
  
    socket.on("newNotification", (notification) => {
      console.log("Notification received:", notification);
      setNotifications((prev) => [notification, ...prev]);
    });
  
    return () => {
      socket.off("newNotification");
    };
  }, [doctorName]);

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src="/img/logo.png" width="35" height="35" alt="" />
          <span> Uenr Clinic</span>
        </Link>
      </div>
      <a id="toggle_btn" href="javascript:void(0);">
        <i className="fa fa-bars"></i>
      </a>
      <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar">
        <i className="fa fa-bars"></i>
      </a>
      <ul className="nav user-menu float-right">
        <li class="nav-item dropdown d-none d-sm-block">
          <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
            <i class="fa fa-bell-o"></i>{" "}
            {notifications.length >= 1 ? (
              <span class="badge badge-pill bg-danger float-right">3</span>
            ) : (
              ""
            )}
          </a>
          <div class="dropdown-menu notifications">
            <div class="topnav-dropdown-header">
              <span>Notifications {notifications.length}</span>
            </div>
            <div class="drop-scroll">
              <ul class="notification-list">
                <li class="notification-message">
                  <a href="activities.html">
                    <div class="media">
                      <span class="avatar">
                        <img
                          alt="John Doe"
                          src="assets/img/user.jpg"
                          class="img-fluid rounded-circle"
                        />
                      </span>
                      <div class="media-body">
                        <p class="noti-details">
                          <div>
                            <h3>Notifications</h3>
                            {notifications.length === 0 ? (
                              <p>No notifications</p>
                            ) : (
                              <ul>
                                {notifications.map((n) => (
                                  <li key={n._id}>{n.message}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </p>
                        <p class="noti-time">
                          <span class="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="topnav-dropdown-footer">
              <a href="activities.html">View all Notifications</a>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown d-none d-sm-block">
          <a
            href="javascript:void(0);"
            id="open_msg_box"
            className="hasnotifications nav-link"
          >
            <i className="fa fa-comment-o"></i>{" "}
            <span className="badge badge-pill bg-danger float-right">8</span>
          </a>
        </li>

        <li className="nav-item dropdown has-arrow">
          <a
            href="#"
            className="dropdown-toggle nav-link user-link"
            data-toggle="dropdown"
          >
            <span className="user-img">
              <img
                className="rounded-circle"
                src="/img/user.jpg"
                width="24"
                alt="Admin"
              />
              <span className="status online"></span>
            </span>
            <span>{user?.username}</span>
          </a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/profile">
              My Profile
            </Link>
            <a className="dropdown-item" href="edit-profile.html">
              Edit Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <Link className="dropdown-item" onClick={() => logout()}>
              Logout
            </Link>
          </div>
        </li>
      </ul>

      <div className="dropdown mobile-user-menu float-right">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="profile.html">
            My Profile
          </a>
          <a className="dropdown-item" href="edit-profile.html">
            Edit Profile
          </a>
          <a className="dropdown-item" href="settings.html">
            Settings
          </a>
          <a className="dropdown-item" href="login.html">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
