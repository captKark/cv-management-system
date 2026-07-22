import StatusBadge from "./StatusBadge";

function PositionTable({
  positions,
  selectedPositions,
  allSelected,
  onToggleSelection,
  onSelectAll,
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="text-center" style={{ width: "60px" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                  />
                </th>

                <th className="text-nowrap">Title</th>
                <th className="text-nowrap">Department</th>
                <th className="text-nowrap">Attributes</th>
                <th className="text-nowrap">Visibility</th>
                <th className="text-nowrap">Project Tag</th>
                <th className="text-nowrap">Max Projects</th>
                <th className="text-nowrap">Location</th>
                <th className="text-nowrap">Status</th>
              </tr>
            </thead>

            <tbody>
              {positions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-muted py-5">
                    <h5 className="mb-2">No positions found</h5>

                    <p className="mb-0">
                      Try changing your search or create a new position.
                    </p>
                  </td>
                </tr>
              ) : (
                positions.map((position) => {
                  const isSelected = selectedPositions.includes(position.id);

                  return (
                    <tr key={position.id}>
                      <td className="text-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelection(position.id)}
                        />
                      </td>

                      <td>{position.title}</td>

                      <td>{position.department}</td>

                      <td>
                        {position.attributes?.length > 0 ? (
                          <span className="badge bg-info">
                            {position.attributes.length} assigned
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            position.visibility === "Public"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {position.visibility}
                        </span>
                      </td>

                      <td>{position.projectTag || "—"}</td>

                      <td>{position.maxProjects}</td>

                      <td>{position.location}</td>

                      <td>
                        <StatusBadge status={position.status} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PositionTable;
