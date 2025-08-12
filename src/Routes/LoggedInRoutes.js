import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/Login";



/** the Outlet allow you to access another elements inside another routes */

export default function LoggedInRoutes() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
}