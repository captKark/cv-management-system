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
      className="container-fluid min-vh-100 d-flex align-items-center position-relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #ffffff 100%)",
      }}
    >
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "420px",
          height: "420px",
          top: "-120px",
          right: "-120px",
          background: "rgba(99,102,241,.10)",
          filter: "blur(70px)",
        }}
      />

      <div
        className="position-absolute rounded-circle"
        style={{
          width: "340px",
          height: "340px",
          bottom: "-100px",
          left: "-100px",
          background: "rgba(59,130,246,.08)",
          filter: "blur(70px)",
        }}
      />

      <div className="container position-relative">
        <div className="row justify-content-center align-items-center g-5">
          <div className="col-lg-5">
            <div className="text-center text-lg-start">
              <h1 className="display-4 fw-bold text-dark mb-3">
                CV Management
                <br />
                System
              </h1>

              <p
                className="text-secondary fs-5 mb-0"
                style={{
                  maxWidth: "480px",
                  lineHeight: "1.7",
                }}
              >
                A modern recruitment platform for managing
                candidates, recruiters, positions, CVs and
                hiring workflows through one unified system.
              </p>
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