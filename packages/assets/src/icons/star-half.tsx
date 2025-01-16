import type { ISvgProps } from './types';

export default function StarHalf({
  width = 12,
  height = 13,
  className = '',
  color = 'hsl(var(--warning))',
  outlineColor = 'hsl(var(--warning-foreground))',
}: ISvgProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Star half"
    >
      <path
        d="M6 0.833252L8.03951 4.31053L12 5.1622L9.3 8.16295L9.7082 12.1666L6 10.5439L2.2918 12.1666L2.7 8.16295L0 5.1622L3.96049 4.31053L6 0.833252Z"
        fill={outlineColor}
      />
      <path d="M2.2918 12.1666L6 10.5439V0.833252L3.96049 4.31053L0 5.1622L2.7 8.16295L2.2918 12.1666Z" fill={color} />
    </svg>
  );
}
