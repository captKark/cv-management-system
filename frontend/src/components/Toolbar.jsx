function Toolbar({
  onAdd,
  onEditSelected,
  onDeleteSelected,
  canEdit,
  canDelete,
  addLabel,
}) {
  return (
    <div>
      <button onClick={onAdd}>
        {addLabel}
      </button>

      <button
        onClick={onEditSelected}
        disabled={!canEdit}
      >
        Edit Selected
      </button>

      <button
        onClick={onDeleteSelected}
        disabled={!canDelete}
      >
        Delete Selected
      </button>
    </div>
  );
}

export default Toolbar;