import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import BlogTable from '../_components/blog-table';

export default function OrgBlogManagement() {
  const tBlogs = useTranslations('blogManagement');
  const tDashboard = useTranslations('dashboard.blog');
  return (
    <DashboardMainPageLayout
      dashboard="blog"
      breadcrumbs={[{ label: tDashboard('orgBlog') }]}
      title={tBlogs('orgBlogManagement')}
      mainClassName="overflow-hidden"
    >
      <BlogTable type="org" className="bg-background" />
    </DashboardMainPageLayout>
  );
}
