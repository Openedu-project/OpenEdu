'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';

type UseOutsideClickProps = {
  initialIsOpen?: boolean;
  onOutsideClick?: () => void;
  parentRef?: RefObject<HTMLElement>;
};

export function useOutsideClick({ initialIsOpen = false, onOutsideClick, parentRef }: UseOutsideClickProps = {}) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (parentRef?.current?.contains(event.target as Node)) {
          // Click occurred inside the parent modal, do nothing
          return;
        }
        setIsOpen(false);
        onOutsideClick?.();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick, parentRef]);

  return { ref, isOpen, setIsOpen };
}
