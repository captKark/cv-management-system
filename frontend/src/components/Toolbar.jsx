function Toolbar({
  onAdd,
  onEditSelected,
  onDuplicateSelected,
  onDeleteSelected,
  canEdit,
  canDelete,
  canDuplicate,
  addLabel,
}) {
  return (
    <div>
      <button onClick={onAdd}>{addLabel}</button>

      <button onClick={onEditSelected} disabled={!canEdit}>
        Edit Selected
      </button>

      <button onClick={onDeleteSelected} disabled={!canDelete}>
        Delete Selected
      </button> 
      <button onClick={onDuplicateSelected} disabled={!canDuplicate}>
        Duplicate Selected
      </button>
    </div>
  );
}

export default Toolbar;
