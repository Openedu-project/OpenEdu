import { cn } from '@oe/ui';
import type { CSSProperties, ReactNode } from 'react';

interface AieduLayoutSectionProps {
  className?: string;
  background?: string;
  children: ReactNode;
  style?: CSSProperties;
}
const AieduLayoutSection = ({ className, background, children, style }: AieduLayoutSectionProps) => {
  return (
    <div className={cn('bg-background', background)}>
      <div className={cn('container py-12 md:py-16 lg:py-20', className)} style={style}>
        {children}
      </div>
    </div>
  );
};

export { AieduLayoutSection, type AieduLayoutSectionProps };
