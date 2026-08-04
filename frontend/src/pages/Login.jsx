import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import DemoAccounts from "../components/DemoAccounts";

import { login } from "../services/authService";
import { saveAuth } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  const buildCredentials = () => {
    return {
      email,
      password,
    };
  };

  const startLoading = () => {
    setLoading(true);
    setError("");
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const handleSuccess = (auth) => {
    saveAuth(auth);
    redirectToDashboard();
  };

  const handleError = (err) => {
    setError(err.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    startLoading();

    try {
      const auth = await login(buildCredentials());

      handleSuccess(auth);
    } catch (err) {
      handleError(err);
    } finally {
      stopLoading();
    }
  };

  const handleDemoAccount = ({
    email,
    password,
  }) => {
    setEmail(email);
    setPassword(password);
    setError("");
  };

  const togglePassword = () => {
    setShowPassword((previous) => !previous);
  };

  return (
    <div
      className="container-fluid bg-light min-vh-100 d-flex align-items-center"
    >
      <div className="container">
        <div className="row justify-content-center align-items-center g-5">
          <div className="col-lg-5">
            <div className="text-center text-lg-start">
              <h1 className="display-5 fw-bold mb-3">
                CV Management
                <br />
                System
              </h1>

              <p className="lead text-muted">
                A modern recruitment platform for managing
                candidates, recruiters, positions, CVs, and
                hiring workflows.
              </p>

              <div className="mt-4">
                <span className="badge bg-primary me-2">
                  React
                </span>

                <span className="badge bg-success me-2">
                  Express
                </span>

                <span className="badge bg-dark">
                  PostgreSQL
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <LoginForm
              email={email}
              password={password}
              error={error}
              loading={loading}
              showPassword={showPassword}
              onEmailChange={(e) =>
                setEmail(e.target.value)
              }
              onPasswordChange={(e) =>
                setPassword(e.target.value)
              }
              onTogglePassword={togglePassword}
              onSubmit={handleSubmit}
            />

            <DemoAccounts
              onSelectAccount={handleDemoAccount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;