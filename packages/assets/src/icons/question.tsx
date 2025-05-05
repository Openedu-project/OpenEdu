import type { ISvgProps } from './types';

export function IconQuestion({ width = 200, height = 200, color = '#777BE0', className = '' }: ISvgProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="person-2-user icon"
    >
      <g clip-path="url(#clip0_6062_30528)">
        <rect width="200" height="200" rx="100" fill="white" />
        <g filter="url(#filter0_f_6062_30528)">
          <ellipse cx="26" cy="22" rx="197" ry="144" transform="rotate(-180 26 22)" fill={color} />
        </g>
        <g filter="url(#filter1_dd_6062_30528)">
          <path
            d="M86.6666 134.4C85.7333 134.4 84.7666 134.166 83.8999 133.7C81.9999 132.7 80.8333 130.7 80.8333 128.566V123.833C70.7666 122.8 64.1666 115.4 64.1666 104.8V84.7997C64.1666 73.3331 71.8666 65.6331 83.3333 65.6331H116.667C128.133 65.6331 135.833 73.3331 135.833 84.7997V104.8C135.833 116.266 128.133 123.966 116.667 123.966H104.1L89.8999 133.433C88.9332 134.066 87.8 134.4 86.6666 134.4ZM83.3333 70.5997C74.7333 70.5997 69.1666 76.1664 69.1666 84.7664V104.767C69.1666 113.367 74.7333 118.933 83.3333 118.933C84.7 118.933 85.8333 120.067 85.8333 121.433V128.533C85.8333 128.967 86.1 129.166 86.2666 129.266C86.4333 129.366 86.7667 129.466 87.1333 129.233L101.967 119.367C102.367 119.1 102.867 118.933 103.367 118.933H116.7C125.3 118.933 130.867 113.367 130.867 104.767V84.7664C130.867 76.1664 125.3 70.5997 116.7 70.5997H83.3333Z"
            fill="white"
          />
          <path
            d="M99.9994 100.367C98.6328 100.367 97.4994 99.2334 97.4994 97.8667V97.1668C97.4994 93.3002 100.333 91.4001 101.399 90.6668C102.633 89.8335 103.033 89.2668 103.033 88.4001C103.033 86.7335 101.666 85.3667 99.9994 85.3667C98.3328 85.3667 96.9662 86.7335 96.9662 88.4001C96.9662 89.7668 95.8329 90.9001 94.4662 90.9001C93.0995 90.9001 91.9662 89.7668 91.9662 88.4001C91.9662 83.9668 95.5661 80.3667 99.9994 80.3667C104.433 80.3667 108.033 83.9668 108.033 88.4001C108.033 92.2001 105.233 94.1001 104.199 94.8001C102.899 95.6668 102.499 96.2335 102.499 97.1668V97.8667C102.499 99.2667 101.366 100.367 99.9994 100.367Z"
            fill="white"
          />
          <path
            d="M100 108.667C98.6 108.667 97.5 107.533 97.5 106.167C97.5 104.8 98.6333 103.667 100 103.667C101.367 103.667 102.5 104.8 102.5 106.167C102.5 107.533 101.4 108.667 100 108.667Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_6062_30528"
          x="-471"
          y="-422"
          width="994"
          height="888"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_6062_30528" />
        </filter>
        <filter
          id="filter1_dd_6062_30528"
          x="28"
          y="48"
          width="144"
          height="157"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="33" />
          <feGaussianBlur stdDeviation="16" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6062_30528" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_6062_30528" result="effect2_dropShadow_6062_30528" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_6062_30528" result="shape" />
        </filter>
        <clipPath id="clip0_6062_30528">
          <rect width="200" height="200" rx="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
