/* eslint-disable react/prop-types */
const SearchInput = ({ searchValue, setSearchValue }) => {
  return (
    <div className="search">
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        className="rounded"
        type="search"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
