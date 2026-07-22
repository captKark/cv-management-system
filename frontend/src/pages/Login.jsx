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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
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

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background: "linear-gradient(135deg, #0d6efd 0%, #6ea8fe 100%)",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "18px",
            }}
          >
            <div className="card-body p-4 p-lg-5">
              <div className="text-center mb-4">
                <div
                  className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center shadow mb-3"
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <i
                    className="bi bi-file-earmark-person-fill text-white"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>

                <h2 className="fw-bold mb-2">CV Management System</h2>

                <p className="text-muted mb-0">
                  Manage Positions & Candidate CVs
                </p>
              </div>

              {error && (
                <div className="alert alert-danger text-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <div className="alert alert-info mb-4">
                <div className="fw-semibold mb-3">Demo Accounts</div>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm text-start"
                    onClick={() => fillDemoAccount("admin")}
                  >
                    <strong>Administrator</strong>
                    <br />
                    <small>admin@test.com</small>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm text-start"
                    onClick={() => fillDemoAccount("recruiter")}
                  >
                    <strong>Recruiter</strong>
                    <br />
                    <small>recruiter@test.com</small>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm text-start"
                    onClick={() => fillDemoAccount("candidate")}
                  >
                    <strong>Candidate</strong>
                    <br />
                    <small>candidate@test.com</small>
                  </button>
                </div>
              </div>
              <div className="fw-semibold mb-2">Demo Accounts</div>

              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => fillDemoAccount("admin")}
                >
                  Admin
                </button>

                <button
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={() => fillDemoAccount("recruiter")}
                >
                  Recruiter
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => fillDemoAccount("candidate")}
                >
                  Candidate
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${
                        showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <hr className="my-4" />

            <div className="text-center text-muted small">
              <div className="fw-semibold">CV Management System</div>

              <div>Recruitment Platform</div>

              <div className="mt-2">
                Built with React • Express • Prisma • PostgreSQL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
