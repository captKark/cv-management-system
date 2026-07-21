import { Navigate, Outlet } from "react-router-dom";

const USER_STORAGE_KEY = "currentUser";

function ProtectedRoute() {
  const user = localStorage.getItem(USER_STORAGE_KEY);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;