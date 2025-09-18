import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

console.log("🔑 Current user in Redux:", user);
console.log("Role:", user?.role);



const ProtectedRoute = ({allowedRoles, children}) => {
  const user = useSelector((state) => state.user.user);
    
        if(!user ) {
          return <Navigate to="/login" replace />
        }

 if (!user || !allowedRoles.map(r => r.toLowerCase()).includes(user.role?.toLowerCase())) {
  return <Navigate to="/unauthorized" />;
}

   
     return children;
     
}

export default ProtectedRoute;
