import { DashboardMainPageLayout } from '@oe/ui';
import { SetupCategoryTree } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function CourseCategories() {
  const tDashboard = useTranslations('dashboard.courses');
  const tCourse = useTranslations('course');

  return (
    <>
      <DashboardMainPageLayout
        breadcrumbs={[
          { label: tDashboard('courseManagement'), disabled: true },
          { label: tDashboard('courseCategories') },
        ]}
        dashboard="admin"
        title={tCourse('categories.title')}
        mainClassName="overflow-hidden"
      >
        <SetupCategoryTree type="course" />
      </DashboardMainPageLayout>
    </>
  );
}
