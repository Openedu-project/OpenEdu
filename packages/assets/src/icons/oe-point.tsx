export function OEPoint({ width = 40, height = 41, className = '', color = '#FFBD04' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 41"
      fill="none"
      role="img"
      aria-label="oe point icon"
    >
      <circle cx="20" cy="20.5161" r="20" fill="url(#paint0_radial_8913_41010)" />
      <ellipse cx="20" cy="20.5161" rx="15" ry="15" fill={color} />
      <path
        d="M18.6318 13.8923L19.5049 12.9812C19.7458 12.7299 20.1493 12.7356 20.3829 12.9938L21.209 13.9065C21.4383 14.1598 21.4101 14.5531 21.147 14.7711L20.3227 15.4542C20.1055 15.6342 19.7922 15.6385 19.5701 15.4647L18.6952 14.78C18.4156 14.5611 18.3861 14.1487 18.6318 13.8923Z"
        fill="white"
      />
      <path
        d="M15.0876 25.0829L21.7308 20.9065C24.8362 18.9542 28.7878 18.9631 31.8843 20.9295C31.938 20.9636 31.9377 21.042 31.8839 21.0757L24.9473 25.4186C21.9267 27.3098 18.0864 27.2891 15.0863 25.3657C14.983 25.2994 14.9837 25.1482 15.0876 25.0829Z"
        fill="white"
      />
      <path
        d="M24.9124 25.0829L18.2692 20.9065C15.1638 18.9542 11.2122 18.9631 8.11567 20.9295C8.06203 20.9636 8.06228 21.042 8.11614 21.0757L15.0527 25.4186C18.0733 27.3098 21.9136 27.2891 24.9137 25.3657C25.017 25.2994 25.0163 25.1482 24.9124 25.0829Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_8913_41010"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 20.5161) rotate(90) scale(20)"
        >
          <stop offset="0.19" stop-color={color} />
          <stop offset="1" stop-color="#FFF780" />
        </radialGradient>
      </defs>
    </svg>
  );
}
