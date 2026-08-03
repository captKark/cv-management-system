import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/authService";
import { saveAuth } from "../utils/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const clearError = () => {
    setError("");
  };

  const updateField = (setter) => (e) => {
    setter(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword((value) => !value);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((value) => !value);
  };

  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  const validateForm = () => {
    if (!passwordsMatch()) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const buildUser = () => {
    return {
      name,
      email,
      password,
    };
  };

  const redirectToDashboard = () => {
    navigate("/dashboard");
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
    clearError();

    if (!validateForm()) {
      stopLoading();
      return;
    }

    try {
      const auth = await register(buildUser());

      handleSuccess(auth);
    } catch (err) {
      handleError(err);
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p>{error}</p>}

      <div>
        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={updateField(setName)}
          required
        />
      </div>

      <div>
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={updateField(setEmail)}
          required
        />
      </div>

      <div>
        <label>Password</label>

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={updateField(setPassword)}
          required
        />

        <button
          type="button"
          onClick={togglePassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div>
        <label>Confirm Password</label>

        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={updateField(setConfirmPassword)}
          required
        />

        <button
          type="button"
          onClick={toggleConfirmPassword}
        >
          {showConfirmPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default Register;