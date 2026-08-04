import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

import { register } from "../services/authService";
import { saveAuth } from "../utils/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] =useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  const startLoading = () => {
    setLoading(true);
    setError("");
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const togglePassword = () => {
    setShowPassword((previous) => !previous);
  };

  const buildUser = () => {
    return {
      name,
      email,
      password,
    };
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }
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
      validatePasswords();

      const auth = await register(buildUser());

      handleSuccess(auth);
    } catch (err) {
      handleError(err);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center g-5">

          <div className="col-lg-5">
            <div className="text-center text-lg-start">
              <h1 className="display-5 fw-bold mb-3">
                Join the
                <br />
                CV Management System
              </h1>

              <p className="lead text-muted">
                Create your candidate account and start applying
                for positions, managing your CVs, and tracking
                your recruitment journey.
              </p>

              <div className="mt-4">
                <span className="badge bg-primary me-2">
                  Candidate Portal
                </span>

                <span className="badge bg-success me-2">
                  Secure
                </span>

                <span className="badge bg-dark">
                  Fast Registration
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <RegisterForm
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              error={error}
              loading={loading}
              showPassword={showPassword}
              onNameChange={(e) => setName(e.target.value)}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onConfirmPasswordChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              onTogglePassword={togglePassword}
              onSubmit={handleSubmit}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;