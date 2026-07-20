function Toolbar({ onAddPosition, onDeleteSelected, canDelete }) {
  return (
    <div>
      <button onClick={onAddPosition}>Add Position</button>

      <button onClick={onDeleteSelected}   disabled={!canDelete}>
        Delete Selected
      </button>
    </div>
  );
}

export default Toolbar;
