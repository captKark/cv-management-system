import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCurrentUser } from "../utils/auth";

import {
  isAuthInitialized,
  subscribeAuthState,
} from "../utils/authState";


function ProtectedRoute({ allowedRoles }) {
  const [initialized, setInitialized] = useState(
    isAuthInitialized(),
  );

  useEffect(() => {
    return subscribeAuthState(setInitialized);
  }, []);


  if (!initialized) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }


  const user = getCurrentUser();


  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }


  return <Outlet />;
}


export default ProtectedRoute;