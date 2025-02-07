import type React from 'react';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  showValue?: boolean;
  className?: string;
  unit?: string;
  animationDuration?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 100,
  strokeWidth = 8,
  progressColor = '#5055D7',
  backgroundColor = '#F4F5F6',
  showValue = true,
  className = '',
  unit = '%',
  animationDuration = 1,
}) => {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg className="absolute" width={size} height={size}>
        <title>Background Circle</title>
        <circle
          className="transition-all duration-300 ease-in-out"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
        />
      </svg>
      <svg className="-rotate-90 absolute" width={size} height={size}>
        <title>Progress Circle</title>
        <circle
          className="transition-all duration-300 ease-in-out"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
          style={{
            transition: `stroke-dashoffset ${animationDuration}s ease-in-out`,
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-2xl">
            {Math.round(normalizedValue)}
            {unit}
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
