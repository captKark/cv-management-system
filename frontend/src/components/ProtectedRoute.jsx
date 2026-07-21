import { Navigate, Outlet } from "react-router-dom";
import { USER_STORAGE_KEY } from "../constants/storage";

function ProtectedRoute() {
  const user = localStorage.getItem(USER_STORAGE_KEY);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;