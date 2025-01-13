import { type RefObject, useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface ScrollConfig {
  threshold?: number;
  debounceMs?: number;
  checkOnResize?: boolean;
}

interface ScrollPosition {
  isScrolledToTop: boolean;
  isScrolledToBottom: boolean;
}

const useScrollPosition = (
  containerRef: RefObject<HTMLElement | null>,
  { threshold = 20, debounceMs = 100, checkOnResize = true }: ScrollConfig = {}
): ScrollPosition & {
  checkScrollPosition: () => void;
} => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    isScrolledToTop: true,
    isScrolledToBottom: true,
  });

  // Memoize the scroll check function to prevent recreating on every render
  const checkScrollPosition = useCallback(() => {
    const container = containerRef?.current;
    if (!container) {
      return;
    }

    // Use getBoundingClientRect for more accurate measurements
    const { scrollTop, scrollHeight, clientHeight } = container;

    // Calculate distances from top and bottom
    const distanceFromBottom = Math.floor(scrollHeight - (scrollTop + clientHeight));
    const distanceFromTop = Math.floor(scrollTop);

    // Check if at top or bottom considering threshold
    const isAtBottom = distanceFromBottom <= threshold;
    const isAtTop = distanceFromTop <= threshold;

    // Only update state if values actually changed
    setScrollPosition(prevState => {
      const newState = {
        isScrolledToTop: isAtTop,
        isScrolledToBottom: isAtBottom,
      };

      if (prevState.isScrolledToTop !== isAtTop || prevState.isScrolledToBottom !== isAtBottom) {
        return newState;
      }
      return prevState;
    });
  }, [containerRef, threshold]);

  // Create a debounced version of the check function
  const debouncedCheck = useDebouncedCallback(checkScrollPosition, debounceMs, {
    leading: true,
    trailing: true,
  });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) {
      return;
    }

    // Check initial scroll position
    checkScrollPosition();

    // Add passive scroll listener for better performance
    container.addEventListener('scroll', debouncedCheck, { passive: true });

    // Optionally listen for resize events
    let resizeObserver: ResizeObserver | undefined;
    if (checkOnResize) {
      resizeObserver = new ResizeObserver(debouncedCheck);
      resizeObserver.observe(container);
    }

    // Cleanup
    return () => {
      debouncedCheck.cancel();
      container.removeEventListener('scroll', debouncedCheck);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [containerRef, debouncedCheck, checkOnResize]);

  return {
    ...scrollPosition,
    checkScrollPosition,
  };
};

export default useScrollPosition;
