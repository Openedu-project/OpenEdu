import { DashboardMainPageLayout } from '@oe/ui';
import { TableProvider } from '@oe/ui';
import { getTranslations } from 'next-intl/server';
import { PublishRequestTable } from '../_components/publish-request-table';

export async function PublishRequestPage() {
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
