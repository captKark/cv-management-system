function CVTable({
  cvs,
  selectedCVs,
  allSelected,
  onToggleSelection,
  onSelectAll,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onSelectAll}
            />
          </th>

          <th>Candidate</th>
          <th>Position</th>
          <th>Status</th>
          <th>Last Updated</th>
        </tr>
      </thead>

      <tbody>
        {cvs.length === 0 ? (
          <tr>
            <td colSpan={5}>No CVs found.</td>
          </tr>
        ) : (
          cvs.map((cv) => (
            <tr key={cv.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCVs.includes(cv.id)}
                  onChange={() =>
                    onToggleSelection(cv.id)
                  }
                />
              </td>

              <td>{cv.candidateName}</td>

              <td>{cv.positionTitle}</td>

              <td>{cv.status}</td>

              <td>{cv.updatedAt}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default CVTable;