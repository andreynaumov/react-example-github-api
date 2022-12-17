import {useCallback, useEffect, useRef} from 'react';

export const useDebounce = <T extends unknown[]>(cb: (...args: T) => void, delay: number) => {
  const cbRef = useRef(cb);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    cbRef.current = cb;
  });

  return useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => cbRef.current(...args), delay);
    },
    [delay]
  );
};
