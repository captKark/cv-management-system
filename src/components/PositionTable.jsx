function PositionTable({ positions, selectedPositions, setSelectedPositions }) {
  const toggleSelection = (id) => {
    if (selectedPositions.includes(id)) {
      setSelectedPositions((prev) =>
        prev.filter((positionId) => positionId !== id),
      );
    } else {
      setSelectedPositions((prev) => [...prev, id]);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
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
                    onChange={() => toggleSelection(position.id)}
                  />
                </td>
                ...
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default PositionTable;
