import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { SetupCategoryTree } from '@oe/ui/components/setup-category-tree';
import { useTranslations } from 'next-intl';

export default function SetupBlogCategoryPage() {
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
