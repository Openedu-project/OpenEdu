import type { ISvgProps } from './types';

export default function Clock({ width = 54, height = 54, className = '', color = '#5055D7' }: ISvgProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="clock icon"
    >
      <g clipPath="url(#clip0_2053_31787)">
        <g filter="url(#filter0_d_2053_31787)">
          <circle cx="27" cy="30" r="23" stroke={color} strokeWidth="2" />
        </g>
        <rect x="17" width="20" height="2" rx="1" fill={color} />
        <rect x="26" y="20" width="10" height="2" rx="1" transform="rotate(-90 26 20)" fill={color} />
      </g>
      <defs>
        <filter
          id="filter0_d_2053_31787"
          x="-3"
          y="0"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.921569 0 0 0 0 0.92549 0 0 0 0 0.984314 0 0 0 0.05 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2053_31787" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2053_31787" result="shape" />
        </filter>
        <clipPath id="clip0_2053_31787">
          <rect width="54" height="54" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
