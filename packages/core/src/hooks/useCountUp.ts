'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  separator?: string;
  decimals?: number;
}

export function useCountUp({
  start = 0,
  end,
  duration = 1500,
  delay = 0,
  separator = ',',
  decimals = 0,
}: UseCountUpProps) {
  const [count, setCount] = useState(formatNumber(start, decimals, separator));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set initial delay
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      stepRef.current = window.requestAnimationFrame(updateCount);
    }, delay);

    function updateCount() {
      if (!startTimeRef.current) {
        return;
      }

      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutExpo for smoother animation
      const easeProgress = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);

      // Calculate current count value
      const currentCount = start + (end - start) * easeProgress;

      // Format with proper decimals
      const formattedCount = formatNumber(currentCount, decimals, separator);

      setCount(formattedCount);

      if (progress < 1) {
        stepRef.current = window.requestAnimationFrame(updateCount);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (stepRef.current) {
        window.cancelAnimationFrame(stepRef.current);
      }
    };
  }, [start, end, duration, delay, decimals, separator]);

  return { count };
}

function formatNumber(num: number, decimals: number, separator: string): string {
  // First fix the number to the correct number of decimal places
  const fixedNum = Number.parseFloat(num.toFixed(decimals));

  // Convert to string and split into integer and decimal parts
  const parts = fixedNum.toString().split('.');
  const integerPart = parts[0] ?? '0';
  const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';

  // Add thousand separators to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // Combine integer and decimal parts
  return formattedInteger + decimalPart;
}
