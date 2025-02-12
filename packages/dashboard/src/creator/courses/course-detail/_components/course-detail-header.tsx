'use client';
import { useGetCourseById, useGetSegments } from '@oe/api/hooks/useCourse';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
// import { NavigationDialog } from "@oe/ui/components/dialog";
// import { useFormContext } from "@oe/ui/components/form-wrapper";
import { Badge } from '@oe/ui/shadcn/badge';
import { useParams } from 'next/navigation';
// import { useCourse } from '../_hooks/useCourse';
// import { useSegments } from '../_hooks/useSegments';
import CourseNameForm from './course-name-form';
import CourseTabs from './course-tabs';

export function CourseDetailHeader() {
  const { courseId } = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(courseId);
  const { segments } = useGetSegments({
    course_id: courseId as string,
  });

  return (
    <DashboardHeaderCard
      breadcrumbs={[{ label: 'Courses', path: CREATOR_ROUTES.courses }, { label: course?.name || 'Course Detail' }]}
      className="mb-0 flex flex-col gap-2 pb-0"
    >
      <div className="flex items-center justify-between gap-4">
        <CourseNameForm />
        <div className="flex items-center gap-2">
          <Badge variant="outline_primary">v{course?.version}.0</Badge>
        </div>
      </div>

      <CourseTabs segments={segments} />
    </DashboardHeaderCard>
  );
}
