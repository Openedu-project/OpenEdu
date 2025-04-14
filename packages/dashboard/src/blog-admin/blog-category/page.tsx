import { DashboardMainPageLayout } from '@oe/ui';
import { SetupCategoryTree } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function SetupBlogCategoryPage() {
  const tBlogs = useTranslations('blogManagement');
  const tDashboard = useTranslations('dashboard.blog');
  return (
    <DashboardMainPageLayout
      dashboard="blog"
      breadcrumbs={[{ label: tDashboard('category') }]}
      title={tBlogs('setupCategoryTitle')}
      mainClassName="overflow-hidden"
    >
      <SetupCategoryTree type="blog" />
    </DashboardMainPageLayout>
  );
}
