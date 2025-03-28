import { Tooltip } from '@oe/ui/shadcn/tooltip';
import { cn } from '@oe/ui/utils/cn';
import type { ReactNode } from 'react';

export const ActionTooltip = ({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) => (
  <Tooltip
    content={label}
    contentProps={{
      side: 'left',
      className: 'mbutton-bold10 rounded-full text-primary',
    }}
    className={cn('!border-0 rounded-full p-1', className)}
  >
    {children}
  </Tooltip>
);
