import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <>
      <h1>403</h1>

      <p>You do not have permission to access this page.</p>

      <Link to="/dashboard">
        Return to Dashboard
      </Link>
    </>
  );
}

export default Unauthorized;