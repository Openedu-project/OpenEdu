import type { ISvgProps } from './types';

export default function DocumentDownload({ className, color = '#6E6E6E', width = 24, height = 24 }: ISvgProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      role="img"
      aria-label="document-download icon"
    >
      <path
        d="M9.5 17.75C9.4 17.75 9.31 17.73 9.21 17.69C8.93 17.58 8.75 17.3 8.75 17V11C8.75 10.59 9.09 10.25 9.5 10.25C9.91 10.25 10.25 10.59 10.25 11V15.19L10.97 14.47C11.26 14.18 11.74 14.18 12.03 14.47C12.32 14.76 12.32 15.24 12.03 15.53L10.03 17.53C9.89 17.67 9.69 17.75 9.5 17.75Z"
        fill={color}
      />
      <path
        d="M9.49945 17.75C9.30945 17.75 9.11945 17.68 8.96945 17.53L6.96945 15.53C6.67945 15.24 6.67945 14.76 6.96945 14.47C7.25945 14.18 7.73945 14.18 8.02945 14.47L10.0295 16.47C10.3195 16.76 10.3195 17.24 10.0295 17.53C9.87945 17.68 9.68945 17.75 9.49945 17.75Z"
        fill={color}
      />
      <path
        d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H14.5C14.91 1.25 15.25 1.59 15.25 2C15.25 2.41 14.91 2.75 14.5 2.75H9.5C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V10C21.75 9.59 22.09 9.25 22.5 9.25C22.91 9.25 23.25 9.59 23.25 10V15C23.25 20.43 20.93 22.75 15.5 22.75Z"
        fill={color}
      />
      <path
        d="M22.5 10.75H18.5C15.08 10.75 13.75 9.41999 13.75 5.99999V1.99999C13.75 1.69999 13.93 1.41999 14.21 1.30999C14.49 1.18999 14.81 1.25999 15.03 1.46999L23.03 9.46999C23.24 9.67999 23.31 10.01 23.19 10.29C23.07 10.57 22.8 10.75 22.5 10.75ZM15.25 3.80999V5.99999C15.25 8.57999 15.92 9.24999 18.5 9.24999H20.69L15.25 3.80999Z"
        fill={color}
      />
    </svg>
  );
}
