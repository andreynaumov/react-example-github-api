export const SearchInput = ({searchValue, onSearch}) => {
  const handleChange = e => {
    const value = e.target.value.trim();

    onSearch(value);
  };

  return <input type='text' value={searchValue} onChange={handleChange} />;
};
