function AttributeTable({
  attributes,
  selectedAttributes,
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

                <th>Name</th>

                <th>Category</th>

                <th>Type</th>

                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {attributes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-5">
                    <h5 className="mb-2">No attributes found</h5>

                    <p className="mb-0">
                      Try changing your search or create a new attribute.
                    </p>
                  </td>
                </tr>
              ) : (
                attributes.map((attribute) => {
                  const isSelected = selectedAttributes.includes(attribute.id);

                  return (
                    <tr key={attribute.id}>
                      <td className="text-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelection(attribute.id)}
                        />
                      </td>

                      <td className="fw-semibold">{attribute.name}</td>

                      <td>{attribute.category}</td>

                      <td>
                        <span className="badge bg-secondary">
                          {attribute.type}
                        </span>
                      </td>

                      <td>
                        {new Date(attribute.createdAt).toLocaleDateString()}
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

export default AttributeTable;