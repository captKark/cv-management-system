import { Link } from "react-router-dom";

function LoginForm({
  email,
  password,
  error,
  loading,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}) {
  return (
    <div className="card border-0 shadow-lg rounded-4">
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-muted mb-0">
            Sign in to your account.
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

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                className="form-control"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
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

          <button
            className="btn btn-dark w-100 py-2 fw-semibold"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        <hr className="my-4" />

        <div className="text-center">
          <span className="text-muted">
            Don't have an account?{" "}
          </span>

          <Link
            to="/register"
            className="text-decoration-none fw-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;