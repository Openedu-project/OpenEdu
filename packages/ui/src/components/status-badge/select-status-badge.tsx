import { Badge, badgeVariants } from '@oe/ui/shadcn/badge';
import type { SelectProps } from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { cn } from '#utils/cn';
import { type TStatus, statusColorMap } from './status-badge';

interface SelectStatusBadgeProps extends SelectProps {
  value?: TStatus;
  onValueChange: (value: TStatus) => void;
  statuses?: TStatus[];
  className?: string;
  displayValue?: (value: TStatus) => ReactNode;
  displayItem?: (value: TStatus) => ReactNode;
  disabledItems?: TStatus[];
}

const ALL_STATUSES: TStatus[] = [
  'draft',
  'publish',
  'publish_root',
  'reviewing',
  'cancelled',
  'reject',
  'un-publish',
  'failed',
  'manual',
  'completed',
  'generating',
  'pending',
  'waiting',
  'new',
  'approved',
  'rejected',
  'preview',
] as const;

export function SelectStatusBadge({
  value,
  onValueChange,
  statuses = ALL_STATUSES,
  className,
  displayValue,
  displayItem,
  disabledItems,
  ...props
}: SelectStatusBadgeProps) {
  const tStatus = useTranslations('general.statusVariants');

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          value && badgeVariants({ variant: statusColorMap[value] }),
          'h-auto w-auto justify-normal gap-1 border py-0.5 pr-1.5 pl-2',
          'focus:border focus:ring-0 focus:ring-offset-0 focus-visible:outline-none',
          'focus-visible:ring-transparent focus-visible:ring-offset-0',
          'focus-within:ring-0 focus:outline-none',
          className
        )}
        {...props}
      >
        <SelectValue>
          {value &&
            (displayValue ? (
              displayValue(value)
            ) : (
              <Badge variant={statusColorMap[value]} className="w-fit border-none p-0">
                {tStatus(value)}
              </Badge>
            ))}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {statuses.map(status => (
          <SelectItem
            key={status}
            value={status}
            className="w-auto cursor-pointer"
            disabled={disabledItems?.includes(status)}
          >
            {displayItem ? (
              displayItem(status)
            ) : (
              <Badge variant={statusColorMap[status]} className="w-fit">
                {tStatus(status)}
              </Badge>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
