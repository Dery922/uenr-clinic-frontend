import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

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
            <Link
              className="dropdown-item"
             
              onClick={() => logout()}
            >
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
