import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/Login";



/** the Outlet allow you to access another elements inside another routes */

export default function LoggedInRoutes() {
  const { user, token } = useSelector((state) => state.user);

  return user && token ? <Outlet /> : <Navigate to="/login" />;
}
