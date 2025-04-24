import { cn } from '@oe/ui';
import type { ReactNode } from 'react';

interface AieduLayoutSectionProps {
  className?: string;
  background?: string;
  children: ReactNode;
}
const AieduLayoutSection = ({ className, background, children }: AieduLayoutSectionProps) => {
  return (
    <div className={cn('bg-background py-12 md:py-16 lg:py-20', background)}>
      <div className={cn('container', className)}>{children}</div>
    </div>
  );
};

export { AieduLayoutSection, type AieduLayoutSectionProps };
