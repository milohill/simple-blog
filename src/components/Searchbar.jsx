const SearchBar = (props) => {
  const { func } = props;
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => {
          func(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
