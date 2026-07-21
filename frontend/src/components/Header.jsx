import { Link, useNavigate } from "react-router-dom";
import { USER_STORAGE_KEY } from "../constants/storage";
import { hasRole, getCurrentUser } from "../utils/auth";

function Header() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <nav>
        <Link to="/dashboard">Dashboard</Link>

        {hasRole("admin", "recruiter") && (
          <Link to="/positions">Positions</Link>
        )}

        <Link to="/cvs">CVs</Link>

        {hasRole("admin") && <Link to="/templates">Templates</Link>}
      </nav>

      {user && (
        <div>
          <span>{user.name}</span>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;
