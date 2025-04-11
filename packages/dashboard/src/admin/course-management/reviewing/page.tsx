import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { CourseRequests } from './_components/course-requests';

export function CourseRequestManagement() {
  const tDashboard = useTranslations('dashboard.courses');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard('courseManagement'), disabled: true },
        { label: tDashboard('coursesReviewing') },
      ]}
      dashboard="admin"
      title={tDashboard('coursesReviewing')}
    >
      <CourseRequests />
    </DashboardMainPageLayout>
  );
}
