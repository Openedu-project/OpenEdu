import type { IAICourseStatus } from '@oe/api/types/course/ai-course';
import type { TCourseStatus } from '@oe/api/types/course/basic';
import type { ICourse } from '@oe/api/types/course/course';
import { Badge, type BadgeProps } from '@oe/ui/shadcn/badge';
import { useTranslations } from 'next-intl';

const statusColorMap: Record<TCourseStatus | IAICourseStatus, BadgeProps['variant']> = {
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

export default function CourseStatus({ data }: { data: ICourse }) {
  const tStatus = useTranslations('courses.status');

  const status = data.is_ai_generated ? data.ai_generate_status : data.status;
  return <Badge variant={statusColorMap[status]}>{tStatus(status)}</Badge>;
}
