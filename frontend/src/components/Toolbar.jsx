function Toolbar({
  onAddPosition,
  onEditSelected,
  onDeleteSelected,
  canEdit,
  canDelete,
}) {
  return (
    <div>
      <button onClick={onAddPosition}>Add Position</button>
      <button onClick={onDeleteSelected} disabled={!canDelete}>
        Delete Selected
      </button>
      <button onClick={onEditSelected} disabled={!canEdit}>
        Edit Selected
      </button>
    </div>
  );
}

export default Toolbar;
