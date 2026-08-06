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
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-5">

        <div className="mb-5">
          <h2 className="fw-bold mb-2">
            Sign in
          </h2>

          <p className="text-muted mb-0">
            Welcome back. Please sign in to continue.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger border-0 rounded-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">
              Email Address
            </label>

            <div className="input-group">

              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-envelope text-muted"></i>
              </span>

              <input
                className="form-control border-start-0 py-3"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={onEmailChange}
                required
              />

            </div>
          </div>

          <div className="mb-4">

            <label className="form-label small fw-semibold text-secondary">
              Password
            </label>

            <div className="input-group">

              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-lock text-muted"></i>
              </span>

              <input
                className="form-control border-start-0 border-end-0 py-3"
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
                className="btn bg-white border border-start-0"
                onClick={onTogglePassword}
              >
                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash"
                      : "bi-eye"
                  } text-muted`}
                />
              </button>

            </div>
          </div>

          <button
            className="btn btn-dark w-100 py-3 fw-semibold rounded-3"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />

                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1" />

          <span className="px-3 small text-muted">
            OR
          </span>

          <hr className="flex-grow-1" />
        </div>

        <div className="text-center">

          <span className="text-muted">
            New to CV Management System?
          </span>

          <br />

          <Link
            to="/register"
            className="fw-semibold text-decoration-none"
          >
            Create an account
          </Link>

        </div>

      </div>
    </div>
  );
}

export default LoginForm;