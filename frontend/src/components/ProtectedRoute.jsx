import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function ProtectedRoute({ allowedRoles }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
