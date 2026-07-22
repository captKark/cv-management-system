import StatusBadge from "./StatusBadge";

function CVTable({
  cvs,
  selectedCVs,
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

                <th className="text-nowrap">Candidate</th>

                <th className="text-nowrap">Position</th>

                <th className="text-nowrap">Status</th>

                <th className="text-nowrap">Last Updated</th>
              </tr>
            </thead>

            <tbody>
              {cvs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-5">
                    <h5 className="mb-2">No CVs found</h5>
                    <p className="mb-0">Create your first CV to get started.</p>
                  </td>
                </tr>
              ) : (
                cvs.map((cv) => (
                  <tr key={cv.id}>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedCVs.includes(cv.id)}
                        onChange={() => onToggleSelection(cv.id)}
                      />
                    </td>

                    <td>{cv.candidateName}</td>

                    <td>{cv.positionTitle}</td>

                    <td>
                      <StatusBadge status={cv.status} />
                    </td>

                    <td>{cv.updatedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CVTable;
