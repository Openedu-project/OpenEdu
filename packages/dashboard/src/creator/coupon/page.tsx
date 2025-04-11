import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { CouponList } from './_components/coupon-list';

export function Coupon() {
  const tDashboard = useTranslations('dashboard');

  return (
    <>
      <DashboardMainPageLayout
        breadcrumbs={[{ label: tDashboard('coupon'), disabled: true }]}
        dashboard="admin"
        title={tDashboard('coupon')}
      >
        <CouponList />
      </DashboardMainPageLayout>
    </>
  );
}
