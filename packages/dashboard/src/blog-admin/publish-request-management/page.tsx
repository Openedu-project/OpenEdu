import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { TableProvider } from '@oe/ui/components/table';
import { getTranslations } from 'next-intl/server';
import PublishRequestTable from '../_components/publish-request-table';

export default async function PublishRequestPage() {
  const [tBlogs, tDashboard] = await Promise.all([getTranslations('blogManagement'), getTranslations('dashboard')]);

  return (
    <TableProvider>
      <DashboardMainPageLayout
        dashboard="blog"
        breadcrumbs={[{ label: tDashboard('blog.publishRequest') }]}
        header={
          <h2 className="giant-iheading-semibold32 tracking-tight md:text-3xl">{tBlogs('blogPublishRequest')}</h2>
        }
      >
        <PublishRequestTable />
      </DashboardMainPageLayout>
    </TableProvider>
  );
}
