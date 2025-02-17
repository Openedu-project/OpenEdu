import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import { type IBlogUserRole, UserTable } from '../_components/user-table';

export default function UserManagementPage({ userRole }: { userRole: IBlogUserRole }) {
  const tDashboard = useTranslations('dashboard.blog');
  const label = tDashboard(userRole === 'org_writer' ? 'writerMgt' : 'editorMgt');

  return (
    <DashboardMainPageLayout
      dashboard="blog"
      breadcrumbs={[
        { label: tDashboard('userMgt'), disabled: true },
        { label, disabled: true },
      ]}
      title={label}
      mainClassName="overflow-hidden"
    >
      <UserTable userRole={userRole} />
    </DashboardMainPageLayout>
  );
}
