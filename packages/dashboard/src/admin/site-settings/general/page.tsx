import { DashboardHeaderCard } from '@oe/ui/common/layout';

export default function GeneralSettingsPage() {
  return (
    <>
      <DashboardHeaderCard breadcrumbs={[{ label: 'Cài đặt', disabled: true }, { label: 'Tổng quan' }]}>
        GeneralSettingsPage
      </DashboardHeaderCard>
      <div className="rounded bg-background p-4">GeneralSettingsPage</div>
    </>
  );
}
