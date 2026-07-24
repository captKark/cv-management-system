import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_STORAGE_KEY } from "../constants/storage";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeDemoRole, setActiveDemoRole] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in.");
      }

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (role) => {
    setActiveDemoRole(role); // Highlight clicked button

    switch (role) {
      case "admin":
        setEmail("admin@test.com");
        setPassword("admin123");
        break;
      case "recruiter":
        setEmail("recruiter@test.com");
        setPassword("recruit123");
        break;
      case "candidate":
        setEmail("candidate@test.com");
        setPassword("candidate123");
        break;
      default:
        break;
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setActiveDemoRole(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setActiveDemoRole(null);
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              backgroundColor: "#ffffff",
            }}
          >
            <div className="card-body p-4 p-sm-5">
              {}
              <div className="text-center mb-4">
                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "64px", height: "64px" }}
                >
                  <i className="bi bi-file-earmark-person fs-2"></i>
                </div>
                <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
                <p className="text-muted small">
                  Manage positions & candidate CVs efficiently
                </p>
              </div>

              {}
              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center small py-2 px-3 mb-4 rounded-3"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-6"></i>
                  <div>{error}</div>
                </div>
              )}

              {}
              <div className="bg-light p-3 rounded-3 mb-4 border">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span
                    className="text-uppercase fw-bold text-muted extra-small"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Quick Demo Access
                  </span>
                  <i className="bi bi-lightning-charge-fill text-warning"></i>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  {["admin", "recruiter", "candidate"].map((role) => {
                    const isActive = activeDemoRole === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        className={`btn btn-sm flex-fill rounded-pill transition-all ${
                          isActive
                            ? "btn-primary shadow-sm fw-bold"
                            : "btn-white border text-secondary shadow-sm fw-medium"
                        }`}
                        onClick={() => fillDemoAccount(role)}
                      >
                        {isActive && <i className="bi bi-check2 me-1"></i>}
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small mb-1">
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control bg-light border-start-0"
                      placeholder="name@company.com"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary small mb-1">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control bg-light border-start-0 border-end-0"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-light border border-start-0 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary py-2.5 w-100 fw-semibold shadow-sm rounded-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {}
              <div className="text-center mt-4 pt-3 border-top">
                <p
                  className="text-muted extra-small mb-0"
                  style={{ fontSize: "0.75rem" }}
                >
                  <strong>CV Management System</strong> • Recruitment Platform
                </p>
                <p
                  className="text-muted extra-small mb-0"
                  style={{ fontSize: "0.7rem" }}
                >
                  React • Express • Prisma • PostgreSQL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;