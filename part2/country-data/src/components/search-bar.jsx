const SearchBar = ({ handleSearch, value }) => (
  <div>
    <input placeholder="search..." value={value} onChange={handleSearch} />
  </div>
);

export default SearchBar;
