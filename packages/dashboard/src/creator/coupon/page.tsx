import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CouponList from './_components/coupon-list';

export default function Coupon() {
  const tDashboard = useTranslations('dashboard');

  return (
    <>
      <DashboardHeaderCard breadcrumbs={[{ label: tDashboard('coupon'), disabled: true }]} dashboard="admin" />
      <div className="rounded bg-background p-4">
        <CouponList />
      </div>
    </>
  );
}
