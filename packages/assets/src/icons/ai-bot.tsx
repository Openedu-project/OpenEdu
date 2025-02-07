import type { ISvgProps } from './types';

export default function AIBot({ width = 170, height = 169, className = '' }: ISvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 170 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AI Bot"
      className={className}
    >
      <g filter="url(#filter0_d_5938_83118)">
        <circle cx="85" cy="69" r="50" fill="url(#paint0_linear_5938_83118)" />
        <circle cx="85" cy="69" r="46" stroke="white" strokeWidth="8" />
      </g>
      <ellipse
        cx="21.139"
        cy="21.4286"
        rx="21.139"
        ry="21.4286"
        transform="matrix(-4.43103e-08 1 -0.999961 -0.00887736 106.47 51.7207)"
        fill="url(#paint1_linear_5938_83118)"
      />
      <ellipse cx="76.4287" cy="71.8189" rx="7.5" ry="7.4898" fill="#130C2A" />
      <ellipse cx="93.5707" cy="71.8189" rx="7.5" ry="7.4898" fill="#130C2A" />
      <rect x="76.4285" y="64.3291" width="17.1429" height="10.6997" fill="#130C2A" />
      <rect x="74.2854" y="68.6094" width="4.28571" height="6.41983" rx="2.14286" fill="white" />
      <rect x="91.4287" y="68.6094" width="4.28571" height="6.41983" rx="2.14286" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.9995 47.0211C71.9465 47.0211 61.365 57.1655 61.365 69.6793H58.2137C58.2137 55.497 70.2061 44 84.9995 44C99.7928 44 111.785 55.497 111.785 69.6793H108.634C108.634 57.1655 98.0524 47.0211 84.9995 47.0211Z"
        fill="url(#paint2_linear_5938_83118)"
      />
      <rect
        x="54.9994"
        y="63.2578"
        width="8.57143"
        height="19.2595"
        rx="4.28571"
        fill="url(#paint3_linear_5938_83118)"
      />
      <rect
        width="8.57143"
        height="19.2595"
        rx="4.28571"
        transform="matrix(-1 0 0 1 114.999 63.2578)"
        fill="url(#paint4_linear_5938_83118)"
      />
      <defs>
        <filter
          id="filter0_d_5938_83118"
          x="0.808735"
          y="0.194808"
          width="168.383"
          height="168.383"
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
          <feOffset dy="15.3861" />
          <feGaussianBlur stdDeviation="17.0956" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.439216 0 0 0 0 0.564706 0 0 0 0 0.690196 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5938_83118" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5938_83118" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_5938_83118"
          x1="56.875"
          y1="35.4062"
          x2="113.125"
          y2="113.531"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2CDEE9" />
          <stop offset="0.927091" stopColor="#7B5AFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5938_83118"
          x1="38.1683"
          y1="-1.92043"
          x2="8.14613"
          y2="4.01417"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A8D8F9" />
          <stop offset="1" stopColor="#EDE3FE" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_5938_83118"
          x1="81.8663"
          y1="62.1317"
          x2="81.9648"
          y2="40.8095"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#604BFB" />
          <stop offset="1" stopColor="#401BD2" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_5938_83118"
          x1="58.7838"
          y1="76.8566"
          x2="59.1296"
          y2="60.8721"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#604BFB" />
          <stop offset="1" stopColor="#401BD2" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_5938_83118"
          x1="3.78441"
          y1="13.5987"
          x2="4.13026"
          y2="-2.38573"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#604BFB" />
          <stop offset="1" stopColor="#401BD2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
