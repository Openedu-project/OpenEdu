import { DashboardHeaderCard } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { WithdrawRequestList } from './_components/withdraw-request-list';

export function WithdrawRequest() {
  const tDashboard = useTranslations('dashboard');
  const t = useTranslations('withdrawal');

  return (
    <>
      <DashboardHeaderCard breadcrumbs={[{ label: tDashboard('withdrawRequest'), disabled: true }]} dashboard="admin">
        <h1 className="mb-4 text-2xl">{t('withdrawalRequest')}</h1>
      </DashboardHeaderCard>

      <div className="rounded-sm bg-background p-4">
        <WithdrawRequestList />
      </div>
    </>
  );
}
