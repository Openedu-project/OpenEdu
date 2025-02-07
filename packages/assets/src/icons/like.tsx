import type { ISvgProps } from './types';

export function Like({ width = 20, height = 20, className = '', color = '#5055D7' }: ISvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="like"
    >
      <path
        d="M9.5 1.5L5.5 7.5V6L4.5 4.5H1.5L0.5 6V16.5L1 18H4.5L5.5 16.5L9.5 19.5H15L16.5 18.5L19.5 9L19 7.5H13.5L12.5 6.5L13 2L11 0.5L9.5 1.5Z"
        fill={color}
      />
    </svg>
  );
}
