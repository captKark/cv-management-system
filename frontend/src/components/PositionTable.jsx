function PositionTable({ 
  positions, 
  selectedPositions, 
  allSelected, 
  onToggleSelection, 
  onSelectAll 
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
          <th>Title</th>
          <th>Department</th>
          <th>Location</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {positions.length === 0 ? (
          <tr>
            <td colSpan={5}>No positions found</td>
          </tr>
        ) : (
          positions.map((position) => {
            const isSelected = selectedPositions.includes(position.id);
            return (
              <tr key={position.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelection(position.id)}
                  />
                </td>
                <td>{position.title}</td>
                <td>{position.department}</td>
                <td>{position.location}</td>
                <td>{position.status}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default PositionTable;
