import { DashboardMainPageLayout } from "@oe/ui";
import { useTranslations } from "next-intl";
import { ScheduleSettingList } from "./_components/schedule-settings";

export function ScheduleSetting() {
  const tDashboard = useTranslations("dashboard.schedule");

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard("title"), disabled: true }]}
      dashboard="admin"
      title={tDashboard("title")}
    >
      <ScheduleSettingList />
    </DashboardMainPageLayout>
  );
}
