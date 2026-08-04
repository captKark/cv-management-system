import { Link } from "react-router-dom";

function RegisterForm({
  name,
  email,
  password,
  confirmPassword,
  error,
  loading,
  showPassword,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onSubmit,
}) {
  return (
    <div className="card border-0 shadow-lg rounded-4">
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">
            Create Account
          </h2>

          <p className="text-muted mb-0">
            Register as a candidate to start applying.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Full Name
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>

              <input
                className="form-control"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={onNameChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                className="form-control"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={onEmailChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={onPasswordChange}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onTogglePassword}
              >
                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash"
                      : "bi-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Confirm Password
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-shield-lock"></i>
              </span>

              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-semibold"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <hr className="my-4" />

        <div className="text-center">
          <span className="text-muted">
            Already have an account?{" "}
          </span>

          <Link
            to="/login"
            className="fw-semibold text-decoration-none"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;