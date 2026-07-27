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
    <div className="d-flex flex-wrap gap-2 mb-4 border-bottom pb-3">
      <button className="btn btn-primary shadow-sm" onClick={onAdd}>
        + {addLabel}
      </button>

      <button
        className={`btn shadow-sm ${
          canEdit ? "btn-warning" : "btn-light text-secondary border"
        }`}
        onClick={onEditSelected}
        disabled={!canEdit}
      >
        Edit Selected
      </button>

      {onViewAttributes && (
        <button
          className={`btn shadow-sm ${
            canViewAttributes
              ? "btn-info text-white"
              : "btn-light text-secondary border"
          }`}
          onClick={onViewAttributes}
          disabled={!canViewAttributes}
        >
          View Attributes
        </button>
      )}

      {onAssignAttributes && (
        <button
          className={`btn shadow-sm ${
            canAssignAttributes
              ? "btn-info text-white"
              : "btn-light text-secondary border"
          }`}
          onClick={onAssignAttributes}
          disabled={!canAssignAttributes}
        >
          Assign Attributes
        </button>
      )}

      {onDuplicateSelected && (
        <button
          className={`btn shadow-sm ${
            canDuplicate ? "btn-secondary" : "btn-light text-secondary border"
          }`}
          onClick={onDuplicateSelected}
          disabled={!canDuplicate}
        >
          Duplicate Selected
        </button>
      )}

      <button
        className={`btn shadow-sm ${
          canDelete ? "btn-danger" : "btn-light text-secondary border"
        }`}
        onClick={onDeleteSelected}
        disabled={!canDelete}
      >
        Delete Selected
      </button>
    </div>
  );
}

export default Toolbar;
