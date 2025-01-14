import { cn } from '@oe/ui/utils/cn';
import type { ElementType, ReactNode } from 'react';

const HistoryDetailItem = ({
  icon: Icon,
  label,
  value,
  valueClassName = '',
}: {
  icon: ElementType;
  label: string;
  value: ReactNode;
  valueClassName?: string;
}) => (
  <div className="flex items-center space-x-4 break-all">
    <Icon className="h-5 w-5 text-muted-foreground" />
    <div className="flex-1 space-y-1">
      <p className="font-medium text-muted-foreground text-sm leading-none">{label}</p>
      <p className={cn('text-base', valueClassName)}>{value}</p>
    </div>
  </div>
);

export default HistoryDetailItem;
