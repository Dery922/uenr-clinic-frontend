import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, token } = useSelector((state) => state.user);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};


export default ProtectedRoute;
