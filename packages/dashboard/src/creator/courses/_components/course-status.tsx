import type { ICourse } from '@oe/api/types/course/course';
import { StatusBadge } from '@oe/ui/components/status-badge';

export default function CourseStatus({ data }: { data: ICourse }) {
  const status = data.is_ai_generated ? data.ai_generate_status : data.status;
  return <StatusBadge status={status} errorMessage={data?.ai_course?.error?.msg} />;
}
