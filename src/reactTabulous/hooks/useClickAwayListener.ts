import { useEffect, useState, type RefObject } from 'react';

export const useClickAwayListener = <T extends HTMLElement>(ref: RefObject<T>): any => {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current != null && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      } else {
        setIsFocused(true);
      }
    };

    // add event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // remove event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return { isFocused };
};
