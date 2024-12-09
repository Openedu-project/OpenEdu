import type { ReactNode } from 'react';
import { cn } from '#utils/cn';

export function FormFieldWrapper({
  children,
  className,
  label,
}: { children: ReactNode; className?: string; label: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      <p className="font-medium text-sm">{label}</p>
      {children}
    </div>
  );
}
