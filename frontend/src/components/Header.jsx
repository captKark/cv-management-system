import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

function Header() {
  const navigate = useNavigate();

  const user = getCurrentUser();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          CV Management System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>

            {(user?.role === "admin" || user?.role === "recruiter") && (
              <>
                <NavLink className="nav-link" to="/positions">
                  Positions
                </NavLink>
              </>
            )}

            <NavLink className="nav-link" to="/cvs">
              CVs
            </NavLink>

            {user?.role === "admin" && (
              <>
                <NavLink className="nav-link" to="/attributes">
                  Attributes
                </NavLink>

                <NavLink className="nav-link" to="/templates">
                  Templates
                </NavLink>
              </>
            )}

            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </div>

          {user && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-white">{user.name}</span>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
