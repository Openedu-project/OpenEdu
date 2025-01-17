import { Tooltip, TooltipProvider } from '#shadcn/tooltip';

import type { IAICourseStatus } from '@oe/api/types/course/ai-course';
import type { TCourseStatus } from '@oe/api/types/course/basic';
import { Badge, type BadgeProps } from '@oe/ui/shadcn/badge';
import { useTranslations } from 'next-intl';

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
    <Badge variant={statusColorMap[status]}>{tStatus(status)}</Badge>
  );
}
