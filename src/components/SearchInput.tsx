import {BaseSyntheticEvent} from 'react';

export const SearchInput = ({
  searchValue,
  onSearch,
}: {
  searchValue: string;
  onSearch: (value: string) => void;
}) => {
  const handleChange = (e: BaseSyntheticEvent) => {
    const value = e.target.value.trim();

    onSearch(value);
  };

  return <input type='text' value={searchValue} onChange={handleChange} />;
};
