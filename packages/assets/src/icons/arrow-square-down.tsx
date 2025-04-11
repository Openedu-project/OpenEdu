import type { ISvgProps } from './types';

export function ArrowSquareDown({ className, color = '#1A1A1A', width = 24, height = 24 }: ISvgProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="arrow-square-down icon"
    >
      <path
        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
        fill={color}
      />
      <path
        d="M11.9999 14.9101C11.8099 14.9101 11.6199 14.8401 11.4699 14.6901L7.93991 11.1601C7.64991 10.8701 7.64991 10.3901 7.93991 10.1001C8.22991 9.81007 8.70991 9.81007 8.99991 10.1001L11.9999 13.1001L14.9999 10.1001C15.2899 9.81007 15.7699 9.81007 16.0599 10.1001C16.3499 10.3901 16.3499 10.8701 16.0599 11.1601L12.5299 14.6901C12.3799 14.8401 12.1899 14.9101 11.9999 14.9101Z"
        fill={color}
      />
    </svg>
  );
}
