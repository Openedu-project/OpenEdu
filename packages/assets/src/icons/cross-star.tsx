import type { ISvgProps } from './types';

export function CrossStar({ width = 26, height = 26, className = '', color = 'var(--secondary)' }: ISvgProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="cross-star"
    >
      <path
        d="M12.0697 1.35872C12.4027 0.514571 13.5973 0.51457 13.9303 1.35872L16.8005 8.63617C16.9021 8.8939 17.1061 9.0979 17.3638 9.19955L24.6413 12.0697C25.4854 12.4027 25.4854 13.5973 24.6413 13.9303L17.3638 16.8005C17.1061 16.9021 16.9021 17.1061 16.8005 17.3638L13.9303 24.6413C13.5973 25.4854 12.4027 25.4854 12.0697 24.6413L9.19955 17.3638C9.0979 17.1061 8.8939 16.9021 8.63618 16.8005L1.35872 13.9303C0.514571 13.5973 0.51457 12.4027 1.35872 12.0697L8.63617 9.19955C8.8939 9.0979 9.0979 8.8939 9.19955 8.63618L12.0697 1.35872Z"
        fill={color}
      />
    </svg>
  );
}
