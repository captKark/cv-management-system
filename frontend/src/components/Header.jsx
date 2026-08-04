import { Link, NavLink, useNavigate } from "react-router-dom";

import { getCurrentUser, hasRole, logout } from "../utils/auth";

function Header() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          <div className="fw-bold fs-5">CV Management System</div>
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
          <div className="navbar-nav mx-auto gap-2">
            <NavLink className="nav-link px-3" to="/dashboard">
              Dashboard
            </NavLink>

            {hasRole("admin", "recruiter") && (
              <NavLink className="nav-link px-3" to="/positions">
                Positions
              </NavLink>
            )}

            {hasRole("admin") && (
              <NavLink className="nav-link px-3" to="/users">
                Users
              </NavLink>
            )}

            <NavLink className="nav-link px-3" to="/cvs">
              CVs
            </NavLink>

            {hasRole("admin") && (
              <>
                <NavLink className="nav-link px-3" to="/attributes">
                  Attributes
                </NavLink>

                <NavLink className="nav-link px-3" to="/templates">
                  Templates
                </NavLink>
              </>
            )}
            <NavLink className="nav-link px-3" to="/profile">
              Profile
            </NavLink>
            <NavLink className="nav-link px-3" to="/about">
              About
            </NavLink>
          </div>

          {user && (
            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <div className="fw-semibold text-white">{user.name}</div>
              </div>

              <button
                className="btn btn-light btn-sm px-3"
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
