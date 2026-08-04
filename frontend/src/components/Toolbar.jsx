function Toolbar({
  onAdd,
  onEditSelected,
  onDeleteSelected,
  onDuplicateSelected,

  onActivate,
  onDeactivate,

  canEdit,
  canDelete,
  canDuplicate,
  canActivate,
  canDeactivate,
  canResetPassword,
  addLabel,
  activateLabel = "Activate",
  deactivateLabel = "Deactivate",

  onAssignAttributes,
  canAssignAttributes,

  onViewAttributes,
  canViewAttributes,

  selectedCount,
  onClearSelection,
  onResetPassword,
  editLabel = "Edit Selected",
  deleteLabel = "Delete",
  duplicateLabel = "Duplicate Selected",
  resetPasswordLabel = "Reset Password",
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

      {onActivate && (
        <button
          className={`btn shadow-sm ${
            canActivate ? "btn-success" : "btn-light text-secondary border"
          }`}
          onClick={onActivate}
          disabled={!canActivate}
        >
          {activateLabel}
        </button>
      )}

      {onDeactivate && (
        <button
          className={`btn shadow-sm ${
            canDeactivate ? "btn-danger" : "btn-light text-secondary border"
          }`}
          onClick={onDeactivate}
          disabled={!canDeactivate}
        >
          {deactivateLabel}
        </button>
      )}

      <button
        className={`btn shadow-sm ${
          canDelete ? "btn-danger" : "btn-light text-secondary border"
        }`}
        onClick={onDeleteSelected}
        disabled={!canDelete}
      >
        Delete ({selectedCount})
      </button>
      {onResetPassword && (
        <button
          className={`btn shadow-sm ${
            canResetPassword
              ? "btn-secondary"
              : "btn-light text-secondary border"
          }`}
          onClick={onResetPassword}
          disabled={!canResetPassword}
        >
          {resetPasswordLabel}
        </button>
      )}
      <button
        className={`btn shadow-sm ${
          selectedCount > 0
            ? "btn-light text-dark border-secondary"
            : "btn-light text-secondary border"
        }`}
        onClick={onClearSelection}
        disabled={selectedCount === 0}
      >
        Clear Selection
      </button>

      <div className="ms-auto text-secondary fs-8 fw-regular">
        {selectedCount === 0
          ? ""
          : `Selected: ${selectedCount}`}
      </div>
    </div>
  );
}

export default Toolbar;
