import type React from 'react';

interface HexagonShapeProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  borderWidth?: number;
  borderColor?: string;
  rotate?: boolean;
}

const HexagonShape = ({
  children,
  size = 'md',
  className = '',
  borderWidth = 2,
  borderColor = '#3B82F6',
  rotate = false,
}: HexagonShapeProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16 md:w-24 md:h-24',
    md: 'w-24 h-24 md:w-32 md:h-32',
    lg: 'w-36 h-36 md:w-48 md:h-48',
    full: 'w-full h-full',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Hexagon shape with border */}
      <div
        className={`absolute h-full w-full ${rotate ? 'rotate-90' : ''}`}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        {/* Border overlay */}
        <div
          className="absolute h-full w-full"
          style={{
            background: borderColor,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Inner content with border spacing */}
        <div
          className="absolute"
          style={{
            top: borderWidth,
            left: borderWidth,
            right: borderWidth,
            bottom: borderWidth,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { HexagonShape };
