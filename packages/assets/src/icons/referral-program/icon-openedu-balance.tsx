import type { ISvgProps } from '../types';

export function IconOpeneduBalance({ width = 40, height = 40, className = '', color = 'white' }: ISvgProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-label="IconOpeneduBalance"
      role="img"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="url(#paint0_radial_7158_12262)" />
      <ellipse cx="20" cy="20" rx="15" ry="15" fill="#FFD04E" />
      <path
        d="M18.6318 13.3762L19.5049 12.4651C19.7458 12.2138 20.1493 12.2195 20.3829 12.4776L21.209 13.3904C21.4383 13.6437 21.4101 14.037 21.147 14.255L20.3227 14.9381C20.1055 15.1181 19.7922 15.1224 19.5701 14.9486L18.6952 14.2639C18.4156 14.045 18.3861 13.6326 18.6318 13.3762Z"
        fill={color}
      />
      <path
        d="M15.0876 24.5668L21.7308 20.3903C24.8362 18.438 28.7878 18.447 31.8843 20.4134C31.938 20.4475 31.9377 20.5259 31.8839 20.5596L24.9473 24.9025C21.9267 26.7936 18.0864 26.773 15.0863 24.8496C14.983 24.7833 14.9837 24.6321 15.0876 24.5668Z"
        fill={color}
      />
      <path
        d="M24.9124 24.5668L18.2692 20.3903C15.1638 18.438 11.2122 18.447 8.11567 20.4134C8.06203 20.4475 8.06228 20.5259 8.11614 20.5596L15.0527 24.9025C18.0733 26.7936 21.9136 26.773 24.9137 24.8496C25.017 24.7833 25.0163 24.6321 24.9124 24.5668Z"
        fill={color}
      />
      <defs>
        <radialGradient
          id="paint0_radial_7158_12262"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 20) rotate(90) scale(20)"
        >
          <stop offset="0.19" stopColor="#FFBD04" />
          <stop offset="1" stopColor="#FFF780" />
        </radialGradient>
      </defs>
    </svg>
  );
}
