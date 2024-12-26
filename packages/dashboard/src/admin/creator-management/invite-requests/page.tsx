import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import InviteRequestMngmList from './_components/invite-request-list';

export default function InviteRequestManagement() {
  const tDashboard = useTranslations('dashboard.creators');
  const t = useTranslations('creatorManagement.inviteRequestCreator');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('invitations') }]}
        dashboard="admin"
      >
        <h1 className="mb-4 text-2xl">{t('title')}</h1>
      </DashboardHeaderCard>

      <div className="rounded bg-background p-4">
        <InviteRequestMngmList />
      </div>
    </>
  );
}
