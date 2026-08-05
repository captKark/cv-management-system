import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../services/authService";

import { clearAuth, getAuthToken, refreshStoredUser } from "../utils/auth";

import { setAuthInitialized } from "../utils/authState";

function AuthInitializer({ children }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    if (!getAuthToken()) {
      setLoading(false);
      return;
    }

    try {
      const user = await getCurrentUser();

      refreshStoredUser(user);
    } catch (error) {
      if (error.status === 401) {
        clearAuth();
        navigate("/login", { replace: true });
      } else {
        console.error("Session validation failed:", error);
      }
    } finally {
      setAuthInitialized(true);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
}

export default AuthInitializer;
