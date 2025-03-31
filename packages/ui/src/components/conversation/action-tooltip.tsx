import type { ReactNode } from 'react';
import { Tooltip } from '#shadcn/tooltip';
import { cn } from '#utils/cn';

export const ActionTooltip = ({
  children,
  label,
  className,
  side = 'left',
}: {
  children: ReactNode;
  label: string;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}) => (
  <Tooltip
    content={label}
    contentProps={{
      side,
      className: 'mbutton-bold10 m-1 rounded-full text-primary',
    }}
    className={cn('!border-0 rounded-full p-1', className)}
  >
    {children}
  </Tooltip>
);
