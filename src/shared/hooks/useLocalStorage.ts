import {useEffect, useState} from 'react';

export const useLocalStorage = <T>(key: string): [T | null, (value: T | null) => void] => {
  const [value, setValue] = useState<T | null>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  }, [value]);

  return [value, setValue];
};
