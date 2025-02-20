import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { SetupCategoryTree } from '@oe/ui/components/setup-category-tree';
import { useTranslations } from 'next-intl';

export default function CourseCategories() {
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
