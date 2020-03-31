import { useEffect } from 'react';

export function useClickOutside(ref, callback) {
  const handleClickOutsideWrapper = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideWrapper);
    return () => { document.removeEventListener("mousedown", handleClickOutsideWrapper) };
  });
}

export default { useClickOutside };
