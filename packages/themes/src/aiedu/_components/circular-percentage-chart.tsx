'use client';
import { useEffect, useState } from 'react';

const CircularPercentageChart = ({
  percentage = 80,
  size = 80,
  strokeWidth = 10,
  primaryColor = '#1876D2',
  secondaryColor = '#B0E9FF',
}) => {
  const [progress, setProgress] = useState(0);

  // Animation effect for the progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute top-0 left-0">
        <title>background</title>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={secondaryColor} strokeWidth={strokeWidth} />
      </svg>

      {/* Progress circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 absolute top-0 left-0 transform"
      >
        <title>circle</title>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-md">{progress.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export { CircularPercentageChart };
