import { useEffect, useState } from "react";
import { USER_STORAGE_KEY } from "../constants/storage";
import StatCard from "../components/StatCard";

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
<div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-2">Welcome, {user?.name}</h2>

          <p className="text-muted mb-0">
            Role: <strong>{user?.role}</strong>
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <StatCard title="Total Positions" value={positionStats.total} />

        <StatCard title="Active Positions" value={positionStats.active} />

        <StatCard title="Closed Positions" value={positionStats.closed} />

        <StatCard title="Total CVs" value={cvStats.total} />

        <StatCard title="Draft CVs" value={cvStats.draft} />

        <StatCard title="Submitted CVs" value={cvStats.submitted} />
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header">Recent Positions</div>

            <ul className="list-group list-group-flush">
              {positions
                .slice(-5)
                .reverse()
                .map((position) => (
                  <li key={position.id} className="list-group-item">
                    {position.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header">Recent CVs</div>

            <ul className="list-group list-group-flush">
              {cvs
                .slice(-5)
                .reverse()
                .map((cv) => (
                  <li key={cv.id} className="list-group-item">
                    {cv.candidateName}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
