import { Link, useNavigate } from "react-router-dom";

const USER_STORAGE_KEY = "currentUser";

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem(USER_STORAGE_KEY)
  );

  const handleLogout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/positions">
          Positions
        </Link>

        <Link to="/cvs">
          CVs
        </Link>

        <Link to="/templates">
          Templates
        </Link>
      </nav>

      {user && (
        <div>
          <span>
            {user.name}
          </span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;