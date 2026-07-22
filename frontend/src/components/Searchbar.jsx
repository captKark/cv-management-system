function Searchbar({ searchText, setSearchText }) {
  return (
    <div className="mb-3">
      <div className="input-group">
        <span className="input-group-text">⌕</span>

        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Searchbar;
