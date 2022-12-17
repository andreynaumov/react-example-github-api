import {BaseSyntheticEvent, useEffect, useState} from 'react';

export const SearchInput = ({
  searchValue,
  onSearch,
}: {
  searchValue: string;
  onSearch: (value: string) => void;
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const handleChange = (e: BaseSyntheticEvent) => {
    const value = e.target.value.trim();

    setValue(value);
    onSearch(value);
  };

  return <input type='text' value={value} onChange={handleChange} />;
};
