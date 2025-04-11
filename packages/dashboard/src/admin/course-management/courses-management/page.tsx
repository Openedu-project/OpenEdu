import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { OutlineCourseManagement } from './outline-course-management';

export function CoursesManagement({ isOpenEdu }: { isOpenEdu: boolean }) {
  const tDashboard = useTranslations('dashboard.courses');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('courseManagement'), disabled: true }, { label: tDashboard('title') }]}
      dashboard="admin"
      title={tDashboard('title')}
    >
      <OutlineCourseManagement isOpenEdu={isOpenEdu} />
    </DashboardMainPageLayout>
  );
}
