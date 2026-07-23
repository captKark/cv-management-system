function Toolbar({
  onAdd,
  onEditSelected,
  onDeleteSelected,
  onDuplicateSelected,
  canEdit,
  canDelete,
  canDuplicate,
  addLabel,
  onAssignAttributes,
  canAssignAttributes,
  onViewAttributes,
  canViewAttributes,
}) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className="btn btn-primary" onClick={onAdd}>
          + {addLabel}
        </button>

        <button
          className="btn btn-warning"
          onClick={onEditSelected}
          disabled={!canEdit}
        >
          Edit Selected
        </button>
        {onViewAttributes && (
          <button
            className="btn btn-info"
            onClick={onViewAttributes}
            disabled={!canViewAttributes}
          >
            View Attributes 
          </button>
        )}
        {onAssignAttributes && (
          <button
            className="btn btn-info text-white"
            onClick={onAssignAttributes}
            disabled={!canAssignAttributes}
          >
            Assign Attributes
          </button>
        )}
        {onDuplicateSelected && (
          <button
            className="btn btn-secondary"
            onClick={onDuplicateSelected}
            disabled={!canDuplicate}
          >
            Duplicate Selected
          </button>
        )}

        <button
          className="btn btn-danger"
          onClick={onDeleteSelected}
          disabled={!canDelete}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
