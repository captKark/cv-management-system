import { useState } from "react";

function ResetPasswordForm({
  onSubmit,
  onClose,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startLoading = () => {
    setLoading(true);
    setError("");
  };

  const stopLoading = () => {
    setLoading(false);
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

  const togglePassword = () => {
    setShowPassword((value) => !value);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((value) => !value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    startLoading();

    if (!validateForm()) {
      stopLoading();
      return;
    }

    try {
      await onSubmit(password);
    } catch (err) {
      setError(err.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">
          New Password
        </label>

        <div className="input-group">
          <input
            className="form-control"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">
          Confirm Password
        </label>

        <div className="input-group">
          <input
            className="form-control"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleConfirmPassword}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;