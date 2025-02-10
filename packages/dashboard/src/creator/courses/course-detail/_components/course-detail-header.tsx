'use client';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
// import { NavigationDialog } from "@oe/ui/components/dialog";
// import { useFormContext } from "@oe/ui/components/form-wrapper";
import { Badge } from '@oe/ui/shadcn/badge';
import { useCourse } from '../_hooks/useCourse';
import { useSegments } from '../_hooks/useSegments';
import CourseNameForm from './course-name-form';
import CourseTabs from './course-tabs';

export function CourseDetailHeader() {
  // const { courseId } = useParams<{ courseId: string }>();
  const { course } = useCourse();
  const { segments } = useSegments();
  // const { course } = useGetCourseOutline(courseId);
  // const { hasUnsavedChanges } = useFormContext();

  return (
    <DashboardHeaderCard
      breadcrumbs={[{ label: 'Courses', path: CREATOR_ROUTES.courses }, { label: course?.name || 'Course Detail' }]}
      className="mb-0 flex flex-col gap-2 pb-0"
    >
      <div className="flex items-center justify-between gap-4">
        <CourseNameForm />
        <div className="flex items-center gap-2">
          <Badge variant="outline_primary">v{course?.version}.0</Badge>
          {/* <Button size="xs">Next</Button> */}
          {/* <SubmitFormsButton size="xs">Save & Next</SubmitFormsButton> */}
        </div>
      </div>

      <CourseTabs segments={segments} />
      {/* <NavigationDialog
        isEnabled={hasUnsavedChanges}
        hasUnsavedChanges={hasUnsavedChanges}
      /> */}
    </DashboardHeaderCard>
  );
}
