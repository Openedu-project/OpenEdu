import { DashboardMainPageLayout } from '@oe/ui';
import { TableProvider } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { CreateCourseButton } from './_components/create-course-button';
import { Courses } from './course-table/course-table';

export function CourseListPagge() {
  const tDashboard = useTranslations('dashboard');
  const tCourse = useTranslations('course');

  return (
    <TableProvider>
      <DashboardMainPageLayout
        dashboard="creator"
        breadcrumbs={[{ label: tDashboard('courses.title') }]}
        header={
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl">{tCourse('common.coursesTitle')}</h1>
            <CreateCourseButton />
          </div>
        }
      >
        <Courses />
      </DashboardMainPageLayout>
      {/* <NavigationDialog /> */}
    </TableProvider>
  );
}
