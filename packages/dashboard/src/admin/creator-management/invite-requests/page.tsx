import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import InviteRequestMngmList from './_components/invite-request-list';

export default function InviteRequestManagement() {
  const tDashboard = useTranslations('dashboard.creators');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('invitations') }]}
        dashboard="admin"
      />
      <div className="rounded bg-background p-4">
        <InviteRequestMngmList />
      </div>
    </>
  );
}
