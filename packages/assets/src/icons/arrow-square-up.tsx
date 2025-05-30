import type { ISvgProps } from './types';

export default function ArrowSquareDown({ className, color = '#1A1A1A', width = 24, height = 24 }: ISvgProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="arrow-square-up icon"
    >
      <path
        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
        fill={color}
      />
      <path
        d="M15.53 14.21C15.34 14.21 15.15 14.14 15 13.99L12 10.99L9.00003 13.99C8.71003 14.28 8.23003 14.28 7.94003 13.99C7.65003 13.7 7.65003 13.22 7.94003 12.93L11.47 9.4C11.76 9.11 12.24 9.11 12.53 9.4L16.06 12.93C16.35 13.22 16.35 13.7 16.06 13.99C15.91 14.14 15.72 14.21 15.53 14.21Z"
        fill={color}
      />
    </svg>
  );
}
