import { useTranslations } from 'next-intl';
import { DashboardMainPageLayout } from '#common/layout';
import { InviteReferralHistory } from './_components/invite-referral-history';

export function ReferralProgramHistoryLayout() {
  const tDashboard = useTranslations('dashboard.referralProgram');

  return (
    <>
      <DashboardMainPageLayout
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('referralProgramHistory') }]}
        dashboard="admin"
        title={tDashboard('referralProgramHistory')}
        mainClassName="overflow-hidden"
      >
        <InviteReferralHistory />
      </DashboardMainPageLayout>
    </>
  );
}
