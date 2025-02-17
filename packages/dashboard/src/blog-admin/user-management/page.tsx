import { USER_ROLE_EVENT } from '@oe/core/utils/constants';
import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import InviteUserModal from '../_components/invite-user-modal';
import { type IBlogUserRole, UserTable } from '../_components/user-table';

export default function UserManagementPage({ userRole }: { userRole: IBlogUserRole }) {
  const tDashboard = useTranslations('dashboard.blog');
  const t = useTranslations('blogManagement.inviteUser');
  const label = tDashboard(userRole === 'org_writer' ? 'writerMgt' : 'editorMgt');

  return (
    <DashboardMainPageLayout
      dashboard="blog"
      breadcrumbs={[
        { label: tDashboard('userMgt'), disabled: true },
        { label, disabled: true },
      ]}
      title={
        <div className="flex items-center justify-between">
          <h2>{label}</h2>
          <InviteUserModal title={t(userRole)} role_event={USER_ROLE_EVENT[userRole] ?? ''} />
        </div>
      }
      mainClassName="overflow-hidden"
    >
      <UserTable userRole={userRole} />
    </DashboardMainPageLayout>
  );
}
