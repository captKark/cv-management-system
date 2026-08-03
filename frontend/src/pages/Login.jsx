import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";
import { saveAuth } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((previous) => !previous);
  };

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

  const buildCredentials = () => {
    return {
      email,
      password,
    };
  };

  const updateField = (setter) => (e) => {
    setter(e.target.value);
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p>{error}</p>}

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

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;