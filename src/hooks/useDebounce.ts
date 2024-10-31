import { useRef } from 'react';

const useDebounce = (callback: (...args: object[]) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: object[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebounce;
