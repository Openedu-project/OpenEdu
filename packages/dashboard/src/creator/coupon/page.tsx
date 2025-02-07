import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CouponList from './_components/coupon-list';

export default function Coupon() {
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
