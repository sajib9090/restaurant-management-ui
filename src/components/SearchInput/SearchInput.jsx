/* eslint-disable react/prop-types */
const SearchInput = ({ value, onChange }) => {
  return (
    <div className="search">
      <input
        value={value}
        onChange={onChange}
        className="rounded"
        type="search"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
