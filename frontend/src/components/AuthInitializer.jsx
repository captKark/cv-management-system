import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../services/authService";

import { clearAuth, getAuthToken, saveAuth } from "../utils/auth";
import { getStoredAuth } from "../utils/auth";

function AuthInitializer({ children }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const initializeAuth = async () => {
    if (!hasToken()) {
      return finishLoading();
    }

    try {
      await validateSession();
    } catch {
      handleInvalidSession();
    }

    finishLoading();
  };

  const hasToken = () => {
    return Boolean(getAuthToken());
  };

  const validateSession = async () => {
    const user = await getCurrentUser();

    refreshStoredUser(user);
  };

  const handleInvalidSession = () => {
    clearAuth();

    navigate("/login", { replace: true });
  };

  const finishLoading = () => {
    setLoading(false);
  };
  useEffect(() => {
    initializeAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
}

export default AuthInitializer;
