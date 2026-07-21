import { useEffect, useState } from "react";
import { USER_STORAGE_KEY } from "../constants/storage";

const POSITIONS_API = `${import.meta.env.VITE_API_URL}/api/positions`;
const CVS_API = `${import.meta.env.VITE_API_URL}/api/cvs`;

function Dashboard() {
  const [positions, setPositions] = useState([]);
  const [cvs, setCVs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  const user = storedUser ? JSON.parse(storedUser) : null;
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [positionsResponse, cvsResponse] = await Promise.all([
          fetch(POSITIONS_API),
          fetch(CVS_API),
        ]);

        if (!positionsResponse.ok || !cvsResponse.ok) {
          throw new Error("Failed to load dashboard.");
        }

        const positionsData = await positionsResponse.json();

        const cvsData = await cvsResponse.json();

        setPositions(positionsData);
        setCVs(cvsData);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const positionStats = {
    total: positions.length,
    active: positions.filter((position) => position.status === "Active").length,
    closed: positions.filter((position) => position.status === "Closed").length,
  };

  const cvStats = {
    total: cvs.length,
    draft: cvs.filter((cv) => cv.status === "Draft").length,
    submitted: cvs.filter((cv) => cv.status === "Submitted").length,
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Dashboard</h1>

      <p>Welcome {user?.name}</p>

      <p>Role: {user?.role}</p>

      <hr />

      <h2>Positions</h2>

      <p>Total: {positionStats.total}</p>

      <p>Active: {positionStats.active}</p>

      <p>Closed: {positionStats.closed}</p>

      <hr />

      <h2>CVs</h2>

      <p>Total: {cvStats.total}</p>

      <p>Draft: {cvStats.draft}</p>

      <p>Submitted: {cvStats.submitted}</p>
    </>
  );
}
export default Dashboard;
