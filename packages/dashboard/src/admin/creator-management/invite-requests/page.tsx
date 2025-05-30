import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import InviteRequestMngmList from './_components/invite-request-list';

export default function InviteRequestManagement() {
  const tDashboard = useTranslations('dashboard.creators');
  const t = useTranslations('creatorManagement.inviteRequestCreator');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('invitations') }]}
      dashboard="admin"
      title={t('title')}
    >
      <InviteRequestMngmList />
    </DashboardMainPageLayout>
  );
}
