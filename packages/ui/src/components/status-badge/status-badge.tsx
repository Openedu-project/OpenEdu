import type { TApprovalStatus } from '@oe/api/types/approvals';
import type { IAICourseStatus } from '@oe/api/types/course/ai-course';
import type { TCourseStatus } from '@oe/api/types/course/basic';
import { Badge, type BadgeProps } from '@oe/ui/shadcn/badge';
import { Loader, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Tooltip, TooltipProvider } from '#shadcn/tooltip';

export type TStatus = TCourseStatus | IAICourseStatus | TApprovalStatus;

const statusColorMap: Record<TStatus, BadgeProps['variant']> = {
  draft: 'muted',
  publish: 'success',
  publish_root: 'success',
  reviewing: 'default',
  cancelled: 'muted',
  reject: 'destructive',
  'un-publish': 'outline_destructive',
  failed: 'destructive',
  manual: 'default',
  completed: 'success',
  generating: 'default',
  pending: 'outline_warning',
  waiting: 'outline_warning',
  new: 'muted',
  approved: 'success',
  rejected: 'destructive',
};

const statusIcon: Record<TStatus, ReactNode | null> = {
  draft: null,
  publish: null,
  publish_root: null,
  reviewing: null,
  cancelled: null,
  reject: null,
  'un-publish': null,
  failed: null,
  manual: null,
  completed: null,
  new: null,
  approved: null,
  rejected: null,
  generating: <Loader className="mr-1 h-3 w-3 animate-spin" />,
  pending: <Loader className="mr-1 h-3 w-3 animate-spin" />,
  waiting: <RotateCcw className="mr-1 h-3 w-3" />,
};

export function StatusBadge({
  status,
  errorMessage,
  className,
}: { status: TStatus; errorMessage?: string; className?: string }) {
  const tStatus = useTranslations('general.statusVariants');
  return status === 'failed' ? (
    <TooltipProvider>
      <Tooltip
        content={
          <p className="break-word max-w-[150px] text-start md:max-w-[200px]">{errorMessage ?? 'Unknown Error'}</p>
        }
      >
        <Badge variant={statusColorMap[status]} className={className}>
          {tStatus(status)}
        </Badge>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Badge variant={statusColorMap[status]} className={className}>
      {statusIcon[status]} {tStatus(status)}
    </Badge>
  );
}
