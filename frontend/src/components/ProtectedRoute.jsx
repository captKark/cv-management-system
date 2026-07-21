import { Navigate, Outlet } from "react-router-dom";
import { USER_STORAGE_KEY } from "../constants/storage";

function ProtectedRoute({ allowedRoles }) {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
