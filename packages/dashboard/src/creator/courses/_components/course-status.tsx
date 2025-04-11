import type { ICourse } from '@oe/api';
import { StatusBadge } from '@oe/ui';

export function CourseStatus({ data }: { data: ICourse }) {
  const status = data.is_ai_generated ? data.ai_generate_status : data.status;
  return <StatusBadge status={status} errorMessage={data?.ai_course?.error?.msg} />;
}
