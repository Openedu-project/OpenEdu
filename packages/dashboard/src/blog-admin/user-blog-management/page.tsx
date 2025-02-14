import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import BlogTable from '../_components/blog-table';

export default function UserBlogManagement() {
  const tBlogs = useTranslations('blogManagement');
  const tDashboard = useTranslations('dashboard.blog');
  return (
    <DashboardMainPageLayout
      dashboard="blog"
      breadcrumbs={[{ label: tDashboard('userBlog') }]}
      title={tBlogs('userBlogManagement')}
      mainClassName="overflow-hidden"
    >
      <BlogTable type="personal" />
    </DashboardMainPageLayout>
  );
}
