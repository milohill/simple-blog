const SearchBar = (props) => {
  const { filterPosts } = props;
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => {
          filterPosts(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
