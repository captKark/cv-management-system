function Toolbar({onDeleteSelected, canDelete}) {
  return (
    <div>
      <button onClick={onDeleteSelected} disabled={!canDelete}>
        Delete Selected
      </button>
    </div>
  );
}

export default Toolbar;
