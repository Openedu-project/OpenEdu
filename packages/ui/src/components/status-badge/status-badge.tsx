import { Tooltip, TooltipProvider } from '#shadcn/tooltip';

import type { IAICourseStatus } from '@oe/api/types/course/ai-course';
import type { TCourseStatus } from '@oe/api/types/course/basic';
import { Badge, type BadgeProps } from '@oe/ui/shadcn/badge';
import { Loader, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export type TStatus = TCourseStatus & IAICourseStatus & 'setting';

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
  pending: 'default',
  waiting: 'default',
  setting: 'default',
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
  generating: <Loader className="mr-1 h-4 w-4 animate-spin" />,
  pending: <Loader className="mr-1 h-4 w-4 animate-spin" />,
  waiting: <Loader className="mr-1 h-4 w-4 animate-spin" />,
  setting: <RotateCcw className="mr-1 h-4 w-4" />,
};

export function StatusBadge({ status, errorMessage }: { status: TStatus; errorMessage?: string }) {
  const tStatus = useTranslations('general.statusVariants');
  return status === 'failed' ? (
    <TooltipProvider>
      <Tooltip
        content={<p className="break-word max-w-[150px] text-start md:max-w-[200px]">{errorMessage ?? 'Error'}</p>}
      >
        <Badge variant={statusColorMap[status]}>{tStatus(status)}</Badge>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Badge variant={statusColorMap[status]}>
      {statusIcon[status]} {tStatus(status)}
    </Badge>
  );
}
