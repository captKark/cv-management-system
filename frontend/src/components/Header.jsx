import { Link, useNavigate } from "react-router-dom";
import { USER_STORAGE_KEY } from "../constants/storage";

function Header() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <nav>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/positions">Positions</Link>

        <Link to="/cvs">CVs</Link>

        <Link to="/templates">Templates</Link>
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
