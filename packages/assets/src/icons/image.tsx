export default function ImageIcon({ width = 61, height = 60, className = '', color = '#3A3A3A' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 61 60"
      fill="none"
      role="img"
      aria-label="image icon"
    >
      <path
        d="M54.7001 42.4L46.8751 24.125C44.2251 17.925 39.3501 17.675 36.0751 23.575L31.3501 32.1C28.9501 36.425 24.4751 36.8 21.3751 32.925L20.8251 32.225C17.6001 28.175 13.0501 28.675 10.7251 33.3L6.42506 41.925C3.40006 47.925 7.77506 55 14.4751 55H46.3751C52.8751 55 57.2501 48.375 54.7001 42.4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.925 20.0001C22.0672 20.0001 25.425 16.6422 25.425 12.5001C25.425 8.35793 22.0672 5.00006 17.925 5.00006C13.7829 5.00006 10.425 8.35793 10.425 12.5001C10.425 16.6422 13.7829 20.0001 17.925 20.0001Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
