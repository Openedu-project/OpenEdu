import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import ProgramManagementSetting from './_components/program-management-setting';

export default function ProgramManagement() {
  const tDashboard = useTranslations('dashboard.referralProgram');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard('title'), disabled: true },
        { label: tDashboard('programManagement'), disabled: true },
      ]}
      dashboard="admin"
      title={tDashboard('programManagement')}
    >
      <ProgramManagementSetting />
    </DashboardMainPageLayout>
  );
}
