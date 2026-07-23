function PositionAttributesModal({ position }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {position.attributes.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                No attributes assigned.
              </td>
            </tr>
          ) : (
            position.attributes.map((item) => (
              <tr key={item.attribute.id}>
                <td>{item.attribute.name}</td>
                <td>{item.attribute.category}</td>
                <td>{item.attribute.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PositionAttributesModal;