import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import { getCurrentUser } from "../utils/auth";

import StatCard from "../components/StatCard";

const POSITIONS_API = `${import.meta.env.VITE_API_URL}/api/positions`;
const CVS_API = `${import.meta.env.VITE_API_URL}/api/cvs`;

function Dashboard() {
  const [positions, setPositions] = useState([]);
  const [cvs, setCVs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = getCurrentUser();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [positionsResponse, cvsResponse] = await Promise.all([
          apiFetch(POSITIONS_API),
          apiFetch(CVS_API),
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
    active: positions.filter((p) => p.status === "Active").length,
    closed: positions.filter((p) => p.status === "Closed").length,
  };

  const cvStats = {
    total: cvs.length,
    draft: cvs.filter((cv) => cv.status === "Draft").length,
    submitted: cvs.filter((cv) => cv.status === "Submitted").length,
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "Active":
      case "Submitted":
        return "success";

      case "Draft":
        return "secondary";

      case "Interviewing":
        return "warning";

      case "Closed":
        return "danger";

      case "On Hold":
        return "dark";

      default:
        return "primary";
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h2 className="fw-bold mb-1">
            Welcome, {user?.name}
          </h2>

          <p className="text-muted mb-0">
            Logged in as{" "}
            <span className="badge bg-primary text-capitalize">
              {user?.role}
            </span>
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
          <div className="card shadow-sm h-100">
            <div className="card-header fw-semibold">
              Recent Positions
            </div>

            <div className="card-body p-0">
              {positions.length === 0 ? (
                <p className="text-center text-muted py-4 mb-0">
                  No positions available.
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {positions
                    .slice(-5)
                    .reverse()
                    .map((position) => (
                      <li
                        key={position.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <div className="fw-semibold">
                            {position.title}
                          </div>

                          <small className="text-muted">
                            {position.department}
                          </small>
                        </div>

                        <span
                          className={`badge bg-${getBadgeColor(position.status)}`}
                        >
                          {position.status}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-semibold">
              Recent CVs
            </div>

            <div className="card-body p-0">
              {cvs.length === 0 ? (
                <p className="text-center text-muted py-4 mb-0">
                  No CVs available.
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {cvs
                    .slice(-5)
                    .reverse()
                    .map((cv) => (
                      <li
                        key={cv.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <div className="fw-semibold">
                            {cv.candidateName}
                          </div>

                          <small className="text-muted">
                            {cv.positionTitle}
                          </small>
                        </div>

                        <span
                          className={`badge bg-${getBadgeColor(cv.status)}`}
                        >
                          {cv.status}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;