import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({allowedRoles, children}) => {
  const user = useSelector((state) => state.user.user);
    
        if(!user ) {
          return <Navigate to="/login" replace />
        }

        if (!allowedRoles.includes(user.role)) {
          return <Navigate to="/unauthorized"  />;
        }
   
     return children;
     
}

export default ProtectedRoute;