function PositionTable({ positions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Department</th>
          <th>Location</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {positions.length === 0 ? (
          <tr>
            <td colSpan={4}>No positions found</td>
          </tr>
        ) : (
          positions.map((position) => (
            <tr key={position.id}>
              <td>{position.title}</td>
              <td>{position.department}</td>
              <td>{position.location}</td>
              <td>{position.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default PositionTable;
