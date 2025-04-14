import { DashboardHeaderCard } from '@oe/ui';

export function GeneralSettingsPage() {
  return (
    <>
      <DashboardHeaderCard
        dashboard="admin"
        breadcrumbs={[{ label: 'Cài đặt', disabled: true }, { label: 'Tổng quan' }]}
      >
        GeneralSettingsPage
      </DashboardHeaderCard>
      <div className="rounded-sm bg-background p-4">GeneralSettingsPage</div>
    </>
  );
}
