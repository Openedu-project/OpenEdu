import type { IAICourseStatus } from '@oe/api/types/course/ai-course';
import type { TCourseStatus } from '@oe/api/types/course/basic';
import { Badge, type BadgeProps } from '@oe/ui/shadcn/badge';
import { useTranslations } from 'next-intl';

const statusColorMap: Record<TCourseStatus | IAICourseStatus, BadgeProps['variant']> = {
  draft: 'muted',
  publish: 'success',
  publish_root: 'success',
  reviewing: 'outline_primary',
  cancelled: 'muted',
  reject: 'destructive',
  'un-publish': 'outline_destructive',
  failed: 'destructive',
  manual: 'default',
  completed: 'success',
  generating: 'outline_primary',
  pending: 'outline_muted',
  waiting: 'outline_warning',
};

export default function StatusBadge({
  status,
  className,
}: {
  status?: string;
  className?: string;
}) {
  const tStatus = useTranslations('courses.status');

  return status ? (
    <Badge variant={statusColorMap[status as TCourseStatus | IAICourseStatus] || 'default'} className={className}>
      {tStatus(status.toLowerCase())}
    </Badge>
  ) : null;
}
