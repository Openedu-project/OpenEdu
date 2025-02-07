import type { ISvgProps } from './types';

export default function NotStarted({ width = 32, height = 32, className = '', color = '#838383' }: ISvgProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 33"
      fill="none"
      role="img"
      aria-label="document-fill icon"
    >
      <circle cx="16" cy="16.6652" r="15" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="16.6652" r="5" fill={color} />
    </svg>
  );
}
